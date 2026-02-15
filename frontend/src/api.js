import axios from 'axios';
import { API_URL } from '../config';

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: email,
      password: password
    }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || error.message;
  }
};