import instance from '../axiosInstance';

const signIn = (phone, code) =>
  instance.post('users/signin', {
    phone,
    code,
  });

export default signIn;
