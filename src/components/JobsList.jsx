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
      length: 0,
      page: 1,
      place: { city: 'San Francisco', state: 'CA' },
      keywords: '',
      prevKeywords: 'developer javascript react python django software engineer web startup full-stack front-end',
    };

    this.getDefaultJobs().then(data => {
      this.props.stopAnimation();
      this.setState({ ...data });
    });

    this.changedPlace = this.changedPlace.bind(this);
    this.call = this.call.bind(this);
    this.paginatedCall = this.paginatedCall.bind(this);
  }

  getDefaultJobs() {
    const url = 'https://buzzybee-api.herokuapp.com';
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
        case 'Los Angeles':
        this.setState({ place: { city: 'Los Angeles', state: 'CA' } });
        break;
        case 'San Jose':
        this.setState({ place: { city: 'San Jose', state: 'CA' } });
        break;
        case 'New York City':
        this.setState({ place: { city: 'New York City', state: 'NY' } });
        break;
        case 'Houston':
        this.setState({ place: { city: 'Houston', state: 'TX' } });
        break;
        case 'Philadelphia':
        this.setState({ place: { city: 'Philadelphia', state: 'PA' } });
        break;
        case 'Chicago':
        this.setState({ place: { city: 'Chicago', state: 'IL' } });
        break;
      default:
        this.setState({ place: { city: 'San Francisco', state: 'CA' } });
    }
  }

  call() {
    this.setState({ results: [], length: 0, page: 1 });
    this.props.startAnimation();

    const data = {
      place: this.state.place,
      keywords: this.state.keywords.split(' '),
    };

    window.$.ajax({
      type: 'POST',
      url: 'https://buzzybee-api.herokuapp.com',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: jobsData => {
        this.props.stopAnimation();
        this.setState({ ...jobsData, prevKeywords: data.keywords });
      },
      error: () => alert('Sorry!, There was an error'),
    });
  }

  paginatedCall(page) {
    this.props.startAnimation();
    this.setState({ jobs: [], length: 0, page });
    const data = {
      place: this.state.place,
      keywords: this.state.prevKeywords.split(' '),
      page,
    };

    window.$.ajax({
      type: 'POST',
      url: 'https://buzzybeeapi.herokuapp.com/paginated',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: jobs => {
        this.props.stopAnimation();
        this.setState({ ...jobs });
      },
      error: () => alert('Sorry!, There was an error'),
    });
  }

  render() {
    const jobsList = [];

    for (const index in this.state.jobs) {
      jobsList.push(<Job job={this.state.jobs[index]} key={index} />);
    }

    const amountOfPages = Math.ceil(this.state.length / 75);
    const pages = [];
    for (let i = 1; i <= amountOfPages; i++) pages.push(i);

    if (pages.length === 1) pages.pop();

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
              <option value="San Jose">San Jose</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Houston">Houston</option>
              <option value="Chicago">Chicago</option>
              <option value="Philadelphia">Philadelphia</option>
              <option value="New York City">New York City</option>
            </select>
          </div>
          <button onClick={this.call} className="btn btn-block btn-success">Find those Jobs!</button>
        </div>
        {jobsList}
        <div className="pages">
          {
            pages.map(page => (
              <button
                onClick={() => this.paginatedCall(page)}
                style={{ backgroundColor: page === this.state.page ? '#FFB605' : '#171e27' }}
              >
                {page}
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}

export default JobsList;
