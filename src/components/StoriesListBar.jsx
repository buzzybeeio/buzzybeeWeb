/* eslint-env browser */
/* eslint func-names: 0 */
import React, { Component } from 'react';
import { GET, BackendUrl } from '../requests';
import TextField from './Reusable/DefaultTextField';

export default class StoriesListBar extends Component {
  constructor() {
    super();
    this.state = {
      listBarStories: [],
      listBar: '',
    };

    this.listbarComponentChoosed = this.listbarComponentChoosed.bind(this);
    this.findStory = this.findStory.bind(this);
  }

  listbarComponentChoosed(name) {
    GET(`${BackendUrl}/story/${name}`)
      .then(({ introducction, interview }) => {
        this.setState({ listBar: '', listBarStories: [] });
        this.props.setStory(name, { introducction, interview });
      }).catch(() => alert('failed to load history'));
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
        url: `${BackendUrl}/findStory/${str.replace(' ', '%20')}`,
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
      <div className="listBar">
        <p className="find-a-story">Find a Story</p>
        <TextField
          fullWidth
          onChange={this.findStory}
          value={this.state.listBar}
        />
        <div className="LBDiv">
          <div className="LBStories" style={this.state.listBarStories.length ? { padding: '4px', backgroundColor: 'white' } : {}}>
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
      </div>
    );
  }
}
