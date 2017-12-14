const defaultUserData = {
  status: 'notSignedIn',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
};

export default (state = defaultUserData, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
