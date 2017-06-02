import React, { Component } from 'react'; 

class Textbox extends Component {
    render() {
        return(
            <div>
                <div className="Motto">Don't waste time. Search Smarter.</div>
                <div className="Quote">"Your positive action combined with positive thinking results in success."</div>
                <div className="Author">Shiva Khera</div>
                <button className="Button">Job List</button>
                <div className="More">Learn more about how we got started.</div>
            </div>
        )
    }
}

export default Textbox;