import axios from 'axios';

export const getData = async (token) => {
    try {
        const response = await axios.get('https://shift-backend.onrender.com/users/session', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data.user);
        return response.data.user;
      } catch (error) {
        alert(error.message);
      }
};

export const patchData = async (token,  phoneNumber,firstName,middleName,lastName, email,city, unavtorise) => {
  axios.patch('https://shift-backend.onrender.com/users/profile', {
    profile: {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      email: email,
      city: city
    },
    phone: phoneNumber
  }, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response && error.response.status === 401) {
      alert(error.message);
      unavtorise();
    } else {
      alert(error.message);
    }
  });
};

export const logOut=(unavtorise)=>{
  localStorage.removeItem('token');
  unavtorise();

}


