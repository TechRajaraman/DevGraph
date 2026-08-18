export const rolesQuery = `
  MATCH (r:Role)
  OPTIONAL MATCH (s:Skill)-[req:REQUIRED_FOR]->(r)
  RETURN r.id AS id, r.name AS name, r.level AS level,
         collect(DISTINCT {name: s.name, importance: req.importance}) AS skills
  ORDER BY r.name ASC
`;

export const careerPathQuery = `
  MATCH (from:Skill {id: $skillId})
  MATCH (target:Role {id: $roleId})
  MATCH (from)-[:MAPS_TO]->(sourceTech:Technology)
  MATCH (targetTech:Technology)-[:SUPPORTS]->(target)
  WHERE sourceTech = targetTech OR (sourceTech)-[:RELATED_TO*1..3]->(targetTech)

  WITH from, target, collect(DISTINCT sourceTech) AS sourceTechs, collect(DISTINCT targetTech) AS targetTechs
  WITH from, target, (sourceTechs + targetTechs) AS allTechs
  UNWIND allTechs AS tech
  WITH DISTINCT from, target, collect(DISTINCT tech) AS techNodes
  RETURN [node IN [from] + techNodes + [target] | {
    id: node.id,
    name: node.name,
    type: labels(node)[0],
    category: coalesce(node.category, node.level, '')
  }] AS nodes,
  ['MAPS_TO', 'RELATED_TO', 'SUPPORTS'] AS relationships,
  size(techNodes) + 1 AS hops
`;

export const careerRecommendationsQuery = `
  MATCH (skill:Skill {id: $skillId})-[:MAPS_TO]->(t:Technology)-[:SUPPORTS]->(role:Role)
  OPTIONAL MATCH (required:Skill)-[:REQUIRED_FOR]->(role)
  WITH role, t, collect(DISTINCT required.name) AS requiredSkills
  RETURN role.id AS id, role.name AS name, role.level AS level,
         t.name AS matchedTechnology, requiredSkills
  ORDER BY size(requiredSkills) DESC, role.name ASC
  LIMIT $limit
`;

export const skillOptionsQuery = `
  MATCH (s:Skill)
  RETURN s.id AS id, s.name AS name, s.category AS category
  ORDER BY s.name ASC
`;
