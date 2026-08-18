import { runQuery } from '../db/query.js';
import { developerByIdQuery, developerCountQuery, developerNetworkQuery, listDevelopersQuery } from '../queries/developer.queries.js';

export async function listDevelopers({ search = '', page = 1, limit = 9 }) {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(50, Math.max(1, Number(limit) || 9));
  const offset = (safePage - 1) * safeLimit;
  const [rows, count] = await Promise.all([
    runQuery(listDevelopersQuery, { search, offset, limit: safeLimit }),
    runQuery(developerCountQuery, { search })
  ]);
  const total = Number(count[0]?.total ?? 0);
  return { items: rows, page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) };
}

export async function getDeveloper(id) {
  const rows = await runQuery(developerByIdQuery, { id });
  if (!rows[0]?.id) return null;
  const row = rows[0];
  const projects = new Map();
  for (const item of row.projectRows ?? []) {
    if (!item.id) continue;
    const existing = projects.get(item.id) ?? { id: item.id, name: item.name, description: item.description, year: item.year, role: item.role, durationMonths: item.durationMonths, technologies: [] };
    if (item.technology && !existing.technologies.includes(item.technology)) existing.technologies.push(item.technology);
    projects.set(item.id, existing);
  }
  return {
    id: row.id, name: row.name, title: row.title, experienceYears: row.experienceYears, location: row.location,
    company: row.companyId ? { id: row.companyId, name: row.companyName, industry: row.companyIndustry } : null,
    skills: (row.skills ?? []).filter((x) => x.id),
    projects: [...projects.values()]
  };
}

export async function getDeveloperNetwork(id) {
  const rows = await runQuery(developerNetworkQuery, { id });
  return rows[0] ?? null;
}
