import PropTypes from 'prop-types';
import styles from './login.module.css';

export const NextButton = ({ onClick, children }) => (
  <button className={`${styles.block} ${styles.button}`} onClick={onClick} type='submit'>
    {children}
  </button>
);

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
