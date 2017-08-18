import React, { Component } from 'react';
import DefaultStory from '../components/DefaultStory';
import $ from 'jquery'

class Story extends Component {
    constructor() {
        super()
        this.state = {
            story: DefaultStory,
            stories: []
        }
        this.getStories()
    }
    getStories() {
        $.ajax({
            type: "GET",
            url: 'http://buzzybeeapi.herokuapp.com/stories',
            dataType: "json",
            success: (data) => { this.setState({stories: data}) },
            error: (err) => { console.error(err) }
        })
    }
    render() {
        return (
            <div className='story-flex-wrapper container'>
                <div dangerouslySetInnerHTML={{ __html: this.state.story }} className='story-wrapper'></div>
                <div className='aside'>
                    <div className='sidebar-grid'>
                        {
                            this.state.stories.map((info)=>
                                 (<div className="story-box"><img src={'mini/' + info.name + '.jpg'} alt={info.name} onClick={() => {this.setState({story: info.component})}}/><span>{info.name}</span></div>)
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Story; 