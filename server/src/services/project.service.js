import { runQuery } from '../db/query.js';
import { projectByIdQuery } from '../queries/project.queries.js';

export async function getProject(id) {
  const rows = await runQuery(projectByIdQuery, { id });
  if (!rows[0]?.id) return null;
  const row = rows[0];
  return {
    id: row.id, name: row.name, description: row.description, year: row.year,
    domain: row.domainId ? { id: row.domainId, name: row.domainName } : null,
    technologies: (row.technologies ?? []).filter((x) => x.id),
    developers: (row.developers ?? []).filter((x) => x.id)
  };
}
