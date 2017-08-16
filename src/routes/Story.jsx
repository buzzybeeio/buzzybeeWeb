import React, { Component } from 'react';
import DefaultStory from '../components/stories/DefaultStory';

class Story extends Component {
    constructor() {
        super()
        this.state = {
            story: DefaultStory
        }
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.state.story }}></div>
        )
    }

}

export default Story; 