import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACK_URL;

export const patchData = async (token, data) => {
  return axios.patch(
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
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
