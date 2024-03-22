import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACK_URL;

export const getData = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/users/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    alert(error.message);
  }
};
