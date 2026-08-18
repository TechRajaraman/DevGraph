import app from "./app.js";
import { env } from "./config/env.js";
import { driver, verifyDatabaseConnection } from "./db/driver.js";


async function startServer() {
  try {
    await verifyDatabaseConnection();

    const server = app.listen(env.port, () => {
      console.log(`DevGraph API running on http://localhost:${env.port}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received. Shutting down...`);
      server.close(async () => {
        await driver.close();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start DevGraph API:", error);
    await driver.close();
    process.exit(1);
  }
}

startServer();
