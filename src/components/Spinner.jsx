import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { amber } from 'material-ui/colors';

export default ({ color }) => {
  const clr = color || Math.floor(Math.random() * 2) ? '#222' : amber[500];
  return (
    <div className="flex-center">
      <CircularProgress style={{ clr }} size={175} />
    </div>
  )
};
