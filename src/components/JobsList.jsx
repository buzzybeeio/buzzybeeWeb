// @flow
/* eslint-env browser */
/* eslint no-restricted-syntax: 0, guard-for-in: 0 */

import React, { Component } from 'react';
import Job from './Job';

class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: null,
    };

    this.getJobs().then(jobs => {
      this.props.stopAnimation();
      this.setState({ jobs });
    });
  }

  getJobs() {
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

  render() {
    const jobsList = [];

    for (const index in this.state.jobs) {
      jobsList.push(<Job job={this.state.jobs[index]} key={index} />);
    }

    return (
      <div className="container joblist">
        {jobsList}
      </div>
    );
  }
}

export default JobsList;
