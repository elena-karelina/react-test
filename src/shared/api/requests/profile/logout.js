export const logOut = (unauthorized) => {
  console.log('logout');
  localStorage.removeItem('token');
  unauthorized();
};
