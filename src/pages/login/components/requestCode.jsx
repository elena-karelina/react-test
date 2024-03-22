import PropTypes from 'prop-types';

import styles from '../login.module.css';

export const RequestCode = ({ onClick }) => (
  <button onClick={onClick} className={styles.request_code_text}>
    Запросить код еще раз
  </button>
);

RequestCode.propTypes = {
  onClick: PropTypes.func.isRequired,
};
