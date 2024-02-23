import { Login } from '../pages/login/login';
import '../style/style.css'

export const Layout=({children})=>{
    return(
        <div className="login-layout">
            {children}
        </div>
    )

}