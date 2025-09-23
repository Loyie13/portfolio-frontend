import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

// Contact API
export const contactService = {
  send: (data) => api.post('/contact', data),
};

export default api;