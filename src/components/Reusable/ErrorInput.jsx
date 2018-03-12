import React from 'react';
import { grey, red } from 'material-ui/colors';
import ErrorList from './ErrorList';
import CreateTextField from './CreateTextField';

const TextField = CreateTextField({
  styles: {
    inkbarError: {
      '&:after': {
        backgroundColor: red[500],
      },
    },
    inkbarNoError: {
      '&:after': {
        backgroundColor: grey[700],
      },
    },
    labelFocusedError: {
      color: red[500],
    },
    labelFocusedNoError: {
      color: grey[700],
    },
    input: {
      fontSize: '19px !important',
      fontWeight: 300,
    },
  },
});

export default props => {
  const errors = props.validation.map(
    ({ func, msg }) => {
      if (!func(props.value)) return msg;
      return null;
    },
  ).filter(d => d);

  return (
    <div style={{ marginBottom: '15px' }}>
      <TextField
        fullWidth={props.fullWidth}
        error={errors.length}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        label={props.label}
        InputProps={classes => ({
          classes: {
            inkbar: errors.length ? classes.inkbarError : classes.inkbarNoError,
            input: classes.input,
          },
        })}
        InputLabelProps={classes => ({
          FormControlClasses: {
            focused: errors.length ? classes.labelFocusedError : classes.labelFocusedNoError,
          },
        })}
      />
      <ErrorList messages={errors} />
    </div>
  );
};
