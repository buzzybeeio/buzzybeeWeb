// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Selected from './Selected';

const Nav = () => (
  <nav className="navbar navbar-default navbar-fixed-top animation-hide">
    <div className="container">
      <div className="navbar-header">
        <Link to="/" className="">
          <img className="buzzybee_writing" alt="Brand" src="buzzybee-logo.jpg" />
        </Link>
        <Link to="/" className="navbar-brand">
          <img className="buzzybee_writing" alt="Brand" src="BuzzyBee_logo.png" />
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target=".navbar-collapse"
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>

      <div className="collapse navbar-collapse navbar-right">
        <ul className="nav navbar-nav">
          <li>
            <Link data-toggle="collapse" data-target=".navbar-collapse" to="/">
              <Selected path="/" /> Home
            </Link>
          </li>
          <li>
            <Link data-toggle="collapse" data-target=".navbar-collapse" to="/jobs">
              <Selected path="/jobs" /> Jobs
            </Link>
          </li>
          <li>
            <Link data-toggle="collapse" data-target=".navbar-collapse" to="/story">
              <Selected path="/story" /> Stories
            </Link>
          </li>
          <li>
            <Link data-toggle="collapse" data-target=".navbar-collapse" to="/contact">
              <Selected path="/contact" /> Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Nav;
