import { http } from './http.js';

async function unwrap(request) {
  const response = await request;
  return response.data.data;
}

export const api = {
  dashboard: () => unwrap(http.get('/dashboard')),
  developers: (params) => unwrap(http.get('/developers', { params })),
  developer: (id) => unwrap(http.get(`/developers/${id}`)),
  developerNetwork: (id) => unwrap(http.get(`/developers/${id}/network`)),
  technologies: (params) => unwrap(http.get('/technologies', { params })),
  technology: (id) => unwrap(http.get(`/technologies/${id}`)),
  careerOptions: () => unwrap(http.get('/career/options')),
  careerPath: (params) => unwrap(http.get('/career/path', { params })),
  careerRecommendations: (skillId) => unwrap(http.get('/career/recommendations', { params: { skillId } }))
};
