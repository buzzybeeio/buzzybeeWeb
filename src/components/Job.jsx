import React, { Component } from 'react';

class Job extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const job = this.props.job

    return (
      <div className="job row">
        <a href={job.url} target="_blank" rel="noopener noreferrer">
          <div className="col-md-2 col-sm-2">{(new Date(job.datepost)).toDateString().slice(4)}</div>
          <div className="col-md-5 col-sm-5">{job.title}</div>
          <div className="col-md-3 col-sm-3">{job.company}</div>
          <div className="col-md-2 col-sm-2">{job.location}</div>
        </a>
      </div>
    )
  }
}

export default Job;
