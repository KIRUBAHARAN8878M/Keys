import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await axios.get(API_URL);
    setTasks(data);
  };

  const handleAddTask = async () => {
    await axios.post(API_URL, newTask);
    setNewTask({ title: '', description: '' });
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  const handleUpdateTask = async (id) => {
    const updatedTask = { ...tasks.find(task => task._id === id), status: 'Completed' };
    await axios.put(`${API_URL}/${id}`, updatedTask);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong>: {task.description} ({task.status})
            <button onClick={() => handleUpdateTask(task._id)}>Mark as Completed</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
