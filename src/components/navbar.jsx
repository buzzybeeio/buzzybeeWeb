import React, { Component } from 'react';


class Nav extends Component {

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img alt="Brand" src=""/>
                        </a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Jobs</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Nav;
