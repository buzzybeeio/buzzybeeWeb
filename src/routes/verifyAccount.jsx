import React, { Component } from 'react';
import { POST, BackendUrl } from '../requests';
import { Handler, Error, Success, Waiting, Default } from '../components/Reusable/StatusHandler';

export default class VerifyAccount extends Component {
  constructor() {
    super();
    this.state = {
      status: 'default',
      msg: '',
    };
  }
  componentDidMount() {
    if (this.props.match.params.verifyId) {
      this.setState({ status: 'waiting' });
      POST(`${BackendUrl}/verifyAccount`, { string: this.props.match.params.verifyId })
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
  }
  render() {
    return (
      <div className="container">
        <Handler status={this.state.status}>
          <Default>
            <h2 className="text-center">What?</h2>
            <p>There's nothing we can do for you right now</p>
          </Default>
          <Error msg={this.state.msg} />
          <Success msg={this.state.msg} />
          <Waiting />
        </Handler>
      </div>
    );
  }
}
