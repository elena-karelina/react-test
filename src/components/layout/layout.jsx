import styles from './layout.module.css';

function Layout({ children }) {
  return <div className={styles.login_layout}>{children}</div>;
}

export default Layout;
