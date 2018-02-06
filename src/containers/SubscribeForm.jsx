/* eslint-env browser */
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { isEmail, normalizeEmail } from 'validator';
import { FormControl } from 'material-ui/Form';
import { POST } from '../requests';
import { Handler, Default, Waiting, Success, HideOnWaiting, Hide } from '../components/Reusable/StatusHandler';
import CreateTextField from '../components/Reusable/CreateTextField';

class SubscribeForm extends Component {
  constructor() {
    super();
    this.state = { email: '', status: 'default', message: '' };
    this.submit = this.submit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderActions = this.renderActions.bind(this);

    this.textField = CreateTextField();
  }

  handleEmailChange = e => this.setState({ email: e.target.value })

  submit(e) {
    if (e) e.preventDefault();

    if (isEmail(this.state.email)) {
      const email = normalizeEmail(this.state.email, {
        gmail_lowercase: true,
        yahoo_lowercase: true,
        icloud_lowercase: true,
      });

      this.setState({ status: 'waiting' });
      POST('/subscribe', { email })
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
    } else {
      this.setState({ message: 'The email address is not valid' });
    }
  }

  renderActions() {
    const style = { color: '#222', fontSize: '1.1em' };
    return (
      <HideOnWaiting status={this.state.status}>
        <Button
          onClick={() => {
            this.props.handleClose();
            this.setState({ message: '', email: '', status: 'default' });
          }}
          style={style}
        >
          {this.state.status === 'default' ? 'Cancel' : 'Close'}
        </Button>
        <Hide HideOn="success" status={this.state.status}>
          <Button onClick={this.submit} style={style}>
            Submit
          </Button>
        </Hide>
      </HideOnWaiting>
    );
  }

  renderContent() {
    const TextField = this.textField;
    return (
      <Handler status={this.state.status}>
        <Default>
          <form onSubmit={this.submit}>
            <FormControl className="other-fullWidth">
              <TextField
                fullWidth
                label="Email Address"
                value={this.state.email}
                onChange={this.handleEmailChange}
                helperText={this.state.message}
              />
            </FormControl>
          </form>
        </Default>
        <Waiting />
        <Success msg={this.state.message} />
      </Handler>
    );
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          disableTypography
          classes={{ root: 'other-fontSize19' }}
        >
          Get our weekly story sent to your email! Subscribe!
        </DialogTitle>
        <DialogContent>
          {this.renderContent()}
        </DialogContent>
        <DialogActions>
          {this.renderActions()}
        </DialogActions>
      </Dialog>
    );
  }
}

export default SubscribeForm;
