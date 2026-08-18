export const listDevelopersQuery = `
  MATCH (d:Developer)
  WHERE ($search = '' OR toLower(d.name) CONTAINS toLower($search)
         OR toLower(d.title) CONTAINS toLower($search)
         OR toLower(d.location) CONTAINS toLower($search))
  OPTIONAL MATCH (d)-[hs:HAS_SKILL]->(s:Skill)
  RETURN d.id AS id, d.name AS name, d.title AS title,
         d.experienceYears AS experienceYears, d.location AS location,
         collect(DISTINCT {name: s.name, level: hs.level})[0..5] AS skills
  ORDER BY d.name ASC
  SKIP $offset LIMIT $limit
`;

export const developerCountQuery = `
  MATCH (d:Developer)
  WHERE ($search = '' OR toLower(d.name) CONTAINS toLower($search)
         OR toLower(d.title) CONTAINS toLower($search)
         OR toLower(d.location) CONTAINS toLower($search))
  RETURN count(d) AS total
`;

export const developerByIdQuery = `
  MATCH (d:Developer {id: $id})
  OPTIONAL MATCH (d)-[hs:HAS_SKILL]->(s:Skill)
  OPTIONAL MATCH (d)-[wp:WORKED_ON]->(p:Project)-[:BUILT_WITH]->(t:Technology)
  OPTIONAL MATCH (d)-[:WORKS_AT]->(c:Company)
  RETURN d.id AS id, d.name AS name, d.title AS title,
         d.experienceYears AS experienceYears, d.location AS location,
         c.id AS companyId, c.name AS companyName, c.industry AS companyIndustry,
         collect(DISTINCT {id: s.id, name: s.name, category: s.category, level: hs.level, years: hs.years}) AS skills,
         collect(DISTINCT {id: p.id, name: p.name, description: p.description,
                           year: p.year, role: wp.role, durationMonths: wp.durationMonths,
                           technology: t.name}) AS projectRows
`;

export const developerNetworkQuery = `
  MATCH (d:Developer {id: $id})
  OPTIONAL MATCH path = (d)-[:WORKED_ON]->(:Project)-[:BUILT_WITH]->(t:Technology)
  WITH d, collect(DISTINCT {
    id: t.id, name: t.name, category: t.category,
    depth: length(path)
  }) AS technologies
  RETURN d.id AS developerId, d.name AS developerName,
         technologies
`;
