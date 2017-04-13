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
      addedNewList: false,
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


    // this.addNewList2state = this.addNewList2state.bind(this);
    // this.updateList = this.updateList.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }


  /*  addNewList2state(song, element) {
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

   this.setState({addedNewList: true}, () => this.setState({addedNewList: false}));
   if (song) {
   playlist.songs.pop();
   playlist.songs.push(song);
   }
   copyOfState.push(playlist);
   this.setState({playlists: copyOfState});
   }*/

  /*  updateList(list, i, newTitleName) {
   let copyOfState = [...this.state.playlists];
   copyOfState[i].listTitle = newTitleName;
   this.setState({playlists: copyOfState});

   }*/

  deleteList(listIndex) {
    let copyOfPlaylists = [...this.state.playlists];
    console.info('copyofplaylists', copyOfPlaylists);
    copyOfPlaylists.splice(listIndex, 1);

    this.setState({playlists: copyOfPlaylists});
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


            <Route path="/explore/:genre" component={ Explore}/>

            <Route exact path="/playlists" render={(props) => {
              return <Playlists
                                {...props} updateList={this.updateList}
                                playLists={this.state.playlists}
                                deleteList={this.deleteList}
                                addedNewList={this.state.addedNewList}/>
            }}/>
          </switch>
        </main>
        <Player/>

      </div>


    )
  }
}


{/*
 <Explore  {...props}
 playLists={this.state.playlists}
 addNewList={this.addNewList2state}/>*/
}


{/*
<Route path="/explore/:genre" render={(props) => {
  return <Explore match={props.match}/>
}}/>*/}
{/*
<Playlists addNewList={this.addNewList2state}
           {...props} updateList={this.updateList}
           playLists={this.state.playlists}
           deleteList={this.deleteList}
           addedNewList={this.state.addedNewList}/>*/}
