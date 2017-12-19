import React from 'react';

export default props => (
  <div>
    {
      props.messages.map(msg => (
        <div className="alert alert-danger">
          <p>{msg}</p>
        </div>
      ))
    }
  </div>
);
