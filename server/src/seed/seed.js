import { getSession, driver } from '../db/driver.js';
import {
  developers, skills, technologies, projects, roles, companies, domains,
  developerSkills, projectTechnologies, developerProjects, technologyRelations,
  skillTechnologyMap, skillRoleRequirements, technologyRoleSupport
} from './seed-data.js';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function run(cypher, params = {}) {
  const session = getSession();
  try {
    return await session.run(cypher, params);
  } finally {
    await session.close();
  }
}

async function runSchema() {
  const schema = await readFile(resolve(__dirname, 'schema.cypher'), 'utf8');
  for (const statement of schema.split(';').map((item) => item.trim()).filter(Boolean)) {
    await run(statement);
  }
}

async function seed() {
  await runSchema();

  await run(`
    UNWIND $items AS item
    MERGE (n:Developer {id: item.id})
    SET n.name = item.name, n.title = item.title,
        n.experienceYears = item.experienceYears, n.location = item.location
  `, { items: developers });

  await run(`
    UNWIND $items AS item
    MERGE (n:Skill {id: item.id})
    SET n.name = item.name, n.category = item.category
  `, { items: skills });

  await run(`
    UNWIND $items AS item
    MERGE (n:Technology {id: item.id})
    SET n.name = item.name, n.category = item.category, n.description = item.description
  `, { items: technologies });

  await run(`
    UNWIND $items AS item
    MERGE (n:Project {id: item.id})
    SET n.name = item.name, n.description = item.description, n.year = item.year
  `, { items: projects });

  await run(`
    UNWIND $items AS item
    MERGE (n:Role {id: item.id})
    SET n.name = item.name, n.level = item.level
  `, { items: roles });

  await run(`
    UNWIND $items AS item
    MERGE (n:Company {id: item.id})
    SET n.name = item.name, n.industry = item.industry
  `, { items: companies });

  await run(`
    UNWIND $items AS item
    MERGE (n:Domain {id: item.id})
    SET n.name = item.name
  `, { items: domains });

  await run(`
    UNWIND $items AS item
    MATCH (d:Developer {id: item.developerId})
    MATCH (s:Skill {id: item.skillId})
    MERGE (d)-[r:HAS_SKILL]->(s)
    SET r.level = item.level, r.years = item.years
  `, { items: developerSkills });

  await run(`
    UNWIND $items AS item
    MATCH (d:Developer {id: item.developerId})
    MATCH (p:Project {id: item.projectId})
    MERGE (d)-[r:WORKED_ON]->(p)
    SET r.role = item.role, r.durationMonths = item.durationMonths
  `, { items: developerProjects });

  await run(`
    UNWIND $items AS item
    MATCH (p:Project {id: item.projectId})
    MATCH (t:Technology {id: item.technologyId})
    MERGE (p)-[r:BUILT_WITH]->(t)
    SET r.importance = item.importance
  `, { items: projectTechnologies });

  await run(`
    UNWIND $items AS item
    MATCH (d:Developer {id: item.developerId})
    MATCH (c:Company {id: d.companyId})
    MERGE (d)-[:WORKS_AT]->(c)
  `, { items: developers });

  await run(`
    UNWIND $items AS item
    MATCH (p:Project {id: item.id})
    MATCH (domain:Domain {id: item.domainId})
    MERGE (p)-[:BELONGS_TO]->(domain)
  `, { items: projects });

  await run(`
    UNWIND $items AS item
    MATCH (from:Technology {id: item.fromTechnologyId})
    MATCH (to:Technology {id: item.toTechnologyId})
    MERGE (from)-[r:RELATED_TO]->(to)
    SET r.reason = item.reason
  `, { items: technologyRelations });

  await run(`
    UNWIND $items AS item
    MATCH (s:Skill {id: item.skillId})
    MATCH (t:Technology {id: item.technologyId})
    MERGE (s)-[:MAPS_TO]->(t)
  `, { items: skillTechnologyMap });

  await run(`
    UNWIND $items AS item
    MATCH (s:Skill {id: item.skillId})
    MATCH (r:Role {id: item.roleId})
    MERGE (s)-[rel:REQUIRED_FOR]->(r)
    SET rel.importance = item.importance
  `, { items: skillRoleRequirements });

  await run(`
    UNWIND $items AS item
    MATCH (t:Technology {id: item.technologyId})
    MATCH (r:Role {id: item.roleId})
    MERGE (t)-[:SUPPORTS]->(r)
  `, { items: technologyRoleSupport });

  const counts = await run(`
    RETURN
      size([(n:Developer) | n]) AS developers,
      size([(n:Skill) | n]) AS skills,
      size([(n:Technology) | n]) AS technologies,
      size([(n:Project) | n]) AS projects,
      size([(n:Role) | n]) AS roles,
      size([(n:Company) | n]) AS companies,
      size([(n:Domain) | n]) AS domains,
      size([(a)-[r]->(b) | r]) AS relationships
  `);

  console.log('DevGraph seed completed.');
  console.table(counts.records[0].toObject());
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await driver.close();
  });
