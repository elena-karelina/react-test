import Button from '@components/ui/button/button';
import Input from '@components/ui/input/input';
import TextTimer from './components/textTimer';
import styles from './login.module.css';
import useLogin from './useLogin';

function Login() {
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
        <p>
          Введите
          {showNextButton ? 'номер телефона' : 'проверочный код'}
          для входа в личный кабинет
        </p>
        <Input register={register} name='phone' placeholder='Телефон' errors={errors} />
        {showVerificationInput && (
          <Input register={register} name='code' placeholder='Проверочный код' errors={errors} />
        )}
        <Button type='submit'>{showNextButton ? 'Продолжить' : 'Войти'}</Button>
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
}

export default Login;
