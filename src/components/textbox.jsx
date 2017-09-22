// @flow
import React from 'react';
import { Link } from 'react-router-dom';

const Textbox = () =>
  (<div className="textBox">

    <Link to="/story">
      <button type="button" id="jobs-button" className="btn btn-success">
        Weekly Success Story
      </button>
    </Link>
    <div>
      <Link to="/jobs">
        <button type="button" className="btn btn-warning story-button">
          Job List
        </button>
      </Link>
    </div>
    <div className="more">Be inspired to do what you love.</div>
  </div>);

export default Textbox;
