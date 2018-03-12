import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAlphanumeric, isEmail, isLength, normalizeEmail } from 'validator';
import { grey } from 'material-ui/colors';
import { POST, BackendUrl } from '../requests';
import ErrorInput from '../components/Reusable/ErrorInput';
import ToS from '../components/ToS';
import ResendVerificationEmail from './ResendVerificationEmail';
import { Handler, Option, Waiting, Success, DefaultWithErrors } from '../components/Reusable/StatusHandler';
import Spinner from '../components/Reusable/Spinner';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      status: 'default',
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
    this.renderHandler = this.renderHandler.bind(this);
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

      this.setState({ status: 'waiting', errors: [] });
      POST(`${BackendUrl}/register`, data)
        .then(response => {
          if (Array.isArray(response)) {
            this.setState({
              errors: response,
              status: 'default',
            });
          } else {
            this.setState({ status: 'success', errors: [], success: response.success });
          }
        }).catch(() => {
          this.setState({
            errors: ['There was an error, try again later! \n Error: INTERNAL'],
            status: 'default',
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

  renderHandler() {
    return (
      <Handler status={this.state.status}>
        <DefaultWithErrors title="Register" errorMessages={this.state.errors}>
          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              {
                Object.keys(this.state.fields).map(
                  key => {
                    const { value, validation, name } = this.state.fields[key];
                    let type = '';
                    if (key === 'password' || key === 'password2') type = 'password';
                    return (
                      <ErrorInput
                        fullWidth
                        key={name}
                        type={type}
                        label={name}
                        value={value}
                        validation={validation}
                        onChange={e => this.handleChange(key, e)}
                      />
                    );
                  },
                )
              }
            </div>
            <ToS />
            <p
              style={{
                color: grey[600],
                fontSize: '18px',
                marginTop: '25px',
                textAlign: 'center',
              }}
            >
              By clickling the button below you agree to the Terms of Service
            </p>
            <button onClick={this.submit} type="button" disabled={this.checkForError()} className="btn btn-block">submit</button>
          </form>
          <ResendVerificationEmail />
        </DefaultWithErrors>
        <Success msg={this.state.success} />
        <Waiting />
      </Handler>
    );
  }

  render() {
    return (
      <Handler status={this.props.userStatus}>
        <Option showOn="notLoggedIn">
          {this.renderHandler()}
        </Option>
        <Option showOn="loggedIn">
          <h2>Register</h2>
          You already have an account! <Link to="/profile">Click here to go to your profile</Link>
        </Option>
        <Option showOn="loggingIn" component={Spinner} />
      </Handler>
    );
  }
}

function mapStateToProps(state) {
  return { userStatus: state.user.status };
}

export default connect(mapStateToProps)(Register);
