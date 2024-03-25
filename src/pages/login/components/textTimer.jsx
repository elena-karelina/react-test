import { useEffect, useState } from 'react';
import getOtpCode from '@requests/login/getOtpCode';
import RequestCode from './requestCode';

import styles from '../login.module.css';

function TextTimer({ initValue, phoneNumber, setRetryDelay, setShowTextTimer }) {
  const [seconds, setSeconds] = useState(initValue);

  const onRequestCodeClick = () => {
    setSeconds(initValue);
    getOtpCode(phoneNumber, setRetryDelay, setShowTextTimer);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds >= 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  if (seconds > 0) {
    return (
      <p className={styles.timer_text}>
        Запросить код повторно можно через
        <span>{seconds}</span>
        секунд
      </p>
    );
  }
  return <RequestCode onClick={onRequestCodeClick} />;
}

export default TextTimer;
