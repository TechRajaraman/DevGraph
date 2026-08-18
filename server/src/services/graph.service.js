import { runQuery } from '../db/query.js';
import { developerTechnologyTraversalQuery, graphOverviewQuery, technologyNeighborsQuery } from '../queries/graph.queries.js';

export async function getDeveloperTechnologyTraversal(developerId) {
  return runQuery(developerTechnologyTraversalQuery, { developerId });
}

export async function getTechnologyNeighbors(technologyId) {
  return runQuery(technologyNeighborsQuery, { technologyId });
}

export async function getGraphOverview(limit = 100) {
  return runQuery(graphOverviewQuery, { limit: Math.min(250, Math.max(1, Number(limit) || 100)) });
}
