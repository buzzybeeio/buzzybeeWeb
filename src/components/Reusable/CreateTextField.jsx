import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { amber } from 'material-ui/colors';

export default (opts = {}) => {
  const styles = () => ({
    inkbar: {
      '&:after': {
        backgroundColor: opts.inkbarColor || amber[500],
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
      color: opts.labelColorFocus || amber[500],
    },
    helperText: {
      fontSize: '15px',
      fontWeight: 500,
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
          classes: { inkbar: classes.inkbar, input: classes.input },
          ...otherInputProps
        }}
        InputLabelProps={InputLabelProps ? InputLabelProps(classes) : {
          FormControlClasses: { focused: classes.labelFocused },
          ...otherInputLabelProps
        }}
        labelClassName={classes.label}
        helperTextClassName={classes.helperText}
      />
    );
  };

  return withStyles(styles)(Component);
};
