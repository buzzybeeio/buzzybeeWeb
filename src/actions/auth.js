/* eslint-env browser */
import { isEmail, normalizeEmail } from 'validator';
import { dispatch } from '../Store';

const login = d => {
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
        url: 'http://localhost:4000/login',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: response => {
          if (Array.isArray(response)) {
            resolve({ err: true, response });
          } else {
            resolve({ err: false, response, data });
          }
        },
        error: reject,
      });
    }),
  });
};

const logOut = () => {
  localStorage.removeItem('d');
  dispatch({
    type: 'LOGOUT',
  });
};

const setD = data => {
  localStorage.setItem('d', JSON.stringify(data));
};

const getD = () => JSON.parse(localStorage.getItem('d'));

export { login, logOut, setD, getD };
