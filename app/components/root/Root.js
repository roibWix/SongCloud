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
import {connect} from 'react-redux';


class Root extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.getXhr();
  }



  getXhr() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/`);
    xhr.addEventListener('load', () => {
      const playList = JSON.parse(xhr.responseText);
      this.props.updatePlaylistsFromServer(playList);
    });
    xhr.send()
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

function mapDispatchToProps(dispatch) {
  return {
    updatePlaylistsFromServer(data) {
      dispatch({type: 'PLAYLISTS-FROM-SERVER', data: data})
    }
  }
}


export default connect(null, mapDispatchToProps)(Root)
