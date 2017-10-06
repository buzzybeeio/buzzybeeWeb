// @flow
/* eslint-env browser */
import React from 'react';

const Selected = ({ path }) => (
  <div style={{ display: 'inline' }}>
    {
      window.location.pathname === path ? <i className='fa fa-angle-right'></i> : ''
    }
  </div>
);

export default Selected;
