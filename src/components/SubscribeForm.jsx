/* eslint-env browser */
/* eslint no-nested-ternary: 0 */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { amber } from 'material-ui/colors';
import { POST } from '../requests';
import { Handler, Default, Waiting, Success } from './StatusHandler';

export default class SubscribeForm extends Component {
  constructor() {
    super();
    this.state = { email: '', status: 'default', message: '' };
    this.submit = this.submit.bind(this);
  }
  handleEmailChange = e => this.setState({ email: e.target.value })
  submit(e) {
    if (e) e.preventDefault();
    this.setState({ status: 'waiting' });
    POST('/subscribe')
      .then(response => {
        if (response.error) {
          this.setState({ status: 'default', message: response.error });
        } else {
          this.setState({ status: 'success', message: response.success });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ status: 'default', message: 'Local Error!' });
      });
  }
  render() {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Get our weekly story sent to your email! Subscribe!</DialogTitle>
        <DialogContent>
          <Handler status={this.state.status}>
            <Default>
              <form onSubmit={this.submit} style={{ color: amber[500], fontSize: '16px' }}>
                <TextField
                  error={this.state.message}
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  label="Email Address"
                  fullWidth
                  helperText={this.state.message}
                />
              </form>
            </Default>
            <Waiting />
            <Success msg={this.state.message} />
          </Handler>
        </DialogContent>
        <DialogActions>
          {
            this.state.status !== 'waiting' ? (
              <Button
                onClick={() => {
                  this.props.handleClose();
                  this.setState({ message: '', email: '', status: 'default' });
                }}
                style={{ color: '#222', fontSize: '1.1em' }}
              >
                {this.state.status === 'default' ? 'Cancel' : 'Close'}
              </Button>
            ) : ''
          }
          {
            this.state.status !== 'waiting' ? (
              this.state.status !== 'success' ? (
                <Button
                  onClick={this.submit}
                  style={{ color: '#222', fontSize: '1.1em' }}
                >
                  Submit
                </Button>
              ) : ''
            ) : ''
          }
        </DialogActions>
      </Dialog>
    );
  }
}
