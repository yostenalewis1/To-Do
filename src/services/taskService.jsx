import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

export const addTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error('Add task error:', error);
    return null;
  }
};

export const getTasks = async (userId) => {
  try {
    const response = await axios.get(API_URL, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Get tasks error:', error);
    return [];
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('Update task error:', error);
    return null;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete task error:', error);
    return null;
  }
};
