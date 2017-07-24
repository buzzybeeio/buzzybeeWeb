import React, { Component } from 'react'; 
import Nav from '../components/navbar';
import Logo from '../components/logo';
import Textbox from '../components/textbox';
import Mission from '../components/mission';
import Footer from '../components/Footer';
import $ from 'jquery';
import '../App.css'

class App extends Component {

    render() {
        return(
            <div>
                <div className='animation'>
                    <div className='cube'></div>
                </div>
                <div className="logo-container">
                <div>
                    <Nav />
                </div>
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
                    <Footer />
                </div>
            </div>
            
        )
    }

    componentDidMount(){
        $('.logo-container').css('display', 'none')
        setTimeout(function(){
            $('.animation').css('display', 'none')
            $('.logo-container').fadeIn(600)
        },2000)
    }
}

export default App; 