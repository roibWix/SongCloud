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
  constructor() {
    super();
  }

  componentDidMount() {
    console.info('fuck');
  }




  render() {
    return (
      <div>
        <Topbar history={this.props.history} />
        <main>
          <Switch>
            <Route exact path="/" component={() => {
              return <Redirect to="/explore"/>
            }}/>
            <Route exact path='/explore' component={() => {
              return <Redirect to="/explore/trance"/>
            }}/>
            <Route path="/explore/:genre" component={Explore}/>
            <Route exact path="/playlists" component={Playlists}/>
          </Switch>
        </main>
        <Player/>
      </div>
    )
  }
}


