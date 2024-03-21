// src/App.jsx
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';  
import TodoForm from './TodoForm'; 
import './App.css';

const App = () => {
  // Retrieve todos from local storage, or initialize with an empty array
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

  // Save todos to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text,
        dateAdded: new Date().toLocaleString(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div className="container mt-4">
      <h1>Todo App</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onEdit={editTodo}
        onRemove={removeTodo}
        onToggleComplete={toggleComplete}
        onRemoveCompleted={removeCompleted}
        onClearAll={clearAll}
      />
    </div>
  );
};

export default App;
