import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { amber } from 'material-ui/colors';

export default ({ color: clr, size }) => {
  const color = clr || Math.floor(Math.random() * 2) ? '#222' : amber[500];
  return (
    <div className="flex">
      <CircularProgress style={{ color }} size={size || 175} />
    </div>
  );
};
