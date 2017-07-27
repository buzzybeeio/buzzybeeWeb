import React, { Component } from 'react';
import JobsList from '../components/JobsList';
import '../App.css';

class Jobs extends Component {
    render() {
        return (
            <div className="jobs-list">
                <JobsList />
            </div>
        )
    }
}

export default Jobs;
