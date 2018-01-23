/* eslint-env browser */

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { GET, BackendUrl } from '../requests';
import DefaultStory from '../components/DefaultStory';
import StoriesSideBar from '../components/StoriesSideBar';
import StoriesListBar from '../components/StoriesListBar';
import StoryWrapper from '../components/StoryWrapper';
import '../App.css';

export default class Story extends Component {
  constructor() {
    super();
    this.state = {
      introducction: <DefaultStory.introducction />,
      interview: <DefaultStory.interview />,
      nextIntroducction: '',
      reading: false,
    };

    this.readingMode = this.readingMode.bind(this);
    this.setStory = this.setStory.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params) {
      const { name } = this.props.match.params;
      GET(`${BackendUrl}/story/${name}`)
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
    this.setState({ nextIntroducction: story.introducction });
    const $wrapper = window.$('.story-UpperWrapper');

    $wrapper.hide(750, () => {
      this.props.history.push(`/story/${name}`);
      this.setState({ ...story, nextIntroducction: '' });
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
      <div className="stories">
        <div className="blackBG"></div>
        <div className="greyBG"></div>
        <div className="container">
          <StoriesListBar setStory={this.setStory} />
          <div className="story-flex-wrapper">
            <div className="story-UpperWrapper">
              <Paper elevation={4} style={{ borderRadius: '30px', padding: '20px', position: 'relative' }}>
                <StoryWrapper component={this.state.introducction} />
              </Paper>
              <Paper
                elevation={4}
                style={{
                  borderRadius: '30px',
                  padding: '20px',
                  paddingTop: '40px',
                  marginTop: '50px',
                  position: 'relative',
                }}
              >
                <div className="interview"><span className="thing">The Interview</span></div>
                <StoryWrapper component={this.state.interview} />
              </Paper>
            </div>
            <StoriesSideBar
              currentIntroducction={this.state.introducction}
              nextIntroducction={this.state.nextIntroducction}
              setStory={this.setStory}
            />
          </div>
        </div>
      </div>
    );
  }
}
