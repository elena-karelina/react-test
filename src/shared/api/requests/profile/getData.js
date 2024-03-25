import instance from '../axiosInstance';

const getData = async () => instance.get('users/session');

export default getData;
