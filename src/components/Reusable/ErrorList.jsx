import React from 'react';

export default props => (
  props.messages.map((msg, i) => (
    <div className="alert alert-danger" key={((new Date()).getTime() + i).toString()}>{msg}</div>
  ))
);
