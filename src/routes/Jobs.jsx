import React, { Component } from 'react';
import Nav from '../components/navbar';
import JobsList from '../components/JobsList'
import '../App.css'

class Jobs extends Component {
    render() {
        return(
            <div>
                <div>
                    <Nav />
                </div>
                <JobsList />
            </div>
        )
    }
}

export default Jobs;
