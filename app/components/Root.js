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


export default class Root extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentTrack: {},
      playlists: [{
        listid: 666,
        listTitle: 'First-list-ever',
        songs: []
      },
        {
          listid: 999,
          listTitle: 'second-list-ever',
          songs: []
        }]
    };

    this.updateCurrentTrack = this.updateCurrentTrack.bind(this)
  }

  updateCurrentTrack(data) {
    const state = this.state;
    const newObj = Object.assign({}, {data});
    this.setState({currentTrack: newObj});

  }

  render() {

    return (
      <div>
        <Topbar/>
        <main className="container">
          <switch>
            <Route exact path="/" component={() => {
              return <Redirect to="/explore"/>
            }}/>
            <Route exact path='/explore' component={() => {
              return <Redirect to="/explore/trance"/>
            }}/>


            <Route path="/explore/:genre" render={(props) => {
              return <Explore updateCurrentTrack={this.updateCurrentTrack} {...props} />
            }}/>

            <Route exact path="/playlists" render={() => {
              return <Playlists data={this.state.playlists}/>
            }}/>
          </switch>
        </main>
        <Player Track={this.state.currentTrack}/>

      </div>


    )
  }
}



