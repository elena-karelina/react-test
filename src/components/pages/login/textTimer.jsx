import { useEffect, useState } from 'react';
import { RequestCode } from './requestCode';
import { GetOtpCode } from './requests';
import styles from './login.module.css';

export const TextTimer = (initValue, phoneNumber, setRetryDelay, setShowTextTimer) => {
  const [seconds, setSeconds] = useState(initValue);

  const onRequestCodeClick = () => {
    setSeconds(initValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds >= 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  if (seconds > 0)
    return (
      <p className={styles.timer_text}>
        Запросить код повторно можно через <span>{seconds}</span> секунд
      </p>
    );
  else
    return (
      <RequestCode
        onClick={() => {
          onRequestCodeClick();
          GetOtpCode(phoneNumber, setRetryDelay, setShowTextTimer);
        }}
      />
    );
};
