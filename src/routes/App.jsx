import React, { Component } from 'react'; 
import Nav from '../components/navbar';
import Logo from '../components/logo';
import Textbox from '../components/textbox';
import Mission from '../components/mission';
import Footer from '../components/Footer';
import '../App.css'

class App extends Component {

    render() {
        return(
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
        )
    }
}

export default App; 