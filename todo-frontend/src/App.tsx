import { useState, useEffect } from 'react';
import { todoApi } from './api/todoApi';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import type { Todo } from './types/todo';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todo: Omit<Todo, 'id'>) => {
    try {
      const newTodo = await todoApi.create(todo);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const handleToggleTodo = async (id: string, isCompleted: boolean) => {
    try {
      await todoApi.update(id, { isCompleted });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted } : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoApi.delete(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>📝 Todo App</h1>
        
        <TodoForm onSubmit={handleAddTodo} />
        
        {error && <p className="error">{error}</p>}
        
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
