import React, { Component } from 'react';
import Nav from '../components/navbar';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Logo from '../components/logo'
import '../App.css'

class Contact extends Component {
    render() {
        return(
            <div>
                <div>
                    <Nav />
                </div>
                <Logo />
                <ContactForm />
                <Footer />
            </div>
        )
    }
}

export default Contact;