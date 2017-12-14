/* eslint-env browser */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import about from './routes/About';
import jobs from './routes/Jobs';
import story from './routes/Story';
import profile from './routes/Profile';
import error404 from './routes/404';
import verifyAccount from './routes/verifyAccount';
import Nav from './components/navbar';
import Footer from './components/Footer';
import './css/Animations.css';
import './css/Contact.css';
import './css/Footer.css';
import './css/Jobs.css';
import './css/Nav.css';
import './css/Story.css';
import './css/Subscribe.css';
import './css/Team.css';

export default () => (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={story} />
      <Route exact path="/jobs" component={jobs} />
      <Route exact path="/about" component={about} />
      <Route path="/story/:name" component={story} />
      <Route path="/verifyAccount/:verifyId" component={verifyAccount} />
      <Route path="/profile" component={profile} />
      <Route path="*" component={error404} />
    </Switch>
    <Footer />
  </div>
);
