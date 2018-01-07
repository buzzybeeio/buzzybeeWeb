/* eslint-env browser */

import React from 'react';
import Logo from '../components/LandingPageLogo';
import Textbox from '../components/textbox';
import Mission from '../components/mission';
import SubscribeForm from '../components/SubscribeForm';
import TeamMember from '../components/Team';

export default () => (
  <div>
    <div className="logo-container">
      <div className="container">
        <div className="flexbox">
          <div className="left-side">
            <Logo />
          </div>
          <div className="right-side">
            <SubscribeForm />
          </div>
        </div>
        <div>
          <Textbox />
        </div>
      </div>

      <div className="container mission_container">
        <Mission />
      </div>
      <div>
        <TeamMember />
      </div>
    </div>
  </div>
);
