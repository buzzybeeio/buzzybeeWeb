// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { yellow } from 'material-ui/colors';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Yellow span
const YS = ({ children }) => <span style={{ color: yellow[800] }}>{children}</span>

class Nav extends Component {
  constructor() {
    super();
    this.state = { anchorEl: null };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { name, status } = this.props;
    let str;
    if (status === 'notLoggedIn') {
      str = 'Login';
    } else if (status === 'loggingIn') {
      str = 'Logging in...';
    } else {
      str = name;
    }
    return (
      <AppBar style={{ backgroundColor: 'white', border: 'none' }}>
        <Toolbar className="container">
          <img className="buzzybee_writing" alt="Brand" src="buzzybee-logo.jpg" />
          <Typography style={{ flex: 1, fontSize: '2em', fontWeight: 700 }}>
            Buzzy<YS>bee</YS>.i<YS>o</YS>
          </Typography>


          <ul className="nav">
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
        </Toolbar>
      </AppBar>
    );
  }
};

function mapStateToProps(state) {
  return { status: state.user.status, name: state.user.firstName };
}

export default connect(mapStateToProps)(Nav);
