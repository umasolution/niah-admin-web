
import config from 'config';

import axios from 'axios';

axios.interceptors.request.use(
  config => {
     
      if(true){
        console.log(config)
      }
      return config;
  },
  error => {
      console.log(error)
});

axios.interceptors.response.use(
  undefined,
  error => {
      console.log(error)
});

const login = async(username, password) => {
    const response = await axios.post(config.baseApiHost+'api/auth', {username,password});

    if(response.data.access_token){
      setSession(response.data.access_token, username);
      return response.data;
    }else {
      return false;
    }
    
    console.log(login);
}

const register = async(username, password,firstname, lastname) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  const response = await axios.post(config.baseApiHost+'api/register', {username,password,firstname, lastname});

  
 
  console.log(login);
}

const resetPassword = async(current_password, updated_password) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  const response = await axios.post(config.baseApiHost+'api/profile/password/update', {current_password,updated_password});

  
 
  return response;
}

const getProfile = async() => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

  const response = await axios.get(config.baseApiHost+'/api/getProfile');

  return response;
}

const setSession = (accessToken,username) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      delete axios.defaults.headers.common.Authorization;
    }
  }


  const logout = () => {
    setSession();

    return true;
  }

export {login, getProfile, register, resetPassword, logout};