import React, {Component} from 'react'

class SubscribeForm extends Component {
  constructor(props) {
    super(); 

    this.state = {
      email: ''
    }; 

  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value})
  }

  submission() {
    alert('Thanks for subscribing!');
  }

  render() {
    return(
      <div>
        <div id="subcribeSentence">
          Get our weekly story sent to your email! Subscribe!
        </div>
        <form  method="POST" action="/subscribe">
          <input id="input_bar" type="email" name="email" placeholder="EMAIL" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
          <button id="input_button" onClick={this.submission.bind(this)} type="submit" className="btn btn-warning">
            SUBSCRIBE
          </button>
        </form>
      </div>
    )
  }

}

export default SubscribeForm;