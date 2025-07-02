import React from 'react';
import { FilterType } from '../types/todo';
import { Trash2 } from 'lucide-react';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => Promise<void>;
  hasCompletedTodos: boolean;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  onClearCompleted,
  hasCompletedTodos,
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-2xl">
      {/* Filter buttons */}
      <div className="flex items-center gap-2">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              currentFilter === key
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Clear completed button */}
      {hasCompletedTodos && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl font-medium transition-all duration-300 group"
        >
          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          Clear Completed
        </button>
      )}
    </div>
  );
};