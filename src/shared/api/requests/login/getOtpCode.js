import instance from '../axiosInstance';

const getOtpCode = (phone) =>
  instance.post('auth/otp', {
    phone,
  });

export default getOtpCode;
