/* eslint-env browser */
import React, { Component } from 'react';
import { POST } from '../requests';
import { Handler, Waiting, Default, Success, Open, Closed, Error } from './StatusHandler';

export default class RVE extends Component {
  constructor() {
    super();
    this.defaultState = {
      string: '',
      status: 'default',
      open: false,
      msg: '',
    };
    this.state = { ...this.defaultState };

    this.submit = this.submit.bind(this);
    this.renderOpen = this.renderOpen.bind(this);
  }

  submit() {
    this.setState({ status: 'waiting' });
    POST('http://localhost:4000/resendVerificationEmail', { string: this.state.string })
      .then(response => {
        if (Array.isArray(response)) {
          this.setState({ status: 'error', msg: response[0] });
        } else {
          this.setState({ status: 'success', msg: response.success });
        }
      }).catch(() => {
        this.setState({ status: 'error', msg: 'There was an error, try again later! \n Error: INTERNAL' });
      });
  }

  renderOpen() {
    return (
      <div>
        <h3>Resend verification Email</h3>
        <Handler status={this.state.status}>
          <Default>
            <h3>Resend verification Email</h3>
            <input
              value={this.state.string}
              onChange={e => this.setState({ string: e.target.value })}
              className="form-control"
              placeholder="Username or email"
            />
            <button onClick={() => this.submit()} className="btn">Send Email</button>
            <button onClick={() => this.setState({ open: false })} className="btn btn-danger">Close</button>
          </Default>
          <Error
            msg={this.state.msg}
            returnAction={() => this.setState({ ...this.defaultState, open: true })}
            returnMessage="Retry"
          />
          <Success
            msg={this.state.msg}
            returnAction={() => this.setState({ ...this.defaultState })}
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
          <button onClick={() => this.setState({ open: true })} className="btn">Resend Verification Email</button>
        </Closed>
      </Handler>
    );
  }
}
