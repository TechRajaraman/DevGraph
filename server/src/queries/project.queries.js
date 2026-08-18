export const projectByIdQuery = `
  MATCH (p:Project {id: $id})
  OPTIONAL MATCH (p)-[:BELONGS_TO]->(d:Domain)
  OPTIONAL MATCH (p)-[bt:BUILT_WITH]->(t:Technology)
  OPTIONAL MATCH (dev:Developer)-[wp:WORKED_ON]->(p)
  RETURN p.id AS id, p.name AS name, p.description AS description, p.year AS year,
         d.id AS domainId, d.name AS domainName,
         collect(DISTINCT {id: t.id, name: t.name, category: t.category, importance: bt.importance}) AS technologies,
         collect(DISTINCT {id: dev.id, name: dev.name, title: dev.title, role: wp.role, durationMonths: wp.durationMonths}) AS developers
`;
