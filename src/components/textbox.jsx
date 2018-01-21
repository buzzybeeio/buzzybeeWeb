import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { amber } from 'material-ui/colors';
import SubscribeForm from './SubscribeForm';

export default class TextBox extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }
  SignUpStyle = {
    color: amber[500],
    border: `2px ${amber[500]} solid`,
    borderRadius: '8px',
  }
  CreateAccountStyle = {
    color: '#222',
    border: `2px ${amber[500]} solid`,
    borderRadius: '8px',
    backgroundColor: amber[500],
  }
  render() {
    return (
      <div className="textbox">
        <h3 className="Landing-JTH">JOIN THE HIVE</h3>
        <p className="Landing-P">
          Sign up for our Newsletter to get the latest jobs
        in your area and weekly success stories about how normal people
        broke through into the tech field
        </p>
        <div className="flex-row">
          <Button style={this.SignUpStyle} onClick={() => this.setState({ open: true })}><span className="Landing-Button">SIGN UP</span></Button>
          <span style={{ color: '#bbb' }}>OR</span>
          <Button
            component={Link}
            to="/profile/register"
            style={this.CreateAccountStyle}
          >
            <span className="Landing-Button">CREATE ACCOUNT</span>
          </Button>
        </div>
        <SubscribeForm open={this.state.open} handleClose={() => this.setState({ open: false })} />
      </div>
    );
  }
}
