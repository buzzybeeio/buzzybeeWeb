/* eslint-env browser */

import $ from 'jquery';
import { renderToStaticMarkup } from 'react-dom/server';
import React, { Component } from 'react';
import DefaultStory from '../components/DefaultStory';

class Story extends Component {
  constructor() {
    super();

    this.state = {
      story: renderToStaticMarkup(<DefaultStory />),
      stories: [],
    };

    this.getStories = this.getStories.bind(this);
    this.getStories();
  }

  componentDidMount() {
    let height;
    const $aside = $('.aside');

    function f() {
      if (window.innerWidth >= 768) {
        height = $('.story-wrapper').height();
        $aside.css('height', `${height - 40}px`);

        if ($('.aside > div').height() > height) {
          $aside.css('overflow-y', 'scroll');
        } else {
          $aside.css('overflow-y', 'hidden');
        }
      }
    }

    f();
    window.addEventListener('resize', f);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.stories.length) {
      const component = this;

      $($('.sidebar-grid').children()).each(() => {
        const data = JSON.parse($(this).attr('data'));
        if (data.component == component.state.story) $(this).hide(0);
      });

      $('.story-box').click(() => {
        const data = JSON.parse($(this).attr('data'));
        $(this).hide(750);

        $('.story-wrapper')
          .hide(750, () => component.setState({ story: data.component }))
          .slideDown(750, () => {
            const $aside = $('.aside');

            if (window.innerWidth >= 768) {
              const height = $('.story-wrapper').height();
              $aside.css('height', `${height - 40}px`);

              if ($('.sidebar-grid').height() > height) {
                $aside.css('overflow-y', 'scroll');
              } else {
                $aside.css('overflow-y', 'hidden');
              }
            }
          });

        $($('.sidebar-grid').children()).each(() => {
          if ($(this).css('display') != 'block') $(this).slideDown(750);
        });
      });

      document.getElementsByClassName('aside')[0].style.opacity = '1';
    }
  }

  getStories() {
    $.ajax({
      type: 'GET',
      url: 'https://buzzybeeapi.herokuapp.com/stories',
      dataType: 'json',
      success: data => this.setState({ stories: data }),
      error: err => console.error(err),
    });
  }

  render() {
    return (
      <div className="story-flex-wrapper container">
        <div dangerouslySetInnerHTML={{ __html: this.state.story }} className="story-wrapper"></div>
        <div className="aside">
          <h3>Stories</h3>
          <div className="sidebar-grid">
            {
              this.state.stories.map(info => {
                const infostr = JSON.stringify(info);
                return (<div className="story-box" key={infostr} data={infostr}><img src={`profilepics/${info.name}.jpg`} alt={info.name + ' img'} /><span>{info.name}</span></div>)
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Story;
