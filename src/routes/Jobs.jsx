// @flow
/* eslint-env browser */
import $ from 'jquery';
import React, { Component } from 'react';
import JobsList from '../components/JobsList';
import '../App.css';

class Jobs extends Component {
  componentDidMount() {
    const $bar = $('#bar');
    function playAnimation() {
      $bar.addClass('animated fadeInRight');
      setTimeout(() => {
        $bar.removeClass('fadeInRight');
        $bar.addClass('fadeOutLeft');
        setTimeout(() => {
          $bar.removeClass('fadeOutLeft');
        }, 700);
      }, 700);
    }
    window.barAnimation = setInterval(playAnimation, 1400);
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

  componentWillUnmount() {
    $('.jobs-loading-animation').css('display', 'none');
    clearInterval(window.barAnimation);
    clearInterval(window.loadingAnimation);
  }
  render() {
    return (
      <div className="jobs-list">
        <div className="jobs-loading-animation">
          <div id="bar" />
          <p>
            Loading
            <span id="dot1">.</span>
            <span id="dot2">.</span>
            <span id="dot3">.</span>
          </p>
        </div>
        <JobsList
          stopAnimation={() => {
            $('.jobs-loading-animation').css('display', 'none');
            clearInterval(window.barAnimation);
            clearInterval(window.loadingAnimation);
          }}
        />
      </div>
    );
  }
}

export default Jobs;
