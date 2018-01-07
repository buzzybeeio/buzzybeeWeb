/* eslint-env browser */
import React, { Component } from 'react';
import { POST } from '../requests';
import { Handler, Waiting, Default, Error, Success, Open, Closed } from './StatusHandler';

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.defaultState = {
      string: '',
      open: false,
      status: 'default',
      msg: '',
    };
    this.state = { ...this.defaultState };

    this.submit = this.submit.bind(this);
    this.renderOpen = this.renderOpen.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.setState({ status: 'waiting' });
    POST('http://localhost:4000/forgotPassword', { string: this.state.string })
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
      <Handler status={this.state.status}>
        <Default>
          <form onSubmit={this.submit}>
            <h3>Get new password</h3>
            <input
              value={this.state.string}
              onChange={e => this.setState({ string: e.target.value })}
              className="form-control"
              placeholder="Username or email"
            />
            <input type="submit" className="btn" value="Get new password" />
            <button onClick={() => this.setState({ open: false })} className="btn btn-danger">Close</button>
          </form>
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
    );
  }

  render() {
    return (
      <Handler status={this.state.open}>
        <Open>{this.renderOpen()}</Open>
        <Closed>
          <button onClick={() => this.setState({ open: true })} className="btn">I forgot My password</button>
        </Closed>
      </Handler>
    );
  }
}
