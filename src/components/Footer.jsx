// @flow
import React from 'react';

export default () => (
  <div className="footer text-center">
    <div className="icons">
      <a href="mailto:info@buzzybee.io">
        <img className="footer-picture" src="assets/email.png" alt="" />
      </a>
      <a href="https://medium.com/@buzzybeeio" target="_blank" rel="noopener noreferrer">
        <img className="footer-picture" src="assets/medium.png" alt="" />
      </a>
      <a href="https://www.facebook.com/buzzybee.io/" target="_blank" rel="noopener noreferrer">
        <img className="footer-picture" src="assets/facebook.png" alt="" />
      </a>
    </div>
    <div className="copyright">Copyright &#9400; {(new Date()).getFullYear()} BuzzyBee. All Rights Reserved.</div>
  </div>
);
