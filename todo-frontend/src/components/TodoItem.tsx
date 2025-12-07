import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.isCompleted || false}
          onChange={() => onToggle(todo.id!, !todo.isCompleted)}
        />
        <div className="todo-text">
          <h3 className={todo.isCompleted ? 'line-through' : ''}>{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
      </div>
      <button className="delete-btn" onClick={() => onDelete(todo.id!)}>
        Delete
      </button>
    </div>
  );
}
