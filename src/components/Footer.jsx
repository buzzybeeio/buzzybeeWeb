// @flow
import React from 'react';

export default () => (
  <div className="footer text-center">
    <div className="footer-icon-container">
      <div className="icon-container">
        <a href="mailto:info@buzzybee.io">
          <img className="footer-picture" src="email.png" alt="" />
        </a>
      </div>
      <div className="icon-container">
        <a href="https://medium.com/@buzzybeeio" target="_blank" rel="noopener noreferrer">
          <img className="footer-picture" src="medium.png" alt="" />
        </a>
      </div>
      <div className="icon-container">
        <a href="https://www.facebook.com/buzzybee.io/" target="_blank" rel="noopener noreferrer">
          <img className="footer-picture" src="facebook.png" alt="" />
        </a>
      </div>
    </div>
    <div className="copyright">Copyright &#9400; {(new Date()).getFullYear()} BuzzyBee. All Rights Reserved.</div>
  </div>
);
