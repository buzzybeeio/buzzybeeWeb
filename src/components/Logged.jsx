import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/auth';
import ChangePassword from '../containers/differentPassword';
import AddJobs from '../containers/AddJobs';

const Logged = ({ name, username }) => (
  <div>
    <h3>Welcome to the hive {name}!</h3>
    <p>Right now there isn't much you can make here, but look forward for our new features!</p>
    <ChangePassword username={username} />
    <button onClick={() => logOut()} className="btn btn-danger">Log out</button>
    <AddJobs />
  </div>
);

function mapStateToProps(state) {
  return { name: state.user.firstName, username: state.user.username };
}

export default connect(mapStateToProps)(Logged);
