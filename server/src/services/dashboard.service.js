import { runQuery } from '../db/query.js';
import { dashboardStatsQuery, popularTechnologiesQuery, technologyNetworkQuery } from '../queries/dashboard.queries.js';

export async function getDashboard() {
  const [stats, popular, network] = await Promise.all([
    runQuery(dashboardStatsQuery),
    runQuery(popularTechnologiesQuery, { limit: 8 }),
    runQuery(technologyNetworkQuery, { limit: 6, nodeLimit: 10 })
  ]);
  return { stats: stats[0] ?? {}, popularTechnologies: popular, technologyNetwork: network };
}
