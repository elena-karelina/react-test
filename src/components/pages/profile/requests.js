import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const getData = async (token) => {
  try {
    const response = await axios.get('https://shift-backend.onrender.com/users/session', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.user);
    return response.data.user;
  } catch (error) {
    alert(error.message);
  }
};

export const PatchData = async (token, phoneNumber, firstName, middleName, lastName, email, city) => {
  const navigate = useNavigate();
  axios
    .patch(
      'https://shift-backend.onrender.com/users/profile',
      {
        profile: {
          firstname: firstName,
          middlename: middleName,
          lastname: lastName,
          email: email,
          city: city,
        },
        phone: phoneNumber,
      },
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
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

export const LogOut = () => {
  const navigate = useNavigate();
  localStorage.removeItem('token');
  navigate('/');
};
