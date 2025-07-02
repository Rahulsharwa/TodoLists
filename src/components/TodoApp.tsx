import React from 'react';
import { CheckSquare, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';
import { TodoStats } from './TodoStats';
import { TodoFilters } from './TodoFilters';
import { ThemeToggle } from './ThemeToggle';

export const TodoApp: React.FC = () => {
  const {
    todos,
    loading,
    error,
    filter,
    stats,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    refreshTodos,
  } = useTodos();

  const hasCompletedTodos = stats.completed > 0;

  if (loading && todos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-lg font-medium">Loading your todos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 dark:bg-blue-400/10 rounded-2xl">
              <CheckSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Todo App
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay organized and productive
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={refreshTodos}
              className="p-2 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
              title="Refresh todos"
            >
              <RefreshCw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add todo form */}
            <TodoForm onAddTodo={addTodo} loading={loading} />

            {/* Filters */}
            <TodoFilters
              currentFilter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
              hasCompletedTodos={hasCompletedTodos}
            />

            {/* Todo list */}
            <div className="space-y-3">
              {todos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {filter === 'completed' && stats.completed === 0
                      ? 'No completed todos yet'
                      : filter === 'active' && stats.active === 0
                      ? 'No active todos'
                      : 'No todos yet'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {filter === 'all' && stats.total === 0
                      ? 'Add your first todo to get started!'
                      : filter === 'completed' && stats.completed === 0
                      ? 'Complete some todos to see them here'
                      : filter === 'active' && stats.active === 0
                      ? 'All your todos are completed! 🎉'
                      : 'Try changing the filter above'}
                  </p>
                </div>
              ) : (
                todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TodoStats stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};