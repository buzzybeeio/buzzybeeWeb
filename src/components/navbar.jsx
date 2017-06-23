import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img alt="Brand" src="BuzzyBee_logo.png"/>
                        </a>
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse navbar-right">
                        <ul className="nav navbar-nav">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/Jobs'>Jobs</Link></li>
                            <li><Link to='/Contact'>Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;