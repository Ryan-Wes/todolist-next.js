"use client"; // Certifique-se de que isso esteja no início do arquivo

import { useState } from 'react';
import './styles.scss'; // Importa o SCSS

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
      setModalOpen(false);
    }
  };

  const openDeleteConfirmation = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(task => task !== taskToDelete));
      setCompletedTasks(completedTasks.filter(task => task !== taskToDelete));
      setTaskToDelete(null);
    }
    setDeleteModalOpen(false);
  };

  const toggleCompletion = (task) => {
    if (completedTasks.includes(task)) {
      setCompletedTasks(completedTasks.filter(t => t !== task));
      setTasks([...tasks, task]);
    } else {
      setCompletedTasks([...completedTasks, task]);
      setTasks(tasks.filter(t => t !== task));
    }
  };

  return (
    <>
      <header className="header">
        <img src="/Logomark.png" alt="Logotipo" className="logo logomark" />
        <img src="/Logotype.png" alt="Logotipo" className="logo logotype" />
        <h1 className="welcome-message">Bem-vindo de volta, Marcus</h1>
        <span className="date">Segunda, 01 de dezembro de 2025</span>
      </header>
      <div id="todo-container">
        <h1>Suas tarefas de hoje</h1>
        <ul id="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={completedTasks.includes(task)}
                onChange={() => toggleCompletion(task)}
              />
              <span style={{ textDecoration: completedTasks.includes(task) ? 'line-through' : 'none' }}>
                {task}
              </span>
              <button onClick={() => openDeleteConfirmation(task)}>
                <img src="/icon.png" alt="Remover" className="trash-icon" />
              </button>
            </li>
          ))}
        </ul>
        <h2>Tarefas finalizadas</h2>
        <ul id="completed-task-list">
          {completedTasks.map((task, index) => (
            <li key={index}>
              <input type="checkbox" checked readOnly />
              <span style={{ textDecoration: 'line-through' }}>{task}</span>
              <button onClick={() => openDeleteConfirmation(task)}>
                <img src="/icon.png" alt="Remover" className="trash-icon" />
              </button>
            </li>
          ))}
        </ul>

        {/* Modal de Adicionar Tarefa */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Nova tarefa</h2>
              <div className="modal-input">
                <label>Título</label>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Digite"
                />
              </div>
              <div className="modal-buttons">
                <button onClick={() => setModalOpen(false)}>Cancelar</button>
                <button onClick={addTask}>Adicionar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmação de Exclusão */}
        {deleteModalOpen && (
          <div className="delete-modal-overlay">
            <div className="delete-modal-content">
              <h2>Deletar tarefa</h2>
              <p>Tem certeza que você quer deletar essa tarefa?</p>
              <div className="modal-buttons">
                <button onClick={() => setDeleteModalOpen(false)}>Cancelar</button>
                <button onClick={confirmDelete}>Deletar</button>
              </div>
            </div>
          </div>
        )}
      </div>
       {/* Botão de adicionar tarefa agora fora da lista */}
       <button className="add-task-button" onClick={() => setModalOpen(true)}>
          Adicionar nova tarefa
        </button>
    </>
  );
}
