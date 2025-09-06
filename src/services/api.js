import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Projects API
export const projectService = {
  getAll: () => api.get('/projects'),
  getFeatured: () => api.get('/projects/featured'),
  getById: (id) => api.get(`/projects/${id}`),
};

// Skills API
export const skillService = {
  getAll: () => api.get('/skills'),
  getByCategory: (category) => api.get(`/skills/category/${category}`),
  getFeatured: () => api.get('/skills/featured'),
};

// Blog API
export const blogService = {
  getAll: () => api.get('/blog'),
  getBySlug: (slug) => api.get(`/blog/slug/${slug}`),
};

export default api;