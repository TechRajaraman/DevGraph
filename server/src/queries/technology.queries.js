export const listTechnologiesQuery = `
  MATCH (t:Technology)
  WHERE ($search = '' OR toLower(t.name) CONTAINS toLower($search)
         OR toLower(t.category) CONTAINS toLower($search))
  OPTIONAL MATCH (p:Project)-[:BUILT_WITH]->(t)
  RETURN t.id AS id, t.name AS name, t.category AS category,
         t.description AS description, count(DISTINCT p) AS projectCount
  ORDER BY projectCount DESC, name ASC
  SKIP $offset LIMIT $limit
`;

export const technologyCountQuery = `
  MATCH (t:Technology)
  WHERE ($search = '' OR toLower(t.name) CONTAINS toLower($search)
         OR toLower(t.category) CONTAINS toLower($search))
  RETURN count(t) AS total
`;

export const technologyByIdQuery = `
  MATCH (t:Technology {id: $id})
  OPTIONAL MATCH (p:Project)-[bt:BUILT_WITH]->(t)
  OPTIONAL MATCH (t)-[rt:RELATED_TO]-(related:Technology)
  OPTIONAL MATCH (s:Skill)-[:MAPS_TO]->(t)
  OPTIONAL MATCH (t)-[:SUPPORTS]->(role:Role)
  RETURN t.id AS id, t.name AS name, t.category AS category,
         t.description AS description,
         collect(DISTINCT {id: p.id, name: p.name, year: p.year, importance: bt.importance}) AS projects,
         collect(DISTINCT {id: related.id, name: related.name, category: related.category, reason: rt.reason}) AS related,
         collect(DISTINCT {id: s.id, name: s.name, category: s.category}) AS mappedSkills,
         collect(DISTINCT {id: role.id, name: role.name, level: role.level}) AS supportedRoles
`;

export const technologyGraphQuery = `
  MATCH (center:Technology {id: $id})
  OPTIONAL MATCH p1=(center)-[:RELATED_TO]-(related:Technology)
  OPTIONAL MATCH p2=(project:Project)-[:BUILT_WITH]->(center)
  RETURN center,
         collect(DISTINCT related) AS relatedTechnologies,
         collect(DISTINCT project) AS projects
`;
