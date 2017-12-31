// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = props => {
  let str;
  if (props.status === 'notLoggedIn') {
    str = 'Login';
  } else if (props.status === 'loggingIn') {
    str = 'Logging in...';
  } else {
    str = props.name;
  }
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="">
            <img className="buzzybee_writing" alt="Brand" src="buzzybee-logo.jpg" />
          </Link>
          <Link to="/" className="navbar-brand">
            <img className="buzzybee_writing" alt="Brand" src="BuzzyBee_logo.png" />
          </Link>

          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>

        <div className="collapse navbar-collapse navbar-right">
          <ul className="nav navbar-nav">
            <li>
              <Link data-toggle="collapse" data-target=".navbar-collapse" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link data-toggle="collapse" data-target=".navbar-collapse" to="/jobs">
                Jobs
              </Link>
            </li>
            <li>
              <Link data-toggle="collapse" data-target=".navbar-collapse" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link data-toggle="collapse" data-target=".navbar-collapse" to="/profile">
                {str}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

function mapStateToProps(state) {
  return { status: state.user.status, name: state.user.firstName };
}

export default connect(mapStateToProps)(Nav);
