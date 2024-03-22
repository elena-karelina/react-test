import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACK_URL;

export const signIn = (phone, code) => {
  return axios.post(`${apiUrl}/users/signin`, {
    phone,
    code,
  });
};
