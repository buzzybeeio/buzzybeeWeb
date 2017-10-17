// @flow
/* eslint-env browser */

import React, { Component } from 'react';
import JobsList from '../components/JobsList';

class Jobs extends Component {
  componentDidMount() {
    this.setAnimation();
  }

  componentWillUnmount() {
    this.clearAnimation();
  }

  setAnimation() {
    const { $ } = window;
    $('.jobs-loading-animation').css('display', 'block');

    function loadingAnimation() {
      $('#dot1, #dot2, #dot3').css('opacity', '0');
      setTimeout(() => {
        $('#dot1').css('opacity', '1');
      }, 400);
      setTimeout(() => {
        $('#dot2').css('opacity', '1');
      }, 800);
      setTimeout(() => {
        $('#dot3').css('opacity', '1');
      }, 1200);
    }

    window.loadingAnimation = setInterval(loadingAnimation, 1600);
  }

  clearAnimation() {
    window.$('.jobs-loading-animation').css('display', 'none');
    clearInterval(window.loadingAnimation);
  }

  render() {
    return (
      <div className="jobs-list">
        <div className="jobs-loading-animation">
          <img src="spinner.svg" alt="spinner" className="spinner" />
          <p>
            Loading
            <span id="dot1">.</span>
            <span id="dot2">.</span>
            <span id="dot3">.</span>
          </p>
        </div>
        <JobsList stopAnimation={this.clearAnimation} startAnimation={this.setAnimation} />
      </div>
    );
  }
}

export default Jobs;
