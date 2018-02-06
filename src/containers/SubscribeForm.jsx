/* eslint-env browser */
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import { amber } from 'material-ui/colors';
import { POST } from '../requests';
import { Handler, Default, Waiting, Success, HideOnWaiting, Hide } from '../components/Reusable/StatusHandler';

const styles = () => ({
  title: {
    fontSize: '19px',
  },
  bar: {
    '&:after': {
      backgroundColor: amber[500],
      height: '3px',
    },
  },
  input: {
    fontSize: '17px',
    fontWeight: 300,
  },
  label: {
    fontSize: '16px',
    fontWeight: 300,
  },
  labelFocused: {
    color: amber[500],
  },
  helperText: {
    fontSize: '15px',
    fontWeight: 500,
  },
  fullWidth: {
    width: '100%',
  },
});

class SubscribeForm extends Component {
  constructor() {
    super();
    this.state = { email: '', status: 'default', message: '' };
    this.submit = this.submit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  handleEmailChange = e => this.setState({ email: e.target.value })

  submit(e) {
    if (e) e.preventDefault();
    this.setState({ status: 'waiting' });
    POST('/subscribe', { email: this.state.email })
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
    const { classes } = this.props;
    return (
      <Handler status={this.state.status}>
        <Default>
          <form onSubmit={this.submit}>
            <FormControl className={classes.fullWidth}>
              <TextField
                fullWidth
                label="Email Address"
                InputProps={{
                  classes: { inkbar: classes.bar, input: classes.input },
                  value: this.state.email,
                  onChange: this.handleEmailChange,
                  type: 'email',
                }}
                InputLabelProps={{
                  className: classes.label,
                  FormControlClasses: { focused: classes.labelFocused },
                }}
                helperText={this.state.message}
                helperTextClassName={classes.helperText}
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
          classes={{ root: this.props.classes.title }}
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

export default withStyles(styles)(SubscribeForm);
