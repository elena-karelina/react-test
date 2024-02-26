import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GetOtpCode = (phoneNumber, setRetryDelay, setShowTextTimer) => {
  axios
    .post('https://shift-backend.onrender.com/auth/otp', {
      phone: phoneNumber,
    })
    .then((response) => {
      console.log(response);
      const { success, retryDelay } = response.data;
      if (success) {
        const delay = retryDelay / 1000;
        setRetryDelay(delay);
        setShowTextTimer(true);
      }
    });
};

export const SignIn = (phoneNumber, otpCode) => {
  const navigate = useNavigate();
  axios
    .post('https://shift-backend.onrender.com/users/signin', {
      phone: phoneNumber,
      code: otpCode,
    })
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/profile');
    })
    .catch((error) => {
      if (error.response) {
        alert('Ошибка:', error.response.data.reason);
      }
    });
};
