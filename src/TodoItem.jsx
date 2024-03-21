import React, { useState } from 'react';
import Modal from 'react-modal';
import { BsPencilSquare, BsTrash } from 'react-icons/bs'; // Importing icons from Bootstrap
import './App.css';

const TodoItem = ({ todo, onEdit, onRemove, onToggleComplete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedText(todo.text); // Reset the edited text when closing the modal
  };

  const handleSave = () => {
    onEdit(todo.id, editedText); // Passing the edited text to the onEdit function
    closeModal(); // Close the modal after saving
  };

  const handleChange = (e) => {
    setEditedText(e.target.value); // Update the edited text as it changes
  };

  const handleRemove = () => {
    const isConfirmed = window.confirm('Are you sure you want to remove this to-do item?');
    if (isConfirmed) {
      onRemove(todo.id);
    }
  };

  return (
    <>
      <div className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}>
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
            className="mr-2"
          />
          <div className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </div>
          <div>
            <small className="text-muted ml-2">Created on: {todo.dateAdded}</small>
          </div>
        </div>
        <div>
          <button className="btn-icon btn-warning btn-sm mx-1" onClick={handleEdit} style={{ border: '1px solid #5e1b89' }}>
            <BsPencilSquare style={{ color: '#5e1b89' }} /> {/* Icon for Edit with violet color */}
          </button>
          <button className="btn-icon btn-danger btn-sm" onClick={handleRemove} style={{ border: '1px solid #f4512c' }}>
            <BsTrash style={{ color: '#f4512c' }} /> {/* Icon for Remove with orange color */}
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Todo"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '300px', // Set width of the modal
            height: '200px', // Set height of the modal
            position: 'fixed',
            top: '50%',  // Position the modal at the center of the screen vertically
            left: '50%', // Position the modal at the center of the screen horizontally
            transform: 'translate(-50%, -50%)', // Center the modal exactly
            border: 'none', // Remove border
            borderRadius: '10px', // Add border radius
          },
        }}
      >
        <div>
          <h2 style={{ textAlign: 'center' }}>Edit Todo</h2>
          <input
            type="text"
            className="form-control"
            value={editedText}
            onChange={handleChange}
          />
          <div className="mt-2">
            <button className="btn-save btn-sm mx-1" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn-secondary btn-sm" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TodoItem;
