import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {serverLocation} from '../../serverLocation';
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
    this.getPlaylistsFromServerXhr();
  }

  componentDidUpdate() {
    if (this.props.currentTrack.id !== undefined) {
      this.main.classList.add('main-with-player')
    }
  }

  getPlaylistsFromServerXhr() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${serverLocation}/list`);
    xhr.addEventListener('load', () => {
      const playList = JSON.parse(xhr.responseText);
      this.props.updateLocalStorePlaylistsFromServer(playList);
    });
    xhr.addEventListener('error', () => {
      console.info('error');
    });
    xhr.send()
  }


  render() {
    return (
      <div>
        <Topbar history={this.props.history}/>
        <main ref={(elm) => this.main = elm} className="main-element">
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
    updateLocalStorePlaylistsFromServer(data) {
      dispatch({type: 'PLAYLISTS-FROM-SERVER', data: data})
    }
  }
}

function mapStateToProps(stateData) {
  return {
    currentTrack: stateData.currentTrackReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Root)
