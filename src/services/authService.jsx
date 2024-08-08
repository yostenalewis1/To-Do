import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    return null;
  }
};
 
export const login = async (username, password) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { username, password }
    });
    const users = response.data;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); 
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};
