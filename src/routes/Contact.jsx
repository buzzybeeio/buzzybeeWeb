import React, { Component } from 'react';
import ContactForm from '../components/ContactForm';
import Logo from '../components/logo';
import '../App.css';

class Contact extends Component {
    render() {
        return (
            <div>
                <Logo />
                <ContactForm />
            </div>
        )
    }
}

export default Contact;