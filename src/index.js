import React from 'react'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './routes/App';
import Jobs from './routes/Jobs';
import Contact from './routes/Contact';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/Jobs" component={Jobs}/>
                <Route path="/Contact" component={Contact}/>
                <Route path="/" component={App}/>
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
)

