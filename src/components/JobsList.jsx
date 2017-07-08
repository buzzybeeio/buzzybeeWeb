import React, { Component } from 'react';
import $ from 'jquery'

class JobsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      jobs: null
    }

    this.getJobs()
      .then(jobs => {
        this.setState({ jobs })
      })
  }

  getJobs() {
    const url = 'http://buzzybeeapi.herokuapp.com'

    return new Promise((resolve, reject) => {
      $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success: resolve,
        error: reject
      })
    })
  }

    render() {
        const jobsLis = []

        for (let index in this.state.jobs) {
          const job = this.state.jobs[index]

          jobsLis.push(
            <li key={index}>
              <p>title: {job.title}</p>
              <p>company: {job.company}</p>
            </li>
          )
        }

        return (
          <ul>
            {jobsLis}
          </ul>
        )
    }
}

export default JobsList;
