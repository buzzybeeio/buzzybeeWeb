// @flow
import $ from 'jquery';
import React, { Component } from 'react';
import Job from './Job';
import Footer from './Footer';

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
    const url = 'http://buzzybeeapi.herokuapp.com';
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
    const jobsLis = [];
    for (const index in this.state.jobs) {
      jobsLis.push(<Job job={this.state.jobs[index]} key={index} />);
    }

    return (
      <div className="container joblist">
        {jobsLis}
      </div>
    );
  }
}

export default JobsList;
