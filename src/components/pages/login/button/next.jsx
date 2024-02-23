import styles from '../login.module.css'


export const NextButton=({ onClick })=>{
    return(            
        <button className={`${styles.block} ${styles.button}`} onClick={onClick} > Продолжить</button>
    )
}