// TodoForm.jsx
import React, { useState } from 'react';
import './App.css';

const TodoForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the text is not empty before submitting
    if (text.trim() !== '') {
      onSubmit(text);
      setText('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a task to add.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="row justify-content-center mt-2"> {/* Center the button */}
        <div className="col-auto">
          <button type="submit" className="btn-primary">
            Add todo
          </button>
        </div>
      </div>
      {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
    </form>
  );
};

export default TodoForm;
