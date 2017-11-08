/* eslint-env browser */
/* eslint func-names: 0 */

import { renderToStaticMarkup } from 'react-dom/server';
import React, { Component } from 'react';
import DefaultStory from '../components/DefaultStory';

class Story extends Component {
  constructor() {
    super();

    this.state = {
      story: renderToStaticMarkup(<DefaultStory />),
      stories: [],
      listBarStories: [],
      listBar: '',
    };

    this.findStory = this.findStory.bind(this);
    this.getStories = this.getStories.bind(this);
    this.listbarComponentChoosed = this.listbarComponentChoosed.bind(this);
    this.getStories();
  }

  componentDidMount() {
    const path = window.location.pathname.slice(7);

    if (path.length) {
      window.$.ajax({
        type: 'GET',
        url: `https://buzzybeeapi.herokuapp.com/story/${path}`,
        dataType: 'json',
        success: data => { this.setState({ story: data.component }); },
        error: err => {
          console.log(err);
          window.history.pushState(null, null, '');
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.stories.length) {
      const component = this;
      const { $ } = window;

      // Don't change the functions to Arrow functions
      // Because when you use arrow functions "this" won't be binded

      $($('.sidebar-grid').children()).each(function () {
        const data = JSON.parse($(this).attr('data'));
        if (data.component === component.state.story) $(this).hide(0);
      });

      $('.story-box').click(function () {
        const data = JSON.parse($(this).attr('data'));
        window.history.pushState(null, null, `/story/${data.name}`);

        $(this).hide(750);

        $('.story-wrapper')
          .hide(750, () => component.setState({ story: data.component }))
          .slideDown(750);

        $($('.sidebar-grid').children()).each(function () {
          if ($(this).css('display') !== 'block') $(this).slideDown(750);
        });
      });

      document.getElementsByClassName('aside')[0].style.opacity = '1';
    }
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

  listbarComponentChoosed(name) {
    window.history.pushState(null, null, `/story/${name}`);

    this.setState({ listBar: '' });
    window.$.ajax({
      type: 'GET',
      url: `https://buzzybeeapi.herokuapp.com/story/${name}`,
      dataType: 'json',
      success: data => {
        const { $ } = window;
        this.setState({ listBar: '', listBarStories: [] });

        $($('.sidebar-grid').children()).each(function () {
          const story = JSON.parse($(this).attr('data'));
          if (story.component === data.component) $(this).hide(750);
          else if ($(this).css('display') !== 'block') $(this).slideDown(750);
        });

        $('.story-wrapper')
          .hide(750, () => this.setState({ story: data.component }))
          .slideDown(750);
      },
    });
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
                <div
                  onClick={() => this.listbarComponentChoosed(data.name)}
                  key={data.name}
                  className="listBarStory"
                >
                  <img src={`profilepics/${data.name}.jpg`} alt={data.name} className="mini-image" />
                  <span>{data.name}</span>
                </div>
              ))
            }

          </div>
        </div>
        <div className="story-flex-wrapper">
          <div dangerouslySetInnerHTML={{ __html: this.state.story }} className="story-wrapper"></div>
          <div className="aside">
            <h3>Stories</h3>
            <div className="sidebar-grid">
              {
                this.state.stories.map(info => {
                  const infostr = JSON.stringify(info);
                  return (<div className="story-box" key={infostr} data={infostr}><img src={`profilepics/${info.name}.jpg`} alt={`${info.name}img`} /><span>{info.name}</span></div>);
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
