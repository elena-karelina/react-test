import axios from 'axios';

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

export const patchData = async (token, data, unavtorise) => {
  axios
    .patch(
      'https://shift-backend.onrender.com/users/profile',
      {
        profile: {
          firstname: data.firstname,
          middlename: data.middlename,
          lastname: data.lastname,
          email: data.email,
          city: data.city,
        },
        phone: data.phone,
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
        unavtorise();
      } else {
        alert(error.message);
      }
    });
};

export const logOut = (unavtorise) => {
  console.log('logout');
  localStorage.removeItem('token');
  unavtorise();
};
