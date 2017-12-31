import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import ErrorList from './ErrorList';
import ForgotPassword from './ForgotPassword';


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

  submit() {
    login({
      string: this.state.string,
      password: this.state.password,
    });
  }

  changeShow() { this.setState({ show: !this.state.show }); }

  render() {
    if (this.props.status === 'notLoggedIn') {
      return (
        <div className="well">
          <h2>Login</h2>
          <ErrorList messages={this.props.errors} />
          <form onSubmit={e => e.preventDefault()}>
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
                onClick={this.changeShow}
                style={{ margin: '0', marginLeft: '20px', height: '2.5em' }}
                className="btn"
              >
                {this.state.show ? 'Hide' : 'Show'}
              </button>
            </div>
            <button onClick={this.submit} className="btn btn-block">Submit</button>
          </form>
          <ForgotPassword />
        </div>
      );
    } else if (this.props.status === 'loggingIn') {
      return <img src="spinner.svg" alt="spinner" className="spinner" />;
    }

    return (
      <div>
        <h2>Login</h2>
        You are logged in! <Link to="/profile">Click here to go to your profile</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { status: state.user.status, errors: state.user.errorsLogin };
}

export default connect(mapStateToProps)(Login);
