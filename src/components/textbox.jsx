import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Textbox extends Component {
    render() {
        return(
            <div className="textBox">
                <div className="quote">"Your positive action combined with positive thinking results in success."</div>
                <div className="author">Shiva Khera</div>
                <Link to='/Jobs'>
                  <button type="button" className="btn btn-warning">
                      Job List
                  </button>
                </Link>
                <div className="more">Learn more about how we got started.</div>
            </div>
        )
    }
}

export default Textbox;
