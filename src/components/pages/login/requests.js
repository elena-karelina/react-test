import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACK_URL;

export const GetOtpCode = (phoneNumber, setRetryDelay, setShowTextTimer) => {
  console.log(phoneNumber);
  axios
    .post(`${apiUrl}/auth/otp`, {
      phone: phoneNumber,
    })
    .then((response) => {
      console.log(response);
      const { success, retryDelay } = response.data;
      if (success) {
        const delay = Math.ceil(retryDelay / 1000);
        setRetryDelay(delay);
        setShowTextTimer(true);
      }
    });
};

export const SignIn = (phoneNumber, otpCode, signIn) => {
  axios
    .post(`${apiUrl}/users/signin`, {
      phone: phoneNumber,
      code: otpCode,
    })
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      signIn();
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.message);
        alert('Ошибка: ' + error.message);
      }
    });
};
