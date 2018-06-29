import React, {Component} from 'react';

export default class AddJobs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div>
          <span className="thing">Job Application To Do List</span>
        </div>
        <button className="addjobs-button" >+</button>
      </div>
    )
  }
}