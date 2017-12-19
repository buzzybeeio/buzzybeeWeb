import React, { Component } from 'react';
import { POST } from '../requests';

export default class VerifyAccount extends Component {
  constructor() {
    super();
    this.state = {
      status: 'notSending',
      msg: '',
    };
  }
  componentDidMount() {
    if (this.props.match.params.verifyId) {
      this.setState({ status: 'sending' });
      POST({
        url: 'http://localhost:4000/verifyAccount',
        data: { string: this.props.match.params.verifyId },
      }).then(response => {
        if (Array.isArray(response)) {
          this.setState({ status: 'failed', msg: response[0] });
        } else {
          this.setState({ status: 'verified', msg: response.success });
        }
      }).catch(() => {
        this.setState({ status: 'failed', msg: 'There was an error, try again later! \n Error: INTERNAL' });
      });
    }
  }
  render() {
    if (this.state.status === 'verified') {
      return (
        <div style={{ marginTop: '80px' }} className="container">
          <div className="alert alert-success">{this.state.msg}</div>
        </div>
      );
    } else if (this.state.status === 'sending') {
      return (
        <div style={{ marginTop: '80px' }} className="container">
          <h3 className="text-center">We are verifying your account</h3>
          <img src="spinner.svg" alt="spinner" className="spinner" />
        </div>
      );
    } else if (this.state.status === 'failed') {
      return (
        <div style={{ marginTop: '80px' }} className="container">
          <div className="alert alert-danger">{this.state.msg}</div>
        </div>
      );
    }
    return (
      <div style={{ marginTop: '80px' }} className="container">
        <h2 className="text-center">What?</h2>
        <p>There's nothing we can do for you right now</p>
      </div >
    );
  }
}
