import axios from 'axios';
import { generateHeaders } from './authService';

const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

export const verifyUserExists = async () => {
  const headers = await generateHeaders();
  return axios.get(`${baseUrl}/users/current`, headers);
};

export const createUser = async (email: any) => {
  const headers = await generateHeaders();
  const userToCreate = { email };
  return axios.post(`${baseUrl}/users`, userToCreate, headers);
};
