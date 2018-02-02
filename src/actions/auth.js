/* eslint-env browser */
/* eslint object-curly-newline: 0 */
import axios from 'axios';
import { isEmail, normalizeEmail } from 'validator';
import { dispatch } from '../Store';
import { BackendUrl } from '../requests';

const login = (d, pushToHistory) => {
  const data = Object.assign({}, d);
  if (isEmail(data.string)) {
    data.string = normalizeEmail(data.string, {
      gmail_lowercase: true,
      yahoo_lowercase: true,
      icloud_lowercase: true,
    });
  }

  dispatch({
    type: 'LOGIN',
    payload: new Promise((resolve, reject) => {
      window.$.ajax({
        type: 'POST',
        url: `${BackendUrl}/login`,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: response => {
          if (Array.isArray(response)) {
            resolve({ err: true, response });
          } else {
            resolve({ err: false, response, pushToHistory });
          }
        },
        error: reject,
      });
    }),
  });
};

const loginWT = () => {
  const token = localStorage.getItem('t');
  if (token) {
    dispatch({
      type: 'LOGIN_W_TOKEN',
      payload: axios.get(`${BackendUrl}/loginWToken`, { headers: { Authorization: token } }),
    });
  }
};

const logOut = () => {
  localStorage.removeItem('t');
  dispatch({
    type: 'LOGOUT',
  });
};

const setToken = token => {
  localStorage.setItem('t', token);
};

const getToken = () => localStorage.getItem('t');

const deleteToken = () => {
  if (localStorage.getItem('t')) localStorage.removeItem('t');
};

export { login, loginWT, logOut, setToken, getToken, deleteToken };
