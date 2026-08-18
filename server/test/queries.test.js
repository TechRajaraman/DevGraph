import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeValue } from '../src/db/query.js';
import { careerPathQuery } from '../src/queries/career.queries.js';
import { developerTechnologyTraversalQuery } from '../src/queries/graph.queries.js';
import { listDevelopersQuery } from '../src/queries/developer.queries.js';

test('career query is parameterized and multi-hop', () => {
  assert.match(careerPathQuery, /\$skillId/);
  assert.match(careerPathQuery, /\$roleId/);
  assert.match(careerPathQuery, /MAPS_TO/);
  assert.match(careerPathQuery, /RELATED_TO/);
  assert.match(careerPathQuery, /SUPPORTS/);
  assert.doesNotMatch(careerPathQuery, /shortestPath\(/);
});

test('developer technology traversal contains two graph hops', () => {
  assert.match(developerTechnologyTraversalQuery, /WORKED_ON/);
  assert.match(developerTechnologyTraversalQuery, /BUILT_WITH/);
});

test('developer list query uses parameterized search', () => {
  assert.match(listDevelopersQuery, /\$search/);
  assert.match(listDevelopersQuery, /\$offset/);
  assert.match(listDevelopersQuery, /\$limit/);
});

test('career path query prefers a technology-rich graph traversal', () => {
  assert.match(careerPathQuery, /MAPS_TO/);
  assert.match(careerPathQuery, /RELATED_TO/);
  assert.match(careerPathQuery, /SUPPORTS/);
  assert.doesNotMatch(careerPathQuery, /shortestPath\(/);
});

test('Neo4j integer objects are converted to plain numbers', () => {
  const value = {
    developers: { low: 7, high: 0 },
    technologies: [{ low: 4, high: 0 }, { low: 9, high: 0 }],
    nested: { count: { low: 12, high: 0 } }
  };

  assert.deepEqual(normalizeValue(value), {
    developers: 7,
    technologies: [4, 9],
    nested: { count: 12 }
  });
});
