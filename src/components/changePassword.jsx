import React, { Component } from 'react';
import { isLength } from 'validator';
import { POST } from '../requests';
import ErrorList from './ErrorList';
import ErrorInput from './ErrorInput';

export default class changePassword extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      status: 'nothing',
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

  submit() {
    const data = JSON.parse(JSON.stringify(this.state.fields));
    Object.keys(data).forEach(key => {
      data[key] = data[key].value;
    });
    data.username = this.props.username;

    if (!this.checkForError()) {
      this.setState({ status: 'waiting', errors: [] });
      POST('http://localhost:4000/changePassword', data)
        .then(response => {
          if (Array.isArray(response)) {
            this.setState({
              errors: response,
              status: 'nothing',
            });
          } else {
            this.setState({ status: 'success', errors: [], success: response.success });
          }
        }).catch(() => {
          this.setState({
            errors: ['There was an error, try again later! \n Error: INTERNAL'],
            status: 'nothing',
          });
        });
    }
  }

  close() {
    const fields = JSON.parse(JSON.stringify(this.state.fields));
    Object.keys(fields).forEach(key => {
      fields[key].value = '';
    });
    this.setState({ fields, open: false });
  }

  render() {
    if (this.state.open) {
      if (this.state.status === 'nothing') {
        return (
          <div className="well">
            <ErrorList messages={this.state.errors} />
            <form onSubmit={e => e.preventDefault()}>
              {
                Object.keys(this.state.fields).map(
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
                )
              }
              <button onClick={() => this.submit()} className="btn">Submit</button>
            </form>
            <button onClick={() => this.close()} className="btn btn-danger">Cancel</button>
          </div>
        );
      } else if (this.state.status === 'waiting') {
        return <img src="spinner.svg" alt="spinner" className="spinner" />;
      }

      return (
        <div>
          <h2>ChangePassword</h2>
          <div className="alert alert-success">{this.state.success}</div>
          <button onClick={() => this.close()} className="btn btn-danger">Close</button>
        </div>
      );
    }

    return <button onClick={() => this.setState({ open: true })} className="btn btn-success">Change Password</button>;
  }
}
