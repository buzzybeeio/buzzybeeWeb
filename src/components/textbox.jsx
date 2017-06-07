import React, { Component } from 'react'; 

class Textbox extends Component {
    render() {
        return(
            <div className="textBox">
                <div className="quote">"Your positive action combined with positive thinking results in success."</div>
                <div className="author">Shiva Khera</div>
                <button type="button" className="btn btn-warning">Job List</button>
                <div className="more">Learn more about how we got started.</div>
            </div>
        )
    }
}

export default Textbox;