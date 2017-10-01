// @flow
import $ from 'jquery';
import React, { Component } from 'react';
import Job from './Job';

class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: null,
    };

    this.getJobs().then((jobs) => {
      this.props.stopAnimation();
      this.setState({ jobs });
    });
  }

  getJobs() {
    const url = 'https://buzzybeeapi.herokuapp.com';
    return new Promise((resolve, reject) => {
      $.ajax({
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

    if (Array.isArray(this.state.jobs)) {
      for (let index = 0; index < this.state.jobs.length; index++) {
        jobsList.push(<Job job={this.state.jobs[index]} key={index} />);
      }
    }

    return (
      <div className="container joblist">
        {jobsList}
      </div>
    );
  }
}

export default JobsList;
