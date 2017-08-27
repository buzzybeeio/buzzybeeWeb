// @flow
import $ from 'jquery';
import React, { Component } from 'react';
import Logo from '../components/logo';
import Textbox from '../components/textbox';
import Mission from '../components/mission';
import '../App.css';

class App extends Component {
  componentDidMount() {
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
            <div>
              <Logo />
            </div>
            <div>
              <Textbox />
            </div>
          </div>
          <div className="container mission_container">
            <Mission />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
