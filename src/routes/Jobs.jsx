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
                <div className="jobs-list">
                  <JobsList />
                </div>
            </div>
        )
    }
}

export default Jobs;
