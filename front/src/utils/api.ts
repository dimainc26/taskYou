import axios, { AxiosResponse } from 'axios';

// Interface pour les tâches
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// Crée une instance Axios avec la baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string, // Typage explicite de la baseURL
});

// Fonction pour obtenir les tâches
export const getTasks = (): Promise<AxiosResponse<Task[]>> => {
  return api.get<Task[]>('/tasks');
};

// Fonction pour poster des tâches
export const postTasks = (tasks: Task[]): Promise<AxiosResponse<void>> => {
  return api.post<void>('/tasks', tasks);
};

// Export par défaut de l'instance api
export default api;
