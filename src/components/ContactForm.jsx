// @flow
/* eslint-env browser */
import React, { Component } from 'react';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submission = this.submission.bind(this);
  }

  handleChange(varName, event) {
    const { value } = event.target;
    this.setState({ [varName]: value });
  }

  submission() {
    alert('Thanks for your submission!');
  }

  render() {
    return (
      <div className="wrapper text-center contact">
        <form method="POST" action="/contact" className="contact">
          <div>
            <input
              name="name"
              placeholder="Hey, what's your name?"
              value={this.state.name}
              onChange={e => this.handleChange('name', e)}
              className="form-control contact"
            />
          </div>
          <div>
            <input
              name="email"
              placeholder="And your email?"
              value={this.state.email}
              onChange={e => this.handleChange('email', e)}
              className="form-control contact"
            />
          </div>
          <div>
            <textarea
              value={this.state.message}
              onChange={e => this.handleChange('message', e)}
              name="message"
              id=""
              placeholder="Cool, what's the awesome message that you have for us?"
              className="form-control contact"
            />
          </div>
          <button onClick={this.submission} type="submit" className="btn btn-warning">Submit</button>
        </form>
      </div>
    );
  }
}
