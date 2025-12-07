import axios from 'axios';
import type { Todo } from '../types/todo';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos
  getAll: async (): Promise<Todo[]> => {
    const filter = {
      where: {
        isCompleted: true,
      },
    };
    const response = await api.get<Todo[]>('/todos', {
      params: {
        filter: JSON.stringify(filter),
      },
    });
    return response.data;
  },

  // Get a single todo by ID
  getById: async (id: string): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  create: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', todo);
    return response.data;
  },

  // Update a todo
  update: async (id: string, todo: Partial<Todo>): Promise<void> => {
    await api.patch(`/todos/${id}`, todo);
  },

  // Delete a todo
  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
