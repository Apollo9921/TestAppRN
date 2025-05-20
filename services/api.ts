import { Begin } from '@/interfaces/users';
import axios from 'axios';

const BASE_URL = 'https://reqres.in/api/users?page=2';

export const getApi = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}`, {
      headers: {
        "x-api-key": "reqres-free-v1"
      }
    });
    const data: Begin = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};