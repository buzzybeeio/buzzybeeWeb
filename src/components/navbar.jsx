/* eslint object-curly-newline: 0 */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { ChevronRight } from 'material-ui-icons';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { yellow, grey, amber } from 'material-ui/colors';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Selected = withRouter(({ path, location: { pathname }, exact }) => {
  let opacity = 0;
  if (exact && path === pathname) opacity = 1;
  else if (!exact && pathname.substr(0, path.length) === path) opacity = 1;
  return <ChevronRight style={{ marginRight: '-5px', opacity }} />;
});

// Small Nav Button
const SNB = ({ to, closeFN, text, exact }) => (
  <MenuItem
    component={Link}
    onClick={closeFN}
    to={to}
  >
    <span className="nav-link-small">
      <Selected path={to} exact={exact} /> {text}
    </span>
  </MenuItem>
);
// Nav Button
const NB = ({ to, text, exact }) => (
  <Link to={to} className="nav-link">
    <Selected path={to} exact={exact} /> {text}
  </Link>
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
          <Typography style={{ fontWeight: 700, fontSize: '2em', flex: 1, color: grey[700], paddingLeft: 0 }}>
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
            <NB to="/" exact text="Home" />
            <NB to="/jobs" text="Jobs" />
            <NB to="/about" text="About" />
            <Link to="/profile" className="nav-link">
              {
                profile === 'J' ? (
                  <Button
                    style={{
                      border: `3px ${amber[500]} solid`,
                      transform: 'scale(0.8)',
                      borderRadius: '8px',
                      color: amber[500],
                    }}
                  >
                    <span className="join-the-hive">Join the HIVE</span>
                  </Button>
                ) : <span><Selected path="/profile" /> {profile}</span>
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

export default withRouter(connect(mapStateToProps)(Nav));
