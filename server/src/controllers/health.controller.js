import { getGraphHealth } from "../services/health.service.js";

export async function healthController(_req, res, next) {
  try {
    const graph = await getGraphHealth();

    res.json({
      success: true,
      service: "devgraph-api",
      graph
    });
  } catch (error) {
    next(error);
  }
}
