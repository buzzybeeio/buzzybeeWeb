import React, { Component } from 'react';
import DefaultStory from '../components/DefaultStory';
import { renderToStaticMarkup } from 'react-dom/server'
import $ from 'jquery'

class Story extends Component {
    constructor() {
        super()
        this.state = {
            story: renderToStaticMarkup(<DefaultStory />),
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
                            this.state.stories.map(info => {
                                var infostr = JSON.stringify(info)
                                return (<div className="story-box" data={infostr}><img src={'mini/' + info.name + '.jpg'} alt={info.name + ' img'} /><span>{info.name}</span></div>)
                            })
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

    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.stories.length) {
            var component = this
            $($('.sidebar-grid').children()).each(function () {
                const data = JSON.parse($(this).attr('data'))
                if (data.component == component.state.story) $(this).hide(0)
            })
            $('.story-box').click(function () {
                const data = JSON.parse($(this).attr('data'))
                $(this).hide(750)
                $('.story-wrapper').hide(750, () => { component.setState({ story: data.component }) }).slideDown(750)

                $($('.sidebar-grid').children()).each(function () {
                    if ($(this).css('display') != 'block') $(this).slideDown(750)
                })

            })
            document.getElementsByClassName('aside')[0].style.opacity = '1'
        }
    }
}

export default Story; 