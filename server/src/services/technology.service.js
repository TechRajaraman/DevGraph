import { runQuery } from '../db/query.js';
import { listTechnologiesQuery, technologyByIdQuery, technologyCountQuery } from '../queries/technology.queries.js';

export async function listTechnologies({ search = '', page = 1, limit = 12 }) {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(50, Math.max(1, Number(limit) || 12));
  const offset = (safePage - 1) * safeLimit;
  const [rows, count] = await Promise.all([
    runQuery(listTechnologiesQuery, { search, offset, limit: safeLimit }),
    runQuery(technologyCountQuery, { search })
  ]);
  const total = Number(count[0]?.total ?? 0);
  return { items: rows, page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) };
}

export async function getTechnology(id) {
  const rows = await runQuery(technologyByIdQuery, { id });
  if (!rows[0]?.id) return null;
  const row = rows[0];
  return {
    id: row.id, name: row.name, category: row.category, description: row.description,
    projects: (row.projects ?? []).filter((x) => x.id),
    related: (row.related ?? []).filter((x) => x.id && x.id !== row.id),
    mappedSkills: (row.mappedSkills ?? []).filter((x) => x.id),
    supportedRoles: (row.supportedRoles ?? []).filter((x) => x.id)
  };
}
