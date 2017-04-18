import uuid from 'uuid';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
// import store from '../store'

const dummyData = [{
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

const myJsonString = JSON.stringify(dummyData);

// console.info(myJsonString);


export default function playListsReducer(playlists = [], action) {
  let copyOfPlayLists = [...playlists];
  switch (action.type) {
    case 'PLAYLISTS-FROM-SERVER':

      if (playlists.length > 0) {
        return playlists;
      }

      if (playlists.length === 0) {
        return action.data;
      }

      return playlists;

    case 'ADD-NEW-PLAYLIST':

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

      if (action.song) {
        playlist.songs.pop();
        playlist.songs.push(action.song);
      }
      copyOfPlayLists.push(playlist);


      return copyOfPlayLists;


    case 'UPDATE-LIST':

      // let copyOfPlayLists = [...playlists];
      copyOfPlayLists[action.index].listTitle = action.newTitleName;
      return copyOfPlayLists;

    case 'DELETE-LIST':


      copyOfPlayLists.splice(action.index, 1);
      // console.info(copyOfPlayLists);
      return copyOfPlayLists;


    case 'UPDATE-SONGS-IN-PLAYLIST':

      switch (action.isItChecked) {
        //add song to playlist
        case true:

          copyOfPlayLists[action.indexOfList].songs.push(action.song);
          return copyOfPlayLists;

        //remove song from playlist
        case false:

          let indexOfSong = copyOfPlayLists[action.indexOfList].songs.indexOf(action.song);

          copyOfPlayLists[action.indexOfList].songs.splice(indexOfSong, 1);
      }


      return copyOfPlayLists;

  }


  return playlists;


}


/*addNewList(song, element) {
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
