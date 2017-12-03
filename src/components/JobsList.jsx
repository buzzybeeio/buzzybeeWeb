// @flow
/* eslint-env browser */
/* eslint no-restricted-syntax: 0, guard-for-in: 0 */

import React, { Component } from 'react';
import Job from './Job';

export default class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'searching',
      jobs: [],
      pages: 0,
      page: 1,
      place: { city: 'San Francisco', state: 'CA' },
      keywords: '',
      prevKeywords: 'developer javascript react python django software engineer web startup full-stack front-end',
    };

    this.getDefaultJobs().then(data => {
      this.props.stopAnimation();
      this.setState({ ...data, status: 'done' });
    })
      .catch(() => {
        this.props.stopAnimation();
        this.setState({ status: 'error' });
      });

    this.changedPlace = this.changedPlace.bind(this);
    this.call = this.call.bind(this);
    this.paginatedCall = this.paginatedCall.bind(this);
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
      case 'Undefined':
        this.setState({ place: { city: 'Undefined' } });
        break;
      default:
        this.setState({ place: { city: 'San Francisco', state: 'CA' } });
    }
  }

  call() {
    this.setState({
      jobs: [],
      page: 1,
      pages: 0,
      status: 'searching',
    });
    this.props.startAnimation();

    const data = {
      keywords: this.state.keywords.split(' '),
    };
    if (this.state.place.state) data.place = this.state.place;

    window.$.ajax({
      type: 'POST',
      url: data.place ? 'https://buzzybeeapi.herokuapp.com' : 'http://localhost:4000/NoLoc',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: jobsData => {
        this.props.stopAnimation();
        this.setState({ ...jobsData, prevKeywords: this.state.keywords, status: 'done' });
      },
      error: () => {
        this.props.stopAnimation();
        this.setState({ status: 'error' });
        alert('Sorry!, there was an error loading the jobs');
      },
    });
  }

  paginatedCall(page) {
    this.setState({
      jobs: [],
      pages: 0,
      page,
      status: 'searching',
    });
    this.props.startAnimation();
    const data = {
      keywords: this.state.prevKeywords.split(' '),
      page,
    };
    if (this.state.place.state) data.place = this.state.place;

    window.$.ajax({
      type: 'POST',
      url: data.place ? 'https://buzzybeeapi.herokuapp.com/paginated' : 'http://localhost:4000/NoLocPaginated',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: jobs => {
        this.props.stopAnimation();
        this.setState({ ...jobs, status: 'done' });
      },
      error: () => {
        this.props.stopAnimation();
        this.setState({ status: 'error' });
        alert('Sorry!, there was an error loading the jobs');
      },
    });
  }

  render() {
    const pages = [];
    for (let i = 1; i <= this.state.pages; i++) pages.push(i);

    if (pages.length === 1) pages.pop();

    return (
      <div style={{ display: this.state.status !== 'searching' ? 'block' : 'none' }} className="container">
        <div>
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
        {
          this.state.jobs.map((job, i) => {
            const key = `${i} job`;
            setTimeout(() => window.$(`.${i}-job`).removeClass('invisible').addClass('animated fadeInUp'), i * 35);
            return (<Job job={job} key={key} classes={`${i}-job`} />);
          })
        }
        <div className="pages">
          {
            pages.map(page => (
              <button
                key={page}
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
