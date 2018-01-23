import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAlphanumeric, isEmail, isLength, normalizeEmail } from 'validator';
import { POST, BackendUrl } from '../requests';
import ErrorList from './ErrorList';
import ErrorInput from './ErrorInput';
import ToS from './ToS';
import ResendVerificationEmail from './ResendVerificationEmail';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerStatus: 'notRegistered',
      errors: [],
      success: '',
      fields: {
        username: {
          value: '',
          validation: [{
            func: isAlphanumeric,
            msg: 'Username has to be alphanumerical',
          }],
          name: 'Username',
        },
        firstName: {
          value: '',
          validation: [{
            func: value => !!value.length,
            msg: 'The first name field can\'t be empty',
          }],
          name: 'First name',
        },
        lastName: {
          value: '',
          validation: [],
          name: 'Last name (family name)',
        },
        email: {
          value: '',
          validation: [{
            func: isEmail,
            msg: 'Invalid email',
          }],
          name: 'Email',
        },
        email2: {
          value: '',
          validation: [{
            func: value => value === this.state.fields.email.value,
            msg: 'Both emails have to be the same',
          }],
          name: 'Confirm email',
        },
        password: {
          value: '',
          validation: [{
            func: value => isLength(value, { min: 10 }),
            msg: 'Your password has to be at least 10 characters long',
          }, {
            func: value => /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/.test(value),
            msg: 'Your password has to have at least: 1 lower case english letter, 1 upper case english letter and 1 number',
          }],
          name: 'Password',
        },
        password2: {
          value: '',
          validation: [{
            func: value => value === this.state.fields.password.value,
            msg: 'Both password fields have to have the same value',
          }],
          name: 'Confirm Password',
        },
      },
    };

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkForError = this.checkForError.bind(this);
  }

  submit() {
    const data = JSON.parse(JSON.stringify(this.state.fields));
    Object.keys(data).forEach(key => {
      data[key] = data[key].value;
    });

    if (!this.checkForError()) {
      const email = normalizeEmail(data.email, {
        gmail_lowercase: true,
        yahoo_lowercase: true,
        icloud_lowercase: true,
      });
      data.email = email;
      data.email2 = email;

      this.setState({ registerStatus: 'waiting', errors: [] });
      POST(`${BackendUrl}/register`, data)
        .then(response => {
          if (Array.isArray(response)) {
            this.setState({
              errors: response,
              registerStatus: 'notRegistered',
            });
          } else {
            this.setState({ registerStatus: 'success', errors: [], success: response.success });
          }
        }).catch(() => {
          this.setState({
            errors: ['There was an error, try again later! \n Error: INTERNAL'],
            registerStatus: 'notRegistered',
          });
        });
    }
  }

  checkForError() {
    let error = false;
    Object.keys(this.state.fields).forEach(key => {
      const field = this.state.fields[key];
      field.validation.forEach(({ func }) => { if (!func(field.value)) error = true; });
    });
    return error;
  }

  handleChange(key, e) {
    const { value } = e.target;
    this.setState(state => {
      const modified = {
        ...state.fields[key],
        value,
      };

      return {
        fields: {
          ...state.fields,
          [key]: modified,
        },
      };
    });
  }

  render() {
    if (this.props.userStatus === 'notLoggedIn') {
      if (this.state.registerStatus === 'notRegistered') {
        return (
          <div>
            <h2>Register</h2>
            <ErrorList messages={this.state.errors} />
            <form onSubmit={e => e.preventDefault()} className="well">
              <div className="form-group">
                {
                  Object.keys(this.state.fields).map(
                    key => {
                      const { value, validation, name } = this.state.fields[key];
                      let type = '';
                      if (key === 'password' || key === 'password2') type = 'password';
                      return (
                        <ErrorInput
                          key={name}
                          type={type}
                          name={name}
                          value={value}
                          validation={validation}
                          onChange={e => this.handleChange(key, e)}
                          className="form-control"
                        />
                      );
                    },
                  )
                }
              </div>
              <ToS />
              <button onClick={this.submit} disabled={this.checkForError()} className="btn btn-block">submit</button>
            </form>
            <ResendVerificationEmail />
          </div>
        );
      } else if (this.state.registerStatus === 'waiting') {
        return <img src="spinner.svg" alt="spinner" className="spinner" />;
      }

      return (
        <div>
          <h2>Register</h2>
          <div className="alert alert-success">{this.state.success}</div>
        </div>
      );
    } else if (this.props.userStatus === 'loggingIn') {
      return <img src="spinner.svg" alt="spinner" className="spinner" />;
    }

    return (
      <div>
        <h2>Register</h2>
        You already have an account! <Link to="/profile">Click here to go to your profile</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userStatus: state.user.status };
}

export default connect(mapStateToProps)(Register);
