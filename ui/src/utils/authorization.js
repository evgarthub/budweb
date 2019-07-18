import axios from 'axios';
import api from "../variables/api";

export const getUserInfo = () => {
    return axios.get(api.userMe, {
        headers: {
            Authorization: `Bearer ${getToken()}`, 
        }
    });    
}

export const doLogin = (login, pass) => {
    return axios.post(api.auth, {
      identifier: login,
      password: pass,
    });
  }

export const getToken = () => localStorage.getItem("nb_token");