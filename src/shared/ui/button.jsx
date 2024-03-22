import PropTypes from 'prop-types';

import styles from '../../pages/login/login.module.css';

export const NextButton = ({ children }) => (
  <button className={`${styles.block} ${styles.button}`} type='submit'>
    {children}
  </button>
);

NextButton.propTypes = {
  children: PropTypes.node.isRequired,
};
