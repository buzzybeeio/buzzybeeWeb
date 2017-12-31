import { dispatch } from '../Store';
import { POST } from '../requests';

const login = data => {
  dispatch({
    type: 'LOGIN',
    payload: POST('http://localhost:4000/login', data),
  });
};

const logOut = () => {
  dispatch({
    type: 'LOGOUT',
  });
};

export { login, logOut };
