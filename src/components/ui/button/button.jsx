import styles from './button.module.css';

function Button({ children, type, variant, onClick }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
