import axios from 'axios';
import { API_URL } from '../config';

// ==================== AUTH APIs ====================

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Response data
 */
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: email,
      password: password
    }, {
      withCredentials: true // Important for session cookies
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Logout user
 * @returns {Promise} Response data
 */
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {}, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error.response?.data || error.message;
  }
};

// ==================== RESERVATION APIs ====================

/**
 * Get all reservations
 * @returns {Promise} Array of reservations
 */
export const getReservations = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservations`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Get reservations error:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Create a new reservation
 * @param {Object} reservationData - Reservation details
 * @param {number} reservationData.table_id - Table ID
 * @param {string} reservationData.time - Reservation time
 * @param {number} reservationData.guests - Number of guests
 * @returns {Promise} Created reservation data
 */
export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_URL}/reservations`, reservationData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Create reservation error:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Update a reservation
 * @param {number} reservationId - Reservation ID
 * @param {Object} updateData - Updated reservation data
 * @returns {Promise} Updated reservation data
 */
export const updateReservation = async (reservationId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/reservations/${reservationId}`, updateData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Update reservation error:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Delete a reservation
 * @param {number} reservationId - Reservation ID
 * @returns {Promise} Response data
 */
export const deleteReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${API_URL}/reservations/${reservationId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Delete reservation error:', error);
    throw error.response?.data || error.message;
  }
};

// ==================== UTILITY APIs ====================

/**
 * Check backend health
 * @returns {Promise} Health status
 */
export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error.response?.data || error.message;
  }
};