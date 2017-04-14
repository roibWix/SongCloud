import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Explore from '../explore/Explore'
import Player from '../player/Player'
import Playlists from '../playlists/Playlists'
import Topbar from '../topbar/Topbar'
import React from 'react';


export default class Root extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Topbar/>
        <main>
          <switch>
            <Route exact path="/" component={() => {
              return <Redirect to="/explore"/>
            }}/>
            <Route exact path='/explore' component={() => {
              return <Redirect to="/explore/trance"/>
            }}/>
            <Route path="/explore/:genre" component={Explore}/>
            <Route exact path="/playlists" component={Playlists}/>
          </switch>
        </main>
        <Player/>
      </div>
    )
  }
}


