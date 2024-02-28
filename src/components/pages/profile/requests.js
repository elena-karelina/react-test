import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACK_URL;

export const getData = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/users/session`, {
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
      `${apiUrl}/users/profile`,
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
