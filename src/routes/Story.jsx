/* eslint-env browser */
/* eslint func-names: 0 */

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import DefaultStory from '../components/DefaultStory';

class Story extends Component {
  constructor() {
    super();

    this.state = {
      stories: [],
      listBarStories: [],
      listBar: '',
    };

    this.findStory = this.findStory.bind(this);
    this.getStories = this.getStories.bind(this);
    this.getStories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.stories.length) document.getElementsByClassName('aside')[0].style.opacity = '1';
  }

  getStories() {
    window.$.ajax({
      type: 'GET',
      url: 'https://buzzybeeapi.herokuapp.com/stories',
      dataType: 'json',
      success: data => this.setState({ stories: data }),
      error: err => console.error(err),
    });
  }

  findStory(e) {
    const str = e.target.value;
    if (window.request) {
      window.request.abort();
      window.request = null;
    }

    this.setState({ listBar: str, listBarStories: [] });
    if (str) {
      window.request = window.$.ajax({
        type: 'GET',
        url: `https://buzzybeeapi.herokuapp.com/findStory/${str.replace(' ', '%20')}`,
        dataType: 'json',
        success: data => {
          window.request = null;
          this.setState({ listBarStories: data });
        },
      });
    }
  }

  render() {
    return (
      <div className="container" style={{ marginTop: '80px' }}>
        <input
          className="form-control listBar"
          onChange={this.findStory}
          value={this.state.listBar}
          placeholder="find a story"
        />
        <div className="listBarDiv">
          <div className="listBarStories">
            {
              this.state.listBarStories.map(data => (
                <Link to={`/stories/${data.name}`} className="listBarStory">
                  <img src={`profilepics/${data.name}.jpg`} alt={data.name} className="mini-image" />
                  <span>{data.name}</span>
                </Link>
              ))
            }

          </div>
        </div>
        <div className="story-flex-wrapper">
          <div className="story-wrapper">
            <DefaultStory />
          </div>
          <div className="aside">
            <h3>Stories</h3>
            <div className="sidebar-grid">
              {
                this.state.stories.map(info => {
                  const { name } = info;

                  return (
                    <Link to={`/stories/${name}`} className="story-box">
                      <img src={`profilepics/${name}.jpg`} alt={`${name}img`} />
                      <span>{name}</span>
                    </Link>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Story;
