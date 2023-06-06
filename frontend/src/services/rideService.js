// rideService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create a new ride
export const createRide = async (rideData, authToken) => {
  try {
    const response = await axios.post(`${API_URL}/rides`, rideData, {
      headers: {
        authorization: `${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a ride
export const updateRide = async (rideId, rideData, authToken) => {
  try {
    const response = await axios.put(`${API_URL}/rides/${rideId}`, rideData, {
      headers: {
        authorization: `${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a ride
export const deleteRide = async (rideId, authToken) => {
  try {
    const response = await axios.delete(`${API_URL}/rides/${rideId}`, {
      headers: {
        authorization: `${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Duplicate a ride
export const duplicateRide = async (rideId, authToken) => {
  try {
    const response = await axios.post(`${API_URL}/rides/${rideId}/duplicate`, null, {
      headers: {
        authorization: `${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch all rides
export const getAllRides = async (authToken) => {
  try {
    const response = await axios.get(`${API_URL}/rides`, {
      headers: {
        authorization: `${authToken}`,
      },
    });
    return response.data.rides;
  } catch (error) {
    throw error.response.data;
  }
};
