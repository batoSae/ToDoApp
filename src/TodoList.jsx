import React from 'react';
import TodoItem from './TodoItem';
import './App.css';

const TodoList = ({ todos, onEdit, onRemove, onToggleComplete, onRemoveCompleted, onClearAll }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const hasCompletedTodos = completedTodos.length > 0;

  const handleRemoveCompleted = () => {
    const isConfirmed = window.confirm('Are you sure you want to remove completed to-do items?');
    if (isConfirmed) {
      onRemoveCompleted();
    }
  };

  const handleClearAll = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete all to-do lists?');
    if (isConfirmed) {
      onClearAll();
    }
  };

  return (

    <div>

      <div className="d-flex justify-content-between">
        <button className="btn-secondary mb-3" onClick={handleRemoveCompleted}>
          Remove Completed
        </button>
        
        <div>
          <button className="btn-secondary" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      </div>


      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onRemove={onRemove}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
