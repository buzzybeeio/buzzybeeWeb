/* eslint-env browser */
import React, { Component } from 'react';
import { POST } from '../requests';

export default class RVE extends Component {
  constructor() {
    super();
    this.state = {
      string: '',
      status: 'closed',
      msg: '',
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    this.setState({ status: 'waiting ' });
    POST({
      url: 'http://localhost:4000/resendVerificationEmail',
      data: { string: this.state.string },
    }).then(response => {
      if (Array.isArray(response)) {
        this.setState({ status: 'error', msg: response[0] });
      } else {
        this.setState({ status: 'success', msg: response.success });
      }
    }).catch(() => {
      this.setState({ status: 'error', msg: 'There was an error, try again later! \n Error: INTERNAL' });
    });
  }

  render() {
    if (this.state.status === 'waiting') {
      return (
        <div>
          <h3>Resend verification Email</h3>
          <img src="spinner.svg" alt="spinner" className="spinner" />
        </div>
      );
    } else if (this.state.status === 'success') {
      return (
        <div>
          <h3>Resend verification Email</h3>
          <div className="alert alert-success">{this.state.msg}</div>
        </div>
      );
    } else if (this.state.status === 'error') {
      return (
        <div>
          <h3>Resend verification Email</h3>
          <div className="alert alert-danger">{this.state.msg}</div>
        </div>
      );
    } else if (this.state.status === 'opened') {
      return (
        <div>
          <h3>Resend verification Email</h3>
          <input
            value={this.state.string}
            onChange={e => this.setState({ string: e.target.value })}
            className="form-control"
            placeholder="Username or email"
          />
          <button onClick={() => this.submit()} className="btn">Send Email</button>
          <button onClick={() => this.setState({ status: 'closed' })} className="btn btn-danger">Close</button>
        </div>
      );
    }

    return <button onClick={() => this.setState({ status: 'opened' })} className="btn">Resend Verification Email</button>;
  }
}
