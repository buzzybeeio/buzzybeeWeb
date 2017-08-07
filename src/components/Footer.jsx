import React , { Component } from 'react'

class Footer extends Component {

  render() {
    return (
      <div className="footer text-center animation-hide">
        <a  href="mailto:thisisrailee@gmail.com">
          <img className="footer-picture" src="email.png" alt=""/>
        </a>
        <a href="https://www.facebook.com/buzzybee.io/" target="_blank">
          <img className="footer-picture" src="facebook.png" alt=""/>
        </a>
        <div className="copyright" >Copyright &#9400; 2017 BuzzyBee. All Rights Reserved.</div>
      </div>
    )
  }
}

export default Footer