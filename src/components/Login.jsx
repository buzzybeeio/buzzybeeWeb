import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import ErrorList from './ErrorList';

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
        <div>
          <h2>Login</h2>
          <ErrorList messages={this.props.errors} />
          <form onSubmit={e => e.preventDefault()}>
            Username or Email: <br />
            <input value={this.state.string} onChange={e => this.handleChange('string', e)} /> <br />
            Password: <br />
            <div>
              <input
                value={this.state.password}
                onChange={e => this.handleChange('password', e)}
                type={this.state.show ? '' : 'password'}
              />
              <button onClick={this.changeShow}>{this.state.show ? 'Hide' : 'Show'}</button>
            </div>
            <button onClick={this.submit}>Submit</button>
          </form>
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
