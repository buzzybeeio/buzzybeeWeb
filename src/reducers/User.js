const defaultUserData = {
  status: 'notLoggedIn',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  errorsLogin: [],
  errorsRegister: [],
};

const login = (state, payload) => {
  let newState = null;
  if (Array.isArray(payload)) {
    newState = { ...state, errorsLogin: payload, status: 'notLoggedIn' };
  } else {
    newState = {
      ...state,
      ...payload,
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
      return {
        ...state,
        errorsLogin: ['There was an error, try again later! \n Error: INTERNAL'],
        status: 'notLoggedIn',
      };

    default:
      return state;
  }
};
