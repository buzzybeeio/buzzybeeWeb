import React, { Component } from 'react';
import Nav from '../components/navbar';
import '../App.css'
import $ from 'jquery'

class Jobs extends Component {

    getJobs() {
      const url = 'http://buzzybeeapi.herokuapp.com/'

      $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success: function(data){
          console.log('data:', data)
        },
        error:  function(errorMessaging){
          console.log('error:', errorMessaging)
        }
      })

    }

    render() {
        this.getJobs()

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
