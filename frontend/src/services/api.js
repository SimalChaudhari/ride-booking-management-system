import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Update with your API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const createRide = (rideData) => api.post('/rides', rideData);
export const updateRide = (rideId, rideData) => api.put(`/rides/${rideId}`, rideData);
export const deleteRide = (rideId) => api.delete(`/rides/${rideId}`);
export const completeRide = (rideId) => api.put(`/rides/${rideId}/complete`);
export const getRide = (rideId) => api.get(`/rides/${rideId}`);
export const getAllRides = (userId, status, sortBy, sortOrder) =>
  api.get('/rides', {
    params: {
      userId,
      status,
      sortBy,
      sortOrder,
    },
  });
export const duplicateRide = (rideId) => api.post(`/rides/${rideId}/duplicate`);
