/* eslint-env browser */
/* eslint func-names: 0 */

import { renderToStaticMarkup } from 'react-dom/server';
import React, { Component } from 'react';
import { GET } from '../requests';
import DefaultStory from '../components/DefaultStory';
import '../App.css';

export default class Story extends Component {
  constructor() {
    super();

    this.state = {
      story: renderToStaticMarkup(<DefaultStory />),
      stories: [],
      listBarStories: [],
      listBar: '',
      reading: false,
    };

    this.readingMode = this.readingMode.bind(this);
    this.findStory = this.findStory.bind(this);
    this.getStories = this.getStories.bind(this);
    this.listbarComponentChoosed = this.listbarComponentChoosed.bind(this);
  }

  componentDidMount() {
    this.getStories();
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

  // ComponentDidUpdate is only used for making the sidebar
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.stories.length) {
      const component = this;
      const { $ } = window;
      const $children = $('.sidebar-grid').children();
      // Don't change the functions to Arrow functions
      // Because when you use arrow functions "this" won't be binded

      // Hides the child if the default story is the same that the children has passed as data
      $($children).each(function () {
        const data = JSON.parse($(this).attr('data'));
        if (data.component === component.state.story) $(this).hide(0);
      });

      // Code for the transition between stories
      $('.story-box').click(function () {
        const data = JSON.parse($(this).attr('data'));
        component.props.history.push(`/story/${data.name}`);
        $(this).hide(750);

        $('.story-wrapper')
          .hide(750, () => component.setState({ story: data.component }))
          .slideDown(750);

        $($children).each(function () {
          if ($(this).css('display') !== 'block') $(this).slideDown(750);
        });
      });
      // End of Code

      document.getElementsByClassName('aside')[0].style.opacity = '1';
    }
  }

  componentWillUnmount() { if (window.storiesTimeout) clearTimeout(window.storiesTimeout); }

  getStories() {
    window.storiesTimeout = undefined;
    GET('https://buzzybeeapi.herokuapp.com/stories')
      .then(data => this.setState({ stories: data }))
      .catch(() => {
        window.storiesTimeout = setTimeout(this.getStories, 30000);
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
    this.props.history.push(`/story/${name}`);

    this.setState({ listBar: '' });
    GET(`https://buzzybeeapi.herokuapp.com/story/${name}`)
      .then(data => {
        const { $ } = window;
        this.setState({ listBar: '', listBarStories: [] });

        // Code for transition between stories
        $($('.sidebar-grid').children()).each(function () {
          const box = JSON.parse($(this).attr('data'));
          if (box.component === data.component) $(this).hide(750);
          else if ($(this).css('display') !== 'block') $(this).slideDown(750);
        });

        $('.story-wrapper')
          .hide(750, () => this.setState({ story: data.component }))
          .slideDown(750);
        // End of Code
      }).catch(() => {
        alert('failed to load history');
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <div>
        <div className="container stories">
          <div className={`Reading-Mode ${this.state.reading ? 'active' : ''}`} onClick={this.readingMode}>
            <i className="fa fa-book"></i> Reading Mode <i className="fa fa-book"></i>
          </div>
          <input
            className="form-control listBar"
            onChange={this.findStory}
            value={this.state.listBar}
            placeholder="find a story"
          />
          <div className="LBDiv">
            <div className="LBStories">
              {
                this.state.listBarStories.map(data => (
                  <div
                    onClick={() => this.listbarComponentChoosed(data.name)}
                    key={data.name}
                    className="LBStory"
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
      </div>
    );
  }
}
