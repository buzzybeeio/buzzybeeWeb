// @flow
/* eslint-env browser */
import React from 'react';

export default ({ path }) => (
  <div style={{ display: 'inline' }}>
    <i className="fa fa-angle-right" style={{ opacity: window.location.pathname === path ? '1' : '0' }}>
    </i>
  </div>
);
