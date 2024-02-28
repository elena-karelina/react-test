import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RequestCode } from './requestCode';
import { GetOtpCode } from '../../../shared/api/requests/login/requests';
import styles from '../login.module.css';

export const TextTimer = ({ initValue, phoneNumber, setRetryDelay, setShowTextTimer }) => {
  const [seconds, setSeconds] = useState(initValue);

  const onRequestCodeClick = () => {
    setSeconds(initValue);
    GetOtpCode(phoneNumber, setRetryDelay, setShowTextTimer);
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
        }}
      />
    );
};

TextTimer.propTypes = {
  initValue: PropTypes.number.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setRetryDelay: PropTypes.func.isRequired,
  setShowTextTimer: PropTypes.func.isRequired,
};
