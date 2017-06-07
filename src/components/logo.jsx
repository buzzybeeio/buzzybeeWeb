import React, { Component } from 'react'; 

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <img className="bee" src="buzzybee-logo.jpg" alt="Buzzy Bee Logo" />
                <div className="motto">Don't waste time. Search Smarter.</div>
            </div>
        )
    }
}

export default Logo; 