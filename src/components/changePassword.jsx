import React, { Component } from 'react';
import { isLength } from 'validator';
import { Handler, Waiting, Default, Success, Open, Closed } from './StatusHandler';
import { POST, BackendUrl } from '../requests';
import ErrorList from './ErrorList';
import ErrorInput from './ErrorInput';

export default class changePassword extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      status: 'default',
      errors: [],
      success: '',
      fields: {
        currentPassword: { value: '', validation: [], name: 'Current Password' },
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

    this.handleChange = this.handleChange.bind(this);
    this.checkForError = this.checkForError.bind(this);
    this.close = this.close.bind(this);
    this.renderOpen = this.renderOpen.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.submit = this.submit.bind(this);
  }

  checkForError() {
    let error = false;
    Object.keys(this.state.fields).forEach(key => {
      const field = this.state.fields[key];
      field.validation.forEach(({ func }) => { if (typeof func === 'function') if (!func(field.value)) error = true; });
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

  submit(e) {
    e.preventDefault();
    const data = JSON.parse(JSON.stringify(this.state.fields));
    Object.keys(data).forEach(key => {
      data[key] = data[key].value;
    });
    data.username = this.props.username;

    if (!this.checkForError()) {
      this.setState({ status: 'waiting', errors: [] });
      POST(`${BackendUrl}/changePassword`, data)
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

  close() {
    const { fields } = this.state;
    Object.keys(fields).forEach(key => {
      fields[key].value = '';
    });
    this.setState({ fields, open: false });
  }

  renderInputs() {
    return Object.keys(this.state.fields).map(
      key => {
        const { value, validation, name } = this.state.fields[key];
        return (
          <ErrorInput
            key={name}
            type="password"
            name={name}
            value={value}
            validation={validation}
            onChange={e => this.handleChange(key, e)}
            className="form-control"
          />
        );
      },
    );
  }

  renderOpen() {
    return (
      <div className="well">
        <h2>ChangePassword</h2>
        <Handler status={this.state.status}>
          <Default>
            <ErrorList messages={this.state.errors} />
            <form onSubmit={this.submit}>
              {this.renderInputs()}
              <input type="submit" className="btn" value="Change" disabled={this.checkForError()} />
            </form>
            <button onClick={() => this.close()} className="btn btn-danger">Cancel</button>
          </Default>
          <Success
            msg={this.state.success}
            returnAction={() => this.close()}
            returnMessage="Close"
          />
          <Waiting />
        </Handler>
      </div>
    );
  }

  render() {
    return (
      <Handler status={this.state.open}>
        <Open>{this.renderOpen()}</Open>
        <Closed>
          <button onClick={() => this.setState({ open: true })} className="btn btn-success">Change Password</button>
        </Closed>
      </Handler>
    );
  }
}
