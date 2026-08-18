import neo4j from "neo4j-driver";
import { env } from "../config/env.js";

export const driver = neo4j.driver(
  env.cognodbUri,
  neo4j.auth.basic(env.cognodbUsername, env.cognodbPassword)
);

export async function verifyDatabaseConnection() {
  await driver.verifyConnectivity();
  return true;
}

export function getSession() {
  return driver.session({ database: env.cognodbDatabase });
}
