import styles from './login.module.css';

export const RequestCode = (onClick) => (
  <p onClick={onClick} className={styles.request_code_text}>
    Запросить код еще раз
  </p>
);
