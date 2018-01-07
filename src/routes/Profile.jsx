import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Logged from '../components/Logged';
import NotLogged from '../components/NotLogged';

const Profile = props => {
  let Component = null;
  if (props.status === 'loggedIn') {
    Component = Logged;
  } else if (props.status === 'loggingIn') {
    Component = () => (<img src="spinner.svg" alt="spinner" className="spinner" />);
  } else {
    Component = NotLogged;
  }

  return (
    <div className="container">
      <Switch>
        <Route path="/profile/login" component={Login} />
        <Route path="/profile/register" component={Register} />
        <Route exact path="/profile" component={Component} />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return { status: state.user.status };
}

export default connect(mapStateToProps)(Profile);
