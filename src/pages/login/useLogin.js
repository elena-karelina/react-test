import { loginConditionalValidationSchema } from '@constants/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import getOtpCode from '@requests/login/getOtpCode';
import signIn from '@requests/login/signIn';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [showNextButton, setShowNextButton] = useState(true);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [showTextTimer, setShowTextTimer] = useState(false);
  const [retryDelay, setRetryDelay] = useState(0);
  const validationSchema = loginConditionalValidationSchema(showVerificationInput);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const handleGetOtpCode = (phone) => {
    getOtpCode(phone).then((res) => {
      const { success, delay } = res.data.retryDelay;
      if (success) {
        const del = Math.ceil(delay / 1000);
        setRetryDelay(del);
        setShowTextTimer(true);
      }
    });
  };
  const handleSignIn = (phone, code) => {
    signIn(phone, code)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/profile');
      })
      .catch((error) => {
        if (error.response) {
          alert(`Ошибка: ${error.message}`);
        }
      });
  };

  const handleNextButtonClick = (phone) => {
    if (!phone) {
      return;
    }

    handleGetOtpCode(phone);
    setShowVerificationInput(true);
    setShowNextButton(false);
  };

  const handleLoginButtonClick = (phone, code) => {
    if (!phone || !code) {
      return;
    }

    handleSignIn(phone, code);
  };

  const onSubmit = (data) => {
    const { phone, code } = data;
    if (showNextButton) {
      handleNextButtonClick(phone);
    } else {
      handleLoginButtonClick(phone, code);
    }
  };

  return {
    showNextButton,
    showVerificationInput,
    showTextTimer,
    setShowTextTimer,
    retryDelay,
    setRetryDelay,
    register,
    errors,
    handleSubmit,
    getValues,
    onSubmit,
  };
};

export default useLogin;
