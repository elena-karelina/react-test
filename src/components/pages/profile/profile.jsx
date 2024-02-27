import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, logOut, patchData } from './requests';
import styles from './profile.module.css';

export const Profile = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  let userData = null;
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const fetchData = async () => {
    try {
      if (token) {
        userData = await getData(token);
        console.log(userData, token);
        if (userData) {
          setPhoneNumber(userData.phone || '');
          setFirstName(userData.firstname || '');
          setMiddleName(userData.middlename || '');
          setLastName(userData.lastname || '');
          setEmail(userData.email || '');
          setCity(userData.city || '');
          setIsLoading(false);
        }
        console.log(userData.phone);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          patchData(token, phoneNumber, firstName, middleName, lastName, email, city, () => navigate('/'));
        }}
      >
        <input
          placeholder='Телефон'
          value={phoneNumber}
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
        <input placeholder='Фамилия' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
        <input placeholder='Имя' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
        <input placeholder='Отчество' value={middleName} onChange={(e) => setMiddleName(e.target.value)}></input>
        <input placeholder='Почта' value={email} type='email' onChange={(e) => setEmail(e.target.value)}></input>
        <input placeholder='Город' value={city} onChange={(e) => setCity(e.target.value)}></input>
        <button type='submit'>Сохранить</button>
      </form>
      <button className={styles.logout} onClick={() => logOut(() => navigate('/'))} type='button'>
        Выйти
      </button>
    </div>
  );
};
