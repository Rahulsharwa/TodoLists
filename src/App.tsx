import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TodoApp } from './components/TodoApp';

function App() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}

export default App;