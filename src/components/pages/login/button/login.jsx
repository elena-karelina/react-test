import styles from '../login.module.css'


export const LoginButton=({ onClick })=>{
    return(            
        <button className={`${styles.block} ${styles.button}`} onClick={ onClick } > Войти</button>
    )
}