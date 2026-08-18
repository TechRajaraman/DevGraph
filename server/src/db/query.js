import { getSession } from "./driver.js";

export function normalizeValue(value) {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'bigint') {
    return Number(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeValue(item));
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);

    if (
      keys.length === 2 &&
      'low' in value && 'high' in value &&
      Number.isInteger(value.low) &&
      Number.isInteger(value.high)
    ) {
      return value.low + value.high * 2 ** 31;
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizeValue(item)])
    );
  }

  return value;
}

export async function runQuery(cypher, params = {}) {
  const session = getSession();

  try {
    const result = await session.run(cypher, params);
    return result.records.map((record) => normalizeValue(record.toObject()));
  } finally {
    await session.close();
  }
}
