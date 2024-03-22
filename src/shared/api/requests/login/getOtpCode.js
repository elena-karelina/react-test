import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACK_URL;

export const getOtpCode = (phone) => {
  return axios.post(`${apiUrl}/auth/otp`, {
    phone,
  });
  // .then((response) => {
  //   console.log(response);
  //   const { success, retryDelay } = response.data;
  //   if (success) {
  //     const delay = Math.ceil(retryDelay / 1000);
  //     setRetryDelay(delay);
  //     setShowTextTimer(true);
  //   }
  // });
};
