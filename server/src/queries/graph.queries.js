export const developerTechnologyTraversalQuery = `
  MATCH (d:Developer {id: $developerId})
  MATCH (d)-[:WORKED_ON]->(p:Project)-[:BUILT_WITH]->(t:Technology)
  RETURN d.name AS developer,
         p.name AS project,
         t.name AS technology,
         t.category AS category
  ORDER BY p.name, t.name
`;

export const technologyNeighborsQuery = `
  MATCH (t:Technology {id: $technologyId})-[r:RELATED_TO]-(related:Technology)
  RETURN t.name AS technology,
         type(r) AS relationship,
         r.reason AS reason,
         related.id AS relatedId,
         related.name AS relatedTechnology,
         related.category AS category
  ORDER BY relatedTechnology
`;

export const graphOverviewQuery = `
  MATCH (a)-[r]->(b)
  RETURN labels(a)[0] AS sourceType, a.name AS source,
         type(r) AS relationship,
         labels(b)[0] AS targetType, b.name AS target
  ORDER BY sourceType, source, relationship, target
  LIMIT $limit
`;
