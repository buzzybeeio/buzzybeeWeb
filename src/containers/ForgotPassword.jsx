/* eslint-env browser */
import React, { Component } from 'react';
import Button from 'material-ui/Button/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { Handler, Waiting, Default, Success, HideOnWaiting } from '../components/Reusable/StatusHandler';
import { POST, BackendUrl } from '../requests';

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
    this.renderContent = this.renderContent.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.setState({ status: 'waiting' });
    POST(`${BackendUrl}/forgotPassword`, { string: this.state.string })
      .then(response => {
        if (Array.isArray(response)) {
          this.setState({ status: 'default', msg: response[0] });
        } else {
          this.setState({ status: 'success', msg: response.success });
        }
      }).catch(() => {
        this.setState({ status: 'default', msg: 'There was an error, try again later! \n Error: INTERNAL' });
      });
  }

  renderContent() {
    return (
      <Handler status={this.state.status}>
        <Default>
          {this.state.msg ? <div className="alert alert-danger">{this.state.msg}</div> : ''}
          <form onSubmit={this.submit}>
            <input
              value={this.state.string}
              onChange={e => this.setState({ string: e.target.value })}
              className="form-control"
              placeholder="Username or email"
            />
            <input type="submit" className="btn" value="Get new password" />
          </form>
        </Default>
        <Success msg={this.state.msg} />
        <Waiting />
      </Handler>
    );
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ open: true })} className="btn">I forgot My password</button>
        <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
          <DialogTitle disableTypography>
            <span style={{ fontSize: '19px' }}>Get new password</span>
          </DialogTitle>
          <DialogContent>
            {this.renderContent()}
          </DialogContent>
          <DialogActions>
            <HideOnWaiting status={this.state.status}>
              <Button onClick={() => this.setState({ open: false })} style={{ color: '#222', fontSize: '1.1em' }}>
                {this.state.status === 'success' ? 'Close' : 'Cancel'}
              </Button>
            </HideOnWaiting>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
