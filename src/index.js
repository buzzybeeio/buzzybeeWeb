import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './routes/App';
import Jobs from './routes/Jobs';
import Contact from './routes/Contact';
import Nav from './components/navbar';
import Footer from './components/Footer';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Nav />
            <Switch>
                <Route path="/jobs" component={Jobs} />
                <Route path="/contact" component={Contact} />
                <Route path="/" component={App} />
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
)

