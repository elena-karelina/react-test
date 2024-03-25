import styles from '../login.module.css';

function RequestCode({ onClick }) {
  return (
    <p onClick={onClick} className={styles.request_code_text}>
      Запросить код еще раз
    </p>
  );
}

export default RequestCode;
