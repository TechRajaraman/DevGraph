import { runQuery } from '../db/query.js';
import { careerPathQuery, careerRecommendationsQuery, rolesQuery, skillOptionsQuery } from '../queries/career.queries.js';

export async function getCareerOptions() {
  const [skills, roles] = await Promise.all([runQuery(skillOptionsQuery), runQuery(rolesQuery)]);
  return { skills, roles };
}

export async function findCareerPath({ skillId, roleId }) {
  const rows = await runQuery(careerPathQuery, { skillId, roleId });
  if (!rows[0]) return null;
  return rows[0];
}

export async function getCareerRecommendations(skillId) {
  return runQuery(careerRecommendationsQuery, { skillId, limit: 6 });
}
