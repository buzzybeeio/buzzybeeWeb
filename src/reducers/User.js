import { setToken, deleteToken, getToken } from '../actions/auth';

const defaultUserData = {
  status: 'notLoggedIn',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  errorsLogin: [],
};

const login = (state, payload) => {
  let newState = null;
  if (payload.err) {
    newState = {
      ...state,
      errorsLogin: payload.response,
      status: 'notLoggedIn',
    };
  } else {
    if (!getToken()) payload.pushToHistory('/profile');
    setToken(payload.response.token);
    newState = {
      ...state,
      ...payload.response.user,
      errorsLogin: [],
      status: 'loggedIn',
    };
  }

  return newState;
};

const loginWT = (state, payload, err) => {
  if (err) {
    if (payload) console.log(payload);
    deleteToken();
    return { ...state, status: 'notLoggedIn' };
  }
  return {
    ...state,
    ...payload,
    status: 'loggedIn',
  };
};

export default (state = defaultUserData, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return { ...state, status: 'loggingIn' };

    case 'LOGIN_FULFILLED':
      return login(state, action.payload);

    case 'LOGIN_REJECTED':
      return {
        ...state,
        errorsLogin: ['There was an error, try again later! \n Error: INTERNAL'],
        status: 'notLoggedIn',
      };

    case 'LOGIN_W_TOKEN_PENDING':
      return { ...state, status: 'loggingIn' };

    case 'LOGIN_W_TOKEN_FULFILLED':
      return loginWT(state, action.payload.data);

    case 'LOGIN_W_TOKEN_REJECTED':
      return loginWT(state, action.payload.response, true);

    case 'LOGOUT':
      return defaultUserData;

    default:
      return state;
  }
};
