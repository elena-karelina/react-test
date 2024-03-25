import instance from '../axiosInstance';

const patchData = async (data) =>
  instance.patch('users/profile', {
    profile: {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      email: data.email,
      city: data.city,
    },
    phone: data.phone,
  });

export default patchData;
