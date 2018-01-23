/* eslint-env browser */
/* eslint object-curly-newline: 0 */
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
            resolve({ err: false, response, data, pushToHistory });
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

const deleteD = () => {
  if (localStorage.getItem('d')) localStorage.removeItem('d');
};

export { login, logOut, setD, getD, deleteD };
