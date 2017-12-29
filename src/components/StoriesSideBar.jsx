/* eslint-env browser */
/* eslint func-names: 0 */
import React, { Component } from 'react';
import { GET } from '../requests';

export default class StoriesSideBar extends Component {
  constructor() {
    super();
    this.state = { stories: [] };
    this.getStories = this.getStories.bind(this);
  }

  componentDidMount() { this.getStories(); }

  componentDidUpdate(prevProps, prevState) {
    const { $ } = window;
    const $children = $($('.sidebar-grid').children());
    const { currentStory, nextStory, setStory } = this.props;

    if (prevProps.currentStory !== currentStory || prevProps.nextStory === nextStory) {
      $children.each(function () {
        const data = JSON.parse($(this).attr('data'));
        if (data.component === currentStory || data.component === nextStory) $(this).hide(750);
        else $(this).slideDown(750);
      });
    }

    if (!prevState.stories.length) {
      // Don't change the functions to Arrow functions
      // Because when you use arrow functions "this" won't be binded

      // Hides the child if the default story is the same that the children has passed as data
      $children.each(function () {
        const data = JSON.parse($(this).attr('data'));
        if (data.component === currentStory) $(this).hide(0);
      });

      $('.story-box').click(function () {
        const data = JSON.parse($(this).attr('data'));
        $(this).hide(750);
        setStory(data.name, data.component);
      });

      document.getElementsByClassName('aside')[0].style.opacity = '1';
    }
  }

  getStories() {
    window.storiesTimeout = undefined;
    GET('https://buzzybeeapi.herokuapp.com/stories')
      .then(data => this.setState({ stories: data }))
      .catch(() => {
        window.storiesTimeout = setTimeout(this.getStories, 30000);
      });
  }

  render() {
    return (
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
    );
  }
}
