import { Todo } from '../types/todo';

const STORAGE_KEY = 'todos-api-data';
const API_DELAY = 300; // Simulate network delay

// Simulate API response
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get todos from localStorage
const getTodosFromStorage = (): Todo[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Save todos to localStorage
const saveTodosToStorage = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const todoApi = {
  // Get all todos
  async getTodos(): Promise<Todo[]> {
    await delay(API_DELAY);
    return getTodosFromStorage();
  },

  // Create a new todo
  async createTodo(text: string): Promise<Todo> {
    await delay(API_DELAY);
    const todos = getTodosFromStorage();
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedTodos = [newTodo, ...todos];
    saveTodosToStorage(updatedTodos);
    return newTodo;
  },

  // Update an existing todo
  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await delay(API_DELAY);
    const todos = getTodosFromStorage();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const updatedTodo: Todo = {
      ...todos[todoIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    todos[todoIndex] = updatedTodo;
    saveTodosToStorage(todos);
    return updatedTodo;
  },

  // Delete a todo
  async deleteTodo(id: string): Promise<void> {
    await delay(API_DELAY);
    const todos = getTodosFromStorage();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    saveTodosToStorage(filteredTodos);
  },

  // Delete all completed todos
  async deleteCompletedTodos(): Promise<void> {
    await delay(API_DELAY);
    const todos = getTodosFromStorage();
    const activeTodos = todos.filter(todo => !todo.completed);
    saveTodosToStorage(activeTodos);
  }
};