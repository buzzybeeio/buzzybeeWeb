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
            success: data => { this.setState({ stories: data }) },
            error: err => { console.error(err) }
        })
    }

    render() {
        return (
            <div className='story-flex-wrapper container'>
                <div dangerouslySetInnerHTML={{ __html: this.state.story }} className='story-wrapper'></div>
                <div className='aside'>
                    <div className='sidebar-grid'>
                        {
                            this.state.stories.map(info => (<div className="story-box"><img src={'mini/' + info.name + '.jpg'} alt={info.name + ' img'} onClick={() => { this.setState({ story: info.component }) }} /><span>{info.name}</span></div>))
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        var height;
        var $aside = $('.aside');

        function f() {
            if (window.innerWidth >= 768) {
                height = $('.story-wrapper').height()
                $aside.css('height', height - 20 + 'px')

                if ($('.aside > div').height() > height) {
                    $aside.css('overflow-y', 'scroll')
                }
                else {
                    $aside.css('overflow-y', 'hidden')
                }
            }
            else {
                $aside.css('height', 'auto')
                $aside.css('overflow-y', 'hidden')
            }
        }

        f();
        window.addEventListener('resize', f)
        $aside.css('opacity', '1')
    }

}

export default Story; 