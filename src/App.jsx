/* eslint-env browser */

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { loginWT } from './actions/auth';
import about from './routes/About';
import jobs from './routes/Jobs';
import story from './routes/Story';
import profile from './routes/Profile';
import verifyAccount from './routes/verifyAccount';
import error404 from './components/404';
import Nav from './components/navbar';
import Footer from './components/Footer';
import './css/Animations.css';
import './css/Footer.css';
import './css/Jobs.css';
import './css/Nav.css';
import './css/Story.css';
import './css/Team.css';
import './css/Profile.css';
import './css/About.css';
import './css/Other.css';
import './css/404.css';
import './css/AddJobs.css';

export default class App extends Component {
  componentDidMount() {
    loginWT();
    this.animation();
  }

  animation() {
    const { $ } = window;
    const $hide = $('.animation-hide');
    $hide.css('display', 'none');
    setTimeout(() => {
      $('.animation').css('display', 'none');
      $hide.fadeIn(750);
    }, 2000);
  }

  render() {
    return (
      <div>
        <div className="animation">
          <div className="cube" />
        </div>
        <div className="animation-hide">
          <Nav />
          <div className="switchWrapper">
            <Switch>
              <Route exact path="/" component={story} />
              <Route exact path="/jobs" component={jobs} />
              <Route exact path="/about" component={about} />
              <Route path="/story/:name" component={story} />
              <Route path="/verifyAccount/:verifyId" component={verifyAccount} />
              <Route path="/profile" component={profile} />
              <Route path="*" component={error404} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

