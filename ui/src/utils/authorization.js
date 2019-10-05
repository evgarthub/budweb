import axios from 'axios';
import api from "../variables/api";

export const doLogin = (login, pass) => {
  return axios.post(api.auth, {
    identifier: login,
    password: pass,
  });
}

export const doRegistration = (login, password, appartment, email, phone) => {
  return axios.post(api.register, {
    username: login,
    email,
    password,
    appartment,
    phone,
  });
};

export const getToken = () => localStorage.getItem("nb_token");

export const rules = {
  visitor: {
    static: []
  },
  authenticated: {
    static: [
      "requests:create",
      "requests:getMe",
    ],
  },
  editor: {
    static: [
      "requests:create",
      "requests:getMe",
      "requests:get",
      "requests:update",
    ]
  }
};
