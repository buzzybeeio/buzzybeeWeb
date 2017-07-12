import React, { Component } from 'react';
import Job from './Job.jsx'
import $ from 'jquery'
import Footer from './Footer.jsx'

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
          jobsLis.push(
            <Job job={this.state.jobs[index]} key={index}/>
          )
        }

        return (
          <div>
            <div className="container joblist">
              {jobsLis}
            </div>
            <Footer />
          </div>
        )
    }
}

export default JobsList;
