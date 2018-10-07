import React, {Component} from 'react';
import { connect } from 'react-redux';
import NotLogged from '../components/NotLogged';

export default class AddJobs extends Component {

  constructor(){
    super();
    this.state = {
 
    }
  }

  render() {
    if (this.props.status === 'loggedIn') {
      return(
        <div>
          <div>
            <span className="thing">Job Application To Do List</span>
          </div>
          <button className="addjobs-button" >+</button>
        </div>
      )
    }
    return <NotLogged />
  }
}

function mapStateToProps(state) {
  return { status: state.user.status };
}

export default connect(mapStateToProps)(AddJobs);