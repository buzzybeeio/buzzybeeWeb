import React, { Component } from 'react'; 
import Nav from './components/navbar';
import Logo from './components/logo';
import Textbox from './components/textbox';
import Mission from './components/mission';
import './App.css'

class App extends Component {

    render() {
        return(
            <div>
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
                    <div>
                        <Mission />
                    </div>
                </div>
            </div>
        )
    }
}

export default App; 