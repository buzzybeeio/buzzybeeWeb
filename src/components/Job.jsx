import React, { Component } from 'react';

class Job extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const job = this.props.job

    console.log('job', job)

    return (
      <li>
        <p>title: {job.title}</p>
        <p>company: <a href={job.url}>{job.company}</a></p>
        <p>location: {job.location}</p>
        <p>date posted: {job.datepost}</p>
      </li>
    )
  }
}

export default Job;
