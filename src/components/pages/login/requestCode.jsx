import PropTypes from 'prop-types';
import styles from './login.module.css';

export const RequestCode = ({ onClick }) => (
  <p onClick={onClick} className={styles.request_code_text}>
    Запросить код еще раз
  </p>
);

RequestCode.propTypes = {
  onClick: PropTypes.func.isRequired,
};
