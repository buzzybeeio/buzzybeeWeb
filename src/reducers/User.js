import { setD, deleteD, getD } from '../actions/auth';

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
    deleteD();
    newState = {
      ...state,
      errorsLogin: payload.response,
      status: 'notLoggedIn',
    };
  } else {
    if (!getD()) payload.pushToHistory('/profile');
    setD(payload.data);
    newState = {
      ...state,
      ...payload.response,
      errorsLogin: [],
      status: 'loggedIn',
    };
  }

  return newState;
};

export default (state = defaultUserData, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return { ...state, status: 'loggingIn' };

    case 'LOGIN_FULFILLED':
      return login(state, action.payload);

    case 'LOGIN_REJECTED':
      deleteD();
      return {
        ...state,
        errorsLogin: ['There was an error, try again later! \n Error: INTERNAL'],
        status: 'notLoggedIn',
      };

    case 'LOGOUT':
      return defaultUserData;

    default:
      return state;
  }
};
