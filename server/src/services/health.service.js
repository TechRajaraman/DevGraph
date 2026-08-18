import { runQuery } from "../db/query.js";
import { healthQuery } from "../queries/health.query.js";

export async function getGraphHealth() {
  const rows = await runQuery(healthQuery);
  return rows[0] ?? { status: "unknown" };
}
