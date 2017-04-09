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
import uuid from 'uuid';


export default class Root extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentTrack: {null},
      playlists: [{
        listid: 666,
        listTitle: 'First-list-ever',
        songs: [{
          id: 250711755,
          title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
          duration: 219082,
          stream_url: "https://api.soundcloud.com/tracks/250711755/stream",
          uri: "https://api.soundcloud.com/tracks/250711755",
          artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
        }]
      },
        {
          listid: 999,
          listTitle: 'second-list-ever',
          songs: [{
            id: 250711755,
            title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
            duration: 219082,
            stream_url: "https://api.soundcloud.com/tracks/250711755/stream",
            uri: "https://api.soundcloud.com/tracks/250711755",
            artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
          }]
        }]
    };

    this.updateCurrentTrack = this.updateCurrentTrack.bind(this);
    this.addNewList2state = this.addNewList2state.bind(this);
    this.updateList = this.updateList.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  updateCurrentTrack(data) {
    const state = this.state;
    const newObj = Object.assign({}, {data});
    this.setState({currentTrack: newObj});
  }

  addNewList2state(song, element) {
    const copyOfState = [...this.state.playlists];
    let newuuid = uuid();
    let playlist = {
      listid: newuuid,
      listTitle: 'Untitled',
      songs: [{
        id: 250711755,
        title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
        duration: 219082,
        stream_url: "https://api.soundcloud.com/tracks/250711755/stream",
        uri: "https://api.soundcloud.com/tracks/250711755",
        artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
      }]
    };
    if (song) {
      playlist.songs.pop();
      playlist.songs.push(song);
      // this.Elm = element;
    }
    copyOfState.push(playlist);
    this.setState({playlists: copyOfState});
  }

  updateList(list, i, newTitleName) {
    let copyOfState = [...this.state.playlists];
    copyOfState[i].listTitle = newTitleName;


    this.setState({playlists: copyOfState});
  }

  deleteList(listIndex) {
    let copyOfPlaylists = [...this.state.playlists];
console.info(copyOfPlaylists);
    let newCopy = copyOfPlaylists.splice(listIndex,1);
console.info(newCopy);
    // this.setState({playlists-main: copyOfPlaylists});
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


            <Route path="/explore/:genre" render={(props) => {
              return <Explore updateCurrentTrack={this.updateCurrentTrack} {...props} playLists={this.state.playlists}
                              addNewList={this.addNewList2state}/>
            }}/>

            <Route exact path="/playlists" render={(props) => {
              return <Playlists updateCurrentTrack={this.updateCurrentTrack}
                                addNewList={this.addNewList2state}
                                {...props} updateList={this.updateList}
                                playLists={this.state.playlists}
                                deleteList={this.deleteList}/>
            }}/>
          </switch>
        </main>
        <Player Track={this.state.currentTrack}/>

      </div>


    )
  }
}



