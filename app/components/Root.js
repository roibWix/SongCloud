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
        <main className="container">
          <Switch>
            <Route exact path="/" component={() => {
              return <Redirect to="/Explore/trance"/>}}/>

            <Route exact path="/Explore" component={() => {
              return <Redirect to="/Explore/trance"/>}}/>


            <Route path="/Explore/:genre"  component={ Explore }/>



            <Route path="/Playlists" component={ Playlists }/>
            <Route path="/signin" component={ Signin }/>
            <Route path="/signup" component={ Signup }/>

          </Switch>
        </main>
        {/*<Player/>*/}
      </div>
    </BrowserRouter>
  );
};



