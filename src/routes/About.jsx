/* eslint-env browser */
import React from 'react';
import Textbox from '../components/textbox';
import Mission from '../components/mission';
import Team from '../components/Team';

export default () => (
  <div className="about-container">
    <div className="container landing-row">
      <div className="comb-container"><img className="comb" src="trihexagon_logo.png" alt="Buzzy Bee Logo" /></div>
      <Textbox />
    </div>
    <Mission />
    <Team />
  </div>
);
