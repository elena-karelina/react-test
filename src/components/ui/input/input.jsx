import styles from './input.module.css';

function InputComponent({ register, name, placeholder, errors }) {
  return (
    <>
      <input {...register(name)} placeholder={placeholder} className={styles.input} />
      {errors?.[name] && <div className='errors'>{errors?.[name]?.message || 'Error!'}</div>}
    </>
  );
}

export default InputComponent;
