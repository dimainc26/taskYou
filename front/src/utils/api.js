import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getTasks = () => api.get('/tasks');

export const postTasks = (tasks) => {
  return api.post('/tasks', tasks);
};

export default api;
