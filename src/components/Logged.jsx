import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/auth';
import Button from 'material-ui/Button';
import ChangePassword from '../containers/differentPassword';

const Logged = ({ name, username }) => (
  <div>
    <h3>Welcome to the hive {name}!</h3>
    <p>Right now there isn't much you can make here, but look forward for our new features!</p>
    <Button
      component={Link}
      to="/profile/jobs"
    >
      <span className="Landing-Button">My Job Tracker</span>
    </Button>
    <ChangePassword username={username} />
    <button onClick={() => logOut()} className="btn btn-danger">Log out</button>
  </div>
);

function mapStateToProps(state) {
  return { name: state.user.firstName, username: state.user.username };
}

export default connect(mapStateToProps)(Logged);
