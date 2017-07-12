import React , { Component } from 'react'

class Footer extends Component {

  render() {
    return (
      <div className="footer text-center">
        <a href="mailto:thisisrailee@gmail.com">
          <img src="email.png" alt=""/>
        </a>
        <div className="copyright" >&#9400; 2017 BuzzyBee </div>
      </div>
    )
  }

}

export default Footer