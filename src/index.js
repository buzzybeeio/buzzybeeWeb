// @flow
/* eslint-env browser */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import App from './App';

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
