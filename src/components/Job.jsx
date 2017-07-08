import React, { Component } from 'react';

class Job extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const job = this.props.job

    return (
      <div className="job row">
        <div className="col-md-2">{(new Date(job.datepost)).toDateString().slice(4)}</div>
        <div className="col-md-5">{job.title}</div>
        <div className="col-md-3"><a href={job.url}>{job.company}</a></div>
        <div className="col-md-2">{job.location}</div>
      </div>
    )
  }
}

export default Job;
