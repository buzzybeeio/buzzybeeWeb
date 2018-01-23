/* eslint-env browser */
/* eslint func-names: 0 */
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { GET, BackendUrl } from '../requests';

export default class StoriesSideBar extends Component {
  constructor() {
    super();
    this.state = { stories: [] };
  }

  componentDidMount() {
    window.storiesTimeout = undefined;
    GET(`${BackendUrl}/stories`)
      .then(data => this.setState({ stories: data }))
      .catch(() => {
        window.storiesTimeout = setTimeout(this.getStories, 30000);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { $ } = window;
    const $children = $($('.sidebar-grid').children());
    const { currentIntroducction, nextIntroducction, setStory } = this.props;

    if (prevProps.currentIntroducction !== currentIntroducction || prevProps.nextIntroducction === nextIntroducction) {
      $children.each(function () {
        const data = JSON.parse($(this).attr('data'));
        if (data.introducction === currentIntroducction || data.introducction === nextIntroducction) $(this).hide(750);
        else $(this).slideDown(750);
      });
    }

    if (!prevState.stories.length) {
      // Don't change the functions to Arrow functions
      // Because when you use arrow functions "this" won't be binded

      // Hides the child if the default story is the same that the children has passed as data
      $children.each(function () {
        const data = JSON.parse($(this).attr('data'));
        if (data.introducction === currentIntroducction) $(this).hide(0);
      });

      $('.story-box').click(function () {
        const data = JSON.parse($(this).attr('data'));
        $(this).hide(750);
        setStory(data.name, { introducction: data.introducction, interview: data.interview });
      });

      document.getElementsByClassName('aside')[0].style.opacity = '1';
    }
  }

  render() {
    return (
      <div className="aside">
        <Paper elevation={4} style={{ padding: '10px', borderRadius: '10px' }}>
          <span className="thing">INTERVIEWEES</span>
          <div className="sidebar-grid">
            {
              this.state.stories.map(info => {
                const infostr = JSON.stringify(info);
                return (<div className="story-box" key={infostr} data={infostr}><img src={`profilepics/${info.name}.jpg`} alt={`${info.name}img`} /><span>{info.name}</span></div>);
              })
            }
          </div>
        </Paper>
      </div>
    );
  }
}
