import { Begin } from '@/interfaces/users';

export const getListUsers = async () => {
  const url = "https://reqres.in/api/users?page=2";
  const response = (await fetch(url, {
    headers: {
      "x-api-key": "reqres-free-v1"
    },
  }));
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: Begin = await response.json();
  return data;
};