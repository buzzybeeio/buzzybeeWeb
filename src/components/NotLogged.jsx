import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <h3>You are not Logged In :(</h3>
    <p>If you are coming back try <Link to="/profile/login">logging in!</Link></p>
    <p>Otherwise we invite you to <Link to="/profile/register">join the hive!!!</Link></p>
  </div>
);
