import React, { Component } from 'react'; 

class ContactForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "", 
      message: ""
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  submission() {
    console.log(this.state.name, this.state.email, this.state.message)
    alert('Thanks for your submission!')
  }

  render() {
    return(
      <div className="form text-center">
        <div>
          <input
            placeholder="Hey, what's your name?"
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
          />
        </div>
        <div>
          <input
            placeholder="And your email?"
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
          />
        </div>
        <div>
          <textarea value={this.state.message} 
          onChange={this.handleMessageChange.bind(this)}
          name="" id="" cols="30" rows="10" placeholder="Cool, what's the awesome message that you have for us?"></textarea>
        </div>
        <button onClick = {this.submission.bind(this)} type="button" className="btn btn-warning">
          Submit
        </button>
      </div>
    )
  }
}

export default ContactForm