
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addUser = async (userData) => {
  const response = await axios.post(BASE_URL, userData);
  return response.data;
};

export const editUser = async (userId, userData) => {
  const response = await axios.put(`${BASE_URL}/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${BASE_URL}/${userId}`);
  return response.data;
};
