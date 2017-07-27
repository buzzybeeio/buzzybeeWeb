import React, { Component } from 'react';
import Logo from '../components/logo';
import Textbox from '../components/textbox';
import Mission from '../components/mission';
import $ from 'jquery';
import '../App.css'

class App extends Component {

    render() {
        return (
            <div>
                <div className='animation'>
                    <div className='cube'></div>
                </div>
                <div className="animation-hide logo-container">
                    <div className="container">
                        <div>
                            <Logo />
                        </div>
                        <div>
                            <Textbox />
                        </div>
                    </div>
                    <div className="container mission_container">
                        <Mission />
                    </div>
                </div>
            </div>

        )
    }

    componentDidMount() {
        var $animation = $('.animation')
        var timeout = setTimeout(function () {
            $animation.css('display', 'none')
            $('.animation-hide').fadeIn(750)
        }, 2000)
        if (sessionStorage.getItem('buzzybee-already-logged')) {
            clearTimeout(timeout)
            $animation.css('display', 'none')
        }
        else {
            $('.animation-hide').css('display', 'none')
        }
        sessionStorage.setItem('buzzybee-already-logged', true)
    }
}

export default App; 