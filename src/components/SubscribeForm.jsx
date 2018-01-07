/* eslint-env browser */
import React, { Component } from 'react';

export default class SubscribeForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.submission = this.submission.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  submission() {
    alert('Thanks for subscribing!');
  }

  render() {
    return (
      <div>
        <div id="subcribeSentence">
          Get our weekly story sent to your email! Subscribe!
        </div>
        <form method="POST" action="/subscribe">
          <input id="input_bar" type="email" name="email" placeholder="EMAIL" value={this.state.email} onChange={this.handleEmailChange} />
          <button id="input_button" onClick={this.submission} type="submit" className="btn btn-warning">
            SUBSCRIBE
          </button>
        </form>
      </div>
    );
  }
}
