// @flow
import React from 'react';

const Footer = () =>
  (<div className="footer text-center animation-hide">
    <a href="mailto:thisisrailee@gmail.com">
      <img className="footer-picture" src="email.png" alt="" />
    </a>
    <a href="https://medium.com/@buzzybeeio268" target="_blank">
      <img className="footer-picture" src="medium.png" alt="" />
    </a>
    <a href="https://www.facebook.com/buzzybee.io/" target="_blank">
      <img className="footer-picture" src="facebook.png" alt="" />
    </a>
    <div className="copyright">Copyright &#9400; 2017 BuzzyBee. All Rights Reserved.</div>
  </div>);

export default Footer;
