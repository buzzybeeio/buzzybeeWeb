import React, { Component } from 'react';
import Nav from '../components/navbar';
import '../App.css'
import $ from 'jquery'

class Jobs extends Component {
    getJobs() {
      const url = 'http://buzzybeeapi.herokuapp.co/'

      return new Promise((resolve, reject) => {
        $.ajax({
          type:"GET",
          url:url,
          dataType:"json",
          success: resolve,
          error: reject
        })

      })


    }

    render() {
        this.getJobs()
        .then(console.log)
        .catch((error) => console.log('the error:', error))

        return(
            <div>
                <div>
                    <Nav />
                </div>
            </div>
        )
    }
}

export default Jobs;
