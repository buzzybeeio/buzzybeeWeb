// @flow
/* eslint react/no-unescaped-entities: 0 */
import React from 'react';

const Mission = () => (
  <div className="mission">
    <h3>Built by Software Engineers for Software Engineers</h3>
    <p>
      We know that looking for jobs is hard, so we created a platform that congregates a lot of
      software engineering jobs together. This platform isn't perfect, but we are continously
      striving to make it so.
    </p>
    <p>
      We came up with this idea through searching for jobs ourselves and we found that searching for
      jobs is already difficult enough without having to worry about what site to look at to search
      for jobs, so we came up with BuzzyBee, a place where we want to eventually have all software
      engineering jobs (Literally all, like millions! Okay, maybe not that much). With that said,
      our jobs are still currently very limited, so if you know of any great job search APIs (that
      are free) please let us know.
    </p>
    <p>
      We also decided to interview a software engineer every week, we want to deliver awesome
      success stories to keep you motivated throughout your job search.
    </p>
    <p>
      Lastly, we want BuzzyBee to be an open source project, so if you see a bug, or want a new
      feature feel free to submit a PR to our{' '}
      <a href="https://github.com/buzzybeeio" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>.
    </p>
  </div>
);

export default Mission;
