// @flow
/* eslint-env browser */
/* eslint no-nested-ternary: 0 */

import React, { Component } from 'react';

const Loading = () => (
  <div>Loading...</div>
);

class Stories extends Component {
  constructor() {
    super();
    this.state = {};

    this.getStory = this.getStory.bind(this);
    this.getStory();
  }

  getStory() {
    const name = window.location.pathname.substr(9);

    window.$.ajax({
      type: 'GET',
      url: `https://buzzybeeapi.herokuapp.com/story/${name}`,
      dataType: 'json',
      success: value => {
        this.setState({ value });
      },
      error: () => {
        this.setState({ error: true });
      },
    });
  }

  render() {
    return (
      <div style={{ marginTop: '80px' }}>
        {
          this.state.value ? (
            <div dangerouslySetInnerHTML={{ __html: this.state.value.component }}></div>
          ) : this.state.error ? (
            <div>error</div>
          ) : (<Loading />)
        }
      </div>
    );
  }
}

export default Stories;
