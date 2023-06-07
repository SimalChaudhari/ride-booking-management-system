// authService.js

import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL + 'api/auth';

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/registration`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Log in with user credentials
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const token = response.data.token;
    saveToken(token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get the user's authentication token from local storage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Save the user's authentication token to local storage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove the user's authentication token from local storage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if the user is logged in
export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};

// Log out the user
export const logout = () => {
  removeToken();
  // Perform any additional cleanup or redirect
};
