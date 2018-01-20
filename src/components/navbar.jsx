/* eslint object-curly-newline: 0 */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
// import { Menu, ChevronRight } from 'material-ui-icons';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { yellow, blueGrey, amber } from 'material-ui/colors';
// import { Link, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/*
const Selected = ({ path, exact }) => (
  <Route exact={exact} path={path} render={() => <ChevronRight style={{ display: 'inline' }} />} />
)
*/

// Small Nav Button
const SNB = ({ to, closeFN, text }) => (
  <MenuItem
    component={Link}
    onClick={closeFN}
    to={to}
  >
    <span className="nav-link-small">{text}</span>
  </MenuItem>
);

// Yellow span
const YS = ({ children }) => <span style={{ color: yellow[800] }}>{children}</span>;

class Nav extends Component {
  constructor() {
    super();
    this.state = { anchorEl: null };
  }
  handleMenu = e => this.setState({ anchorEl: e.currentTarget })
  handleClose = () => this.setState({ anchorEl: null })

  render() {
    const { name, status } = this.props;
    let profile;
    if (status === 'notLoggedIn') {
      profile = 'J';
    } else if (status === 'loggingIn') {
      profile = 'Logging in...';
    } else {
      profile = name;
    }
    return (
      <AppBar style={{ backgroundColor: 'white', border: 'none' }}>
        <Toolbar className="container">
          <img alt="Brand" src="buzzybee-logo.jpg" className="nav-image" />
          <Typography style={{ fontWeight: 700, fontSize: '2em', flex: 1, color: blueGrey[700], paddingLeft: 0 }}>
            Buzzy<YS>bee</YS>.i<YS>o</YS>
          </Typography>

          <div className="nav-small">
            <IconButton onClick={this.handleMenu}>
              <MenuIcon className="icon" />
            </IconButton>
            <Menu
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <SNB to="/" exact text="Home" closeFN={this.handleClose} />
              <SNB to="/jobs" text="Jobs" closeFN={this.handleClose} />
              <SNB to="/about" text="About" closeFN={this.handleClose} />
              <SNB to="/profile" text={profile === 'J' ? 'Join the HIVE' : profile} closeFN={this.handleClose} />
            </Menu>
          </div>
          <div className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/jobs" className="nav-link">Jobs</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/profile" className="nav-link">
              {
                profile === 'J' ? (
                  <Button
                    style={{
                      border: `3px ${amber[500]} solid`,
                      transform: 'scale(0.8)',
                      borderRadius: '8px',
                    }}
                  >
                    <span className="join-the-hive">Join the HIVE</span>
                  </Button>
                ) : profile
              }
            </Link>
          </div>
        </Toolbar>
      </AppBar >
    );
  }
}

function mapStateToProps(state) {
  return { status: state.user.status, name: state.user.firstName };
}

export default connect(mapStateToProps)(Nav);
