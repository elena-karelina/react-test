import Button from '@components/ui/button/button';
import Input from '@components/ui/input/input';
import Isloading from '@components/ui/isLoading';
import { profileValidationSchema } from '@constants/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import getData from '@requests/profile/getData';
import patchData from '@requests/profile/patchData';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './profile.module.css';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

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

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlPatchData = (data) => {
    patchData(data).catch((error) => {
      if (error.response && error.response.status === 401) {
        alert(error.message);
        logOut();
      } else {
        alert(error.message);
      }
    });
  };

  const onSubmit = (data) => {
    handlPatchData(data);
  };

  const fetchData = async () => {
    try {
      const getProfileResponse = await getData();
      setUserData(getProfileResponse.data.user);
      setIsLoading(false);
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      Object.keys(userData).forEach((key) => setValue(key, userData[key]));
    }
  }, [userData, setValue]);

  if (isLoading) {
    return <Isloading />;
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} name='phone' placeholder='Телефон' errors={errors} />
        <Input register={register} name='lastname' placeholder='Фамилия' errors={errors} />
        <Input register={register} name='firstname' placeholder='Имя' errors={errors} />
        <Input register={register} name='middlename' placeholder='Отчество' errors={errors} />
        <Input register={register} name='email' placeholder='Почта' errors={errors} />
        <Input register={register} name='city' placeholder='Город' errors={errors} />
        <Button type='submit'>Сохранить</Button>
      </form>
      <Button type='button' variant='logout' onClick={logOut}>
        Выйти
      </Button>
    </div>
  );
}

export default Profile;
