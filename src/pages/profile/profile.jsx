import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getData, logOut, patchData } from '../../shared/api/requests/profile/requests';
import styles from './profile.module.css';
import '../../app/style/style.css';

export const Profile = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  let userData = {
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    city: '',
    phone: '',
  };
  const [data, setData] = useState(userData);
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    patchData(token, data, () => navigate('/'));
  };

  const fetchData = async () => {
    try {
      if (token) {
        userData = await getData(token);
        console.log(userData, token);
        if (userData) {
          setData({
            firstname: userData.firstname || '',
            middlename: userData.middlename || '',
            lastname: userData.lastname || '',
            email: userData.email || '',
            city: userData.city || '',
            phone: userData.phone,
          });
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
          handleSubmit(onSubmit)(e);
        }}
      >
        <input
          {...register('phone', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Введите только цифры',
            },
          })}
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        ></input>
        <div className='errors'>{errors?.phone && <span>{errors?.phone?.message || 'Error!'}</span>}</div>
        <input
          {...register('lastname')}
          placeholder='Фамилия'
          value={data.lastname}
          onChange={(e) => setData({ ...data, lastname: e.target.value })}
        ></input>
        <input
          {...register('firstname')}
          placeholder='Имя'
          value={data.firstname}
          onChange={(e) => setData({ ...data, firstname: e.target.value })}
        ></input>
        <input
          {...register('middlename')}
          placeholder='Отчество'
          value={data.middlename}
          onChange={(e) => setData({ ...data, middlename: e.target.value })}
        ></input>
        <input
          {...register('email')}
          placeholder='Почта'
          value={data.email}
          type='email'
          onChange={(e) => setData({ ...data, email: e.target.value })}
        ></input>
        <input
          {...register('city')}
          placeholder='Город'
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
        ></input>
        <button type='submit'>Сохранить</button>
      </form>
      <button className={styles.logout} onClick={() => logOut(() => navigate('/'))} type='button'>
        Выйти
      </button>
    </div>
  );
};
