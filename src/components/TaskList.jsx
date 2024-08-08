import React, { useState } from 'react';
import { updateTask, deleteTask } from '../services/taskService';

const TaskList = ({ tasks, fetchTasks }) => {
  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  // State for editing a task
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    priority: '',
    dueDate: '',
    status: ''
  });

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Handle input change in the edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditFormData(task);
  };

  // Save edited task
  const saveEditedTask = async () => {
    await updateTask(editingTaskId, editFormData);
    setEditingTaskId(null);
    fetchTasks();
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => 
    statusFilter === 'all' || task.status === statusFilter
  ).sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const handleToggleStatus = async (task) => {
    await updateTask(task.id, { ...task, status: task.status === 'pending' ? 'completed' : 'pending' });
    fetchTasks();
  };

  const handleDelete = async (task) => {
    await deleteTask(task.id);
    fetchTasks();
  };
 
  return (
    <div className="mt-5">
      {/* Filters and Sorting */}
      <div className="mb-4">
        <label className="mr-2">Status Filter:</label>
        <select 
          value={statusFilter} 
          onChange={handleStatusFilterChange} 
          className="border border-gray-400 p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        
        <label className="ml-4 mr-2">Sort By:</label>
        <select 
          value={sortBy} 
          onChange={handleSortChange} 
          className="border border-gray-400 p-2 rounded"
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTasks.map(task => (
          <div key={task.id} className="shadow-md rounded-lg p-4 border border-gray-200">
            {editingTaskId === task.id ? (
              // Edit form
              <div>
                <input 
                  type="text" 
                  name="name" 
                  value={editFormData.name} 
                  onChange={handleEditInputChange} 
                  className="border p-2 rounded w-full mb-2"
                />
                <input 
                  type="text" 
                  name="description" 
                  value={editFormData.description} 
                  onChange={handleEditInputChange} 
                  className="border p-2 rounded w-full mb-2"
                />
                <select 
                  name="priority" 
                  value={editFormData.priority} 
                  onChange={handleEditInputChange} 
                  className="border p-2 rounded w-full mb-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input 
                  type="date" 
                  name="dueDate" 
                  value={editFormData.dueDate} 
                  onChange={handleEditInputChange} 
                  className="border p-2 rounded w-full mb-2"
                />
                <select 
                  name="status" 
                  value={editFormData.status} 
                  onChange={handleEditInputChange} 
                  className="border p-2 rounded w-full mb-2"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="flex justify-between">
                  <button 
                    onClick={saveEditedTask} 
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-lg"
                  >
                    Save
                  </button>
                  <button 
                    onClick={cancelEditing} 
                    className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Task details
              <>
                <h3 className="text-lg font-semibold">{task.name}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-gray-500">
                  Priority: 
                  <span 
                    className={`font-medium ${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}
                  >
                    {task.priority}
                  </span>
                </p>
                <p className="text-gray-500">Due Date: {task.dueDate}</p>
                <p className={`text-gray-500 ${task.status === 'completed' ? 'text-green-500' : 'text-orange-600'}`}>
                  Status: {task.status}
                </p>
                <div className="flex justify-between mt-4 gap-3">
                  <button 
                    onClick={() => handleToggleStatus(task)} 
                    className="bg-gray-400 hover:bg-blue-700 text-white py-1 px-3 rounded-lg"
                  >
                    {task.status === 'pending' ? 'Mark as Completed' : 'Mark as Pending'}
                  </button>
                  <button 
                    onClick={() => startEditing(task)} 
                    className="bg-green-400 hover:bg-green-700 text-white py-1 px-3 rounded-lg"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(task)} 
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;






 