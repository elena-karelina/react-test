import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACK_URL;

export const getOtpCode = (phone) => {
  return axios.post(`${apiUrl}/auth/otp`, {
    phone,
  });
};
