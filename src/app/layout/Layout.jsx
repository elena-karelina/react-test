import PropTypes from 'prop-types';

import styles from './layout.module.css';

export const Layout = ({ children }) => <div className={styles.login_layout}>{children}</div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
