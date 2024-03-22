import { profileValidationSchema } from '@constants/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { getData } from '@requests/profile/getData';
import { logOut } from '@requests/profile/logout';
import { patchData } from '@requests/profile/patchData';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './profile.module.css';
import '@style/style.css';

export const Profile = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(profileValidationSchema),
    mode: 'onBlur',
  });

  const handlPatchData = (data) => {
    patchData(token, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert(error.message);
          navigate('/');
        } else {
          alert(error.message);
        }
      });
  };

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    handlPatchData(data);
  };

  const fetchData = async () => {
    try {
      if (token) {
        const profileData = await getData(token);
        if (profileData) {
          setData(profileData);
          setIsLoading(false);
        }
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

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => setValue(key, data[key]));
    }
  }, [data, setValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('phone')} />
        {errors?.phone && <div className='errors'>{errors?.phone?.message || 'Error!'}</div>}
        <input {...register('lastname')} placeholder='Фамилия' />
        <input {...register('firstname')} placeholder='Имя' />
        <input {...register('middlename')} placeholder='Отчество' />
        <input {...register('email')} placeholder='Почта' />
        {errors?.email && <div className='errors'>{errors?.email?.message || 'Error!'}</div>}
        <input {...register('city')} placeholder='Город' />
        <button type='submit'>Сохранить</button>
      </form>
      <button className={styles.logout} onClick={() => logOut(() => navigate('/'))} type='button'>
        Выйти
      </button>
    </div>
  );
};
