import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Explore from './Explore'
import Player from './Player'
import Playlists from './Playlists'
import Signin from './Signin'
import Signup from './Signup'
import Topbar from './Topbar'

import React from 'react';

export default function Root() {
  return (
    <BrowserRouter>
      <div>
        <Topbar />
        <main>
          <Switch>
            <Route exact path="/" component={() => {
              return <Redirect to="/Explore"/>}}/>
            <Route exact path="/Explore" component={ Explore }/>
            <Route path="/Playlists" component={ Playlists }/>
            <Route path="/signin" component={ Signin }/>
            <Route path="/signup" component={ Signup }/>

          </Switch>
        </main>
        <Player/>
      </div>
    </BrowserRouter>
  );
};



