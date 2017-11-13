// @flow
/* eslint-env browser */
import React from 'react';

export default ({ path }) => (
  <div style={{ display: 'inline' }}>
    {
      window.location.pathname === path ? <i className="fa fa-angle-right"></i> : ''
    }
  </div>
);
