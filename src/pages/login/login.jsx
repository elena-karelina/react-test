import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { NextButton } from '../../shared/ui/button';
import { TextTimer } from './components/textTimer';
import { GetOtpCode, SignIn } from '../../shared/api/requests/login/requests';
import styles from './login.module.css';
import '../../app/style/style.css';

export const Login = () => {
  const [showNextButton, setShowNextButton] = useState(true);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showTextTimer, setShowTextTimer] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [retryDelay, setRetryDelay] = useState(0);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    if (showNextButton) {
      handleNextButtonClick();
    } else {
      handleLoginButtonClick();
    }
  };

  const handleNextButtonClick = () => {
    if (!phoneNumber) {
      return;
    }
    GetOtpCode(phoneNumber, setRetryDelay, setShowTextTimer);
    setShowVerificationInput(true);
    setShowNextButton(false);
  };

  const handleLoginButtonClick = () => {
    if (!phoneNumber || !otpCode) {
      return;
    }

    SignIn(phoneNumber, otpCode, () => navigate('/profile'));
  };

  return (
    <div className={`${styles.wrapper}`}>
      <h1>Вход</h1>
      <form
        onSubmit={(e) => {
          // e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <p>Введите {showNextButton ? 'номер телефона' : 'проверочный код'} для входа в личный кабинет</p>
        <input
          {...register('phone', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Введите только цифры',
            },
          })}
          placeholder='Телефон'
          className={`${styles.block} ${styles.input}`}
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <div className='errors'>{errors?.phone && <span>{errors?.phone?.message || 'Error!'}</span>}</div>
        {showVerificationInput && (
          <>
            <input
              {...register('code', {
                required: 'Поле обязательно к заполнению',
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Введите только цифры',
                },
                minLength: {
                  value: 6,
                  message: 'Введите код из 6 символов',
                },
                maxLength: {
                  value: 6,
                  message: 'Введите код из 6 символов',
                },
              })}
              placeholder='Проверочный код'
              className={`${styles.block} ${styles.input}`}
              value={otpCode}
              onChange={(e) => {
                setOtpCode(e.target.value);
              }}
            />
            <div className='errors'>{errors?.code && <span>{errors?.code?.message || 'Error!'}</span>}</div>
          </>
        )}
        {showNextButton ? <NextButton>Продолжить</NextButton> : <NextButton>Войти</NextButton>}
      </form>
      {showTextTimer && (
        <TextTimer
          initValue={retryDelay}
          phoneNumber={phoneNumber}
          setRetryDelay={setRetryDelay}
          setShowTextTimer={setShowTextTimer}
        />
      )}
    </div>
  );
};
