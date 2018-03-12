import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { amber } from 'material-ui/colors';

export default (opts = {}) => {
  const styles = () => ({
    inkbar: {
      '&:after': {
        backgroundColor: opts.inkbarColor || amber[500],
      },
    },
    labelFocused: {
      color: opts.labelColorFocus || amber[500],
    },
    ...opts.styles,
  });

  const Component = props => {
    const { classes } = props;
    const properties = Object.assign({}, props);
    delete properties.InputProps;
    delete properties.InputLabelProps;
    delete properties.otherInputProps;
    delete properties.otherInputLabelProps;
    delete properties.classes;
    const {
      InputProps,
      InputLabelProps,
      otherInputProps,
      otherInputLabelProps,
    } = props;

    return (
      <TextField
        {...properties}
        InputProps={InputProps ? InputProps(classes) : {
          classes: { inkbar: classes.inkbar, input: classes.input || 'other-input-TextField' },
          ...otherInputProps,
        }}
        InputLabelProps={InputLabelProps ? InputLabelProps(classes) : {
          FormControlClasses: { focused: classes.labelFocused },
          ...otherInputLabelProps,
        }}
        labelClassName={classes.label || 'other-label-TextField'}
        helperTextClassName={classes.helperText || 'other-helperText-TextField'}
      />
    );
  };

  return withStyles(styles)(Component);
};
