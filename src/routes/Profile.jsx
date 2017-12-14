import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';

const Profile = () => (
  <div>
    <Route path="/profile/login" component={Login} />
    <Route path="/profile/register" component={Register} />
  </div>
);

function mapStateToProps(state) {
  return { ...state.user };
}

export default connect(mapStateToProps)(Profile);
