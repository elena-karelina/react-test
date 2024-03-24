import { TextTimer } from './components/textTimer';
import styles from './login.module.css';
import useLogin from './useLogin';

import { NextButton } from '../../shared/ui/button';
import '@style/style.css';

export const Login = () => {
  const name = ds;
  const {
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
  } = useLogin();

  const { phone } = getValues();
  return (
    <div className={`${styles.wrapper}`}>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Введите {showNextButton ? 'номер телефона' : 'проверочный код'} для входа в личный кабинет</p>
        <input {...register('phone')} placeholder='Телефон' className={`${styles.block} ${styles.input}`} />
        {errors?.phone && <div className='errors'>{errors?.phone?.message || 'Error!'}</div>}
        {showVerificationInput && (
          <>
            <input {...register('code')} placeholder='Проверочный код' className={`${styles.block} ${styles.input}`} />
            {errors?.code && <div className='errors'>{errors?.code?.message || 'Error!'}</div>}
          </>
        )}
        <NextButton>{showNextButton ? 'Продолжить' : 'Войти'}</NextButton>
      </form>
      {showTextTimer && (
        <TextTimer
          initValue={retryDelay}
          phoneNumber={phone}
          setRetryDelay={setRetryDelay}
          setShowTextTimer={setShowTextTimer}
        />
      )}
    </div>
  );
};
