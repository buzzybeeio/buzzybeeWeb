/* eslint-env browser */

import { renderToStaticMarkup } from 'react-dom/server';
import React, { Component } from 'react';
import { GET } from '../requests';
import DefaultStory from '../components/DefaultStory';
import StoriesSideBar from '../components/StoriesSideBar';
import StoriesListBar from '../components/StoriesListBar';
import '../App.css';

export default class Story extends Component {
  constructor() {
    super();
    this.state = {
      story: renderToStaticMarkup(<DefaultStory />),
      nextStory: '',
      reading: false,
    };

    this.readingMode = this.readingMode.bind(this);
    this.setStory = this.setStory.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params) {
      const { name } = this.props.match.params;
      GET(`https://buzzybeeapi.herokuapp.com/story/${name}`)
        .then(data => {
          try {
            if (data.component) this.setState({ story: data.component });
            else this.props.history.push('/');
          } catch (e) {
            this.props.history.push('/');
          }
        }).catch(() => this.props.history.push('/'));
    }
  }

  componentWillUnmount() { if (window.storiesTimeout) clearTimeout(window.storiesTimeout); }

  setStory(name, story) {
    this.setState({ nextStory: story });
    const $wrapper = window.$('.story-wrapper');

    $wrapper.hide(750, () => {
      this.props.history.push(`/story/${name}`);
      this.setState({ story, nextStory: '' });
      $wrapper.slideDown(750);
    });
  }

  readingMode() {
    const { $ } = window;
    const reading = !this.state.reading;
    this.setState({ reading });

    $('.listBarDiv').toggle(1000);
    $('.listBar').toggle(1000);
    $('.story-flex-wrapper').slideToggle(1000, () => {
      $('.aside').toggle(0);
      $('.story-flex-wrapper').slideToggle(1000);
    });
  }

  render() {
    return (
      <div>
        <div className="container stories">
          <div className={`Reading-Mode ${this.state.reading ? 'active' : ''}`} onClick={this.readingMode}>
            <i className="fa fa-book"></i> Reading Mode <i className="fa fa-book"></i>
          </div>
          <StoriesListBar setStory={this.setStory} />
          <div className="story-flex-wrapper">
            <div dangerouslySetInnerHTML={{ __html: this.state.story }} className="story-wrapper"></div>
            <StoriesSideBar
              currentStory={this.state.story}
              nextStory={this.state.nextStory}
              setStory={this.setStory}
              stories={this.state.stories}
            />
          </div>
        </div>
      </div>
    );
  }
}
