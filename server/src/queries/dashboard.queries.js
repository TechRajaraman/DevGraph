export const dashboardStatsQuery = `
  RETURN
    size([(n:Developer) | n]) AS developers,
    size([(n:Skill) | n]) AS skills,
    size([(n:Technology) | n]) AS technologies,
    size([(n:Project) | n]) AS projects,
    size([(n:Role) | n]) AS roles,
    size([(n:Company) | n]) AS companies
`;

export const popularTechnologiesQuery = `
  MATCH (p:Project)-[r:BUILT_WITH]->(t:Technology)
  RETURN t.id AS id, t.name AS name, t.category AS category,
         count(DISTINCT p) AS projectCount,
         count(r) AS usageCount
  ORDER BY projectCount DESC, usageCount DESC, name ASC
  LIMIT $limit
`;

export const technologyNetworkQuery = `
  MATCH (t:Technology)
  OPTIONAL MATCH (t)-[r:RELATED_TO]-(related:Technology)
  WITH t, collect(DISTINCT {
    id: related.id,
    name: related.name,
    category: related.category,
    reason: r.reason
  }) AS relationships
  WHERE size(relationships) > 0
  RETURN t.id AS id, t.name AS name, t.category AS category,
         relationships[0..$limit] AS related
  ORDER BY size(relationships) DESC, name ASC
  LIMIT $nodeLimit
`;
