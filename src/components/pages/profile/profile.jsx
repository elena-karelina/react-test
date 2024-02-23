import { useEffect, useState } from "react";
import styles from "./profile.module.css"
import { getData, patchData } from "./requests";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Profile=()=>{
    const token = localStorage.getItem('token');
    const navigate  = useNavigate();
    let userData=null;
    const [isLoading, setIsLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const fetchData = async () => {
        if (token) {
            userData=await getData(token);
            console.log(userData, token);
            if(userData) {
                setPhoneNumber(userData.phone || "");
                setFirstName(userData.firstname || "");
                setMiddleName(userData.middlename || "");
                setLastName(userData.lastname || "");
                setEmail(userData.email || "");
                setCity(userData.city || "");
                setIsLoading(false);
            }
        }
        else{
            navigate('/')
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

      if (isLoading) {
        return <div>Loading...</div>; 
    }
    
    return(    
        <div className={styles.wrapper}>
            <form  onSubmit={(e) => {
            e.preventDefault(); // Предотвращаем стандартное поведение отправки формы
            patchData(token, phoneNumber, firstName, middleName, lastName, email, city, () => navigate('/'));
        }}>
            <input placeholder="Телефон" value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value) }></input>
            <input placeholder="Фамилия" value={lastName}  onChange={(e) => setLastName(e.target.value)}></input>
            <input placeholder="Имя" value={firstName}  onChange={(e) => setFirstName(e.target.value)}></input>
            <input placeholder="Отчество" value={middleName}  onChange={(e) => setMiddleName(e.target.value)}></input>
            <input placeholder="Почта" value={email} type="email" onChange={(e) => setEmail(e.target.value)}></input>
            <input placeholder="Город" value={city}  onChange={(e) => setCity(e.target.value)}></input>
            <button type="submit">Сохранить</button> 
            
        </form>
        <button className={styles.logout} onClick={() => navigate('/')}>Выйти</button>
        </div>        
        
    )
}