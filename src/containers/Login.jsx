import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import ErrorList from '../components/Reusable/ErrorList';
import ForgotPassword from './ForgotPassword';
import { Handler, Option } from '../components/Reusable/StatusHandler';
import Spinner from '../components/Reusable/Spinner';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      string: '',
      password: '',
      show: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.changeShow = this.changeShow.bind(this);
  }

  handleChange(key, e) { const { value } = e.target; this.setState({ [key]: value }); }

  submit(e) {
    e.preventDefault();
    login({
      string: this.state.string,
      password: this.state.password,
    }, this.props.history.push);
  }

  changeShow() { this.setState({ show: !this.state.show }); }

  render() {
    return (
      <Handler status={this.props.status}>
        <Option showOn="notLoggedIn">
          <h2>Login</h2>
          <ErrorList messages={this.props.errors} />
          <form onSubmit={this.submit}>
            Username or Email: <br />
            <input
              value={this.state.string}
              onChange={e => this.handleChange('string', e)}
              className="form-control"
            /> <br />
            Password: <br />
            <div style={{ display: 'flex' }}>
              <input
                value={this.state.password}
                onChange={e => this.handleChange('password', e)}
                type={this.state.show ? '' : 'password'}
                className="form-control"
              />
              <button
                onClick={e => { e.preventDefault(); this.changeShow(); }}
                style={{ margin: '0', marginLeft: '20px', height: '2.5em' }}
                className="btn"
                type="button"
              >
                {this.state.show ? 'Hide' : 'Show'}
              </button>
            </div>
            <input type="submit" className="btn btn-block" value="Submit" />
          </form>
          <ForgotPassword />
        </Option>
        <Option showOn="loggingIn" component={Spinner} />
        <Option showOn="loggedIn">
          <h2>Login</h2>
          You are logged in! <Link to="/profile">Click here to go to your profile</Link>
        </Option>
      </Handler>
    );
  }
}

function mapStateToProps(state) {
  return { status: state.user.status, errors: state.user.errorsLogin };
}

export default connect(mapStateToProps)(Login);
