// @flow
/* eslint-env browser */
/* eslint no-restricted-syntax: 0, guard-for-in: 0 */

import React, { Component } from 'react';
import Job from './Job';

class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      place: { city: 'San Francisco', state: 'CA' },
      keywords: '',
    };

    this.getDefaultJobs().then(jobs => {
      this.props.stopAnimation();
      this.setState({ jobs });
    });

    this.changedPlace = this.changedPlace.bind(this);
    this.call = this.call.bind(this);
  }

  getDefaultJobs() {
    const url = 'https://buzzybeeapi.herokuapp.com';
    return new Promise((resolve, reject) => {
      window.$.ajax({
        type: 'GET',
        url,
        dataType: 'json',
        success: resolve,
        error: reject,
      });
    });
  }

  changedPlace(event) {
    const { value } = event.target;
    switch (value) {
      case 'San Francisco':
        this.setState({ place: { city: 'San Francisco', state: 'CA' } });
        break;
      default:
        this.setState({ place: { city: 'San Francisco', state: 'CA' } });
    }
  }

  call() {
    this.setState({ jobs: [] });
    this.props.startAnimation();

    const data = {
      place: this.state.place,
      keywords: this.state.keywords.split(' '),
    };

    window.$.ajax({
      type: 'POST',
      url: 'https://buzzybeeapi.herokuapp.com',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: jobs => {
        this.props.stopAnimation();
        this.setState({ jobs });
      },
      error: () => alert('Sorry!, There was an error'),
    });
  }

  render() {
    const jobsList = [];

    for (const index in this.state.jobs) {
      jobsList.push(<Job job={this.state.jobs[index]} key={index} />);
    }

    return (
      <div className="container joblist">
        <div style={{ display: jobsList.length ? 'block' : 'none' }}>
          <div>
            <input
              placeholder="Type the keywords (each keyword has to be 1 space apart from each other)"
              value={this.state.keywords}
              className="form-control"
              onChange={e => this.setState({ keywords: e.target.value })}
            />
            <select value={this.state.place.city} onChange={e => this.changedPlace(e)} className="form-control">
              <option value="San Francisco">San Francisco</option>
            </select>
          </div>
          <button onClick={this.call} className="btn btn-block btn-success">Find those Jobs!</button>
        </div>
        {jobsList}
      </div>
    );
  }
}

export default JobsList;
