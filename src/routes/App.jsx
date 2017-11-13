/* eslint-env browser */

import React, { Component } from 'react';
import Logo from '../components/LandingPageLogo';
import Textbox from '../components/textbox';
import Mission from '../components/mission';
import SubscribeForm from '../components/SubscribeForm';
import TeamMember from '../components/Team';
import '../App.css';

export default class App extends Component {
  componentDidMount() {
    const { $ } = window;

    const $animation = $('.animation');

    const timeout = setTimeout(() => {
      $animation.css('display', 'none');
      $('.animation-hide').fadeIn(750);
    }, 2000);

    if (sessionStorage.getItem('buzzybee-already-logged')) {
      clearTimeout(timeout);
      $animation.css('display', 'none');
    } else {
      $('.animation-hide').css('display', 'none');
    }

    sessionStorage.setItem('buzzybee-already-logged', true);
  }

  render() {
    return (
      <div>
        <div className="animation">
          <div className="cube" />
        </div>

        <div className="animation-hide logo-container">
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
  }
}
