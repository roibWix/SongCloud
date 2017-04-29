import './songcreator.scss';
import {serverLocation} from '../../serverLocation';
import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'


class SongsCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      heartClassName: "fa fa-heart-o heart-font",
      isDropDownOpen: false
    };

    this.addRemoveSongFromListHandler = this.addRemoveSongFromListHandler.bind(this);
    this.DropDownModeHandler = this.DropDownModeHandler.bind(this);
    this.DropDownBuilder = this.DropDownBuilder.bind(this);
    this.CreateAddListHandler = this.CreateAddListHandler.bind(this);
    this.updateSongInPlayerHandler = this.updateSongInPlayerHandler.bind(this);
  };


  componentDidMount() {
    this.heartViewHandler();
  }


  heartViewHandler() {
    const storeDataPlayLists = this.props.playLists;

    storeDataPlayLists.map((list, i) => {
      list.songs.map((song) => {
        if (song.id === this.props.data.id) {
          return this.setState({
            heartClassName: "fa fa-heart heart-font"
          })
        }
      });
    })

  }


  heartClicker() {
    this.setState({isDropDownOpen: !this.state.isDropDownOpen});
  }


  addRemoveSongFromListHandler(event) {
    let isItChecked = event.target.checked;
    let song = this.props.data;
    let indexOfList = event.target.id;

    let data = {isItChecked, song, indexOfList};
    this.addRemoveSongFromListServerUpdate(data);
    this.props.addRemoveSongFromListStoreUpdate(isItChecked, song, indexOfList);


  }


  addRemoveSongFromListServerUpdate(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${serverLocation}/CheckHandler`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", () => {
    });
    xhr.send(JSON.stringify(data));
  }


  CheckBoxBuilder() {

    const storeDataPlayLists = this.props.playLists;
    // value of checkbox
    let checked = false;
    let indexInList = -1;
    // dropdown builder
    return storeDataPlayLists.map((list, i) => {
      // checked value reset
      checked = false;
      indexInList = i;
      // iterate songs for each list in order to define if each song exciste in list
      list.songs.map((song) => {
        if (song.id === this.props.data.id) {
          checked = true
        }
      });
      return <label key={i} className="song-drop-down-label">
        <input type="checkbox"
               id={i}
               onChange={this.addRemoveSongFromListHandler}
               checked={ checked }/>
        {list.listTitle}
        <span className="indicator"/>
      </label>
    })
  }


  CreateAddListHandler(data) {

    this.CreateAddListWithSongToServer(data);
    this.props.CreateAddListToStore(data)
  }

  CreateAddListWithSongToServer(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${serverLocation}/AddNewListWithSong`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", () => {});

    xhr.send(JSON.stringify(data));
  }

  CreateAddListWithSongBtn() {
    if (this.props.from === 'Explore') {

      return (<Link to="/playlists" ref={(elm) => {
        this.Elm = elm
      }} onClick={() => this.CreateAddListHandler(this.props.data) }
                    className="song-drop-down-add-to-btn">Create playlist +</Link>)
    }
  }

  DropDownModeHandler() {

    if (this.props.from === 'Explore') {
      return <span className="song-drop-down-add-to-title">Add to Playlist</span>
    }

    if (this.props.from === 'Playlists') {
      return <span className="song-drop-down-add-to-title">Edit Playlist</span>
    }
  }


  DropDownBuilder() {
    const dropDownClassName = this.state.isDropDownOpen ? 'song-drop-down show' : 'song-drop-down';
    return (
      <div className={dropDownClassName}>
        {this.DropDownModeHandler()}
        {this.CreateAddListWithSongBtn()}
        {this.CheckBoxBuilder()}
      </div>
    )
  }




  updateSongInPlayerHandler(data) {

    if (this.props.currentTrack.id === this.props.data.id) {
      if (this.props.playerModeReducer === true) {
        const pause = false;
        this.props.updatePlayerModeInStore(pause);
      }
      if (this.props.playerModeReducer === false) {
        const play = true;
        this.props.updatePlayerModeInStore(play);
      }

    }

    if (this.props.currentTrack.id !== this.props.data.id) {
      const play = true;
      this.props.updatePlayerModeInStore(play);
      this.props.updateSongInPlayer(data);
    }


  }


  componentDidUpdate(prevProps, prevState) {

    // heart Handler
    if ((prevState.isDropDownOpen === false) && (this.state.isDropDownOpen === true)) {
      this.setState({
        heartClassName: "fa fa-heart heart-font"
      });
    }
    if ((prevState.isDropDownOpen === true) && (this.state.isDropDownOpen === false)) {
      this.setState({
        heartClassName: "fa fa-heart-o heart-font"
      });

      this.heartViewHandler()
    }
    this.heartViewHandler();

  }

  render() {

    let songImage = this.props.data.artwork_url ? this.props.data.artwork_url.replace('large', 't300x300') : this.props.data.artwork_url;
    const songTitle = this.props.data.title ? this.props.data.title.slice(0, 30) : null;
    const minutes = Math.floor(parseInt(this.props.data.duration) / 60000);
    const seconds = ((parseInt(this.props.data.duration % 60000) / 1000).toFixed(0));
    const songDuration = (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

    const playMode = ((this.props.playerModeReducer === true) && (this.props.currentTrack.id === this.props.data.id)) ? "fa fa-pause-circle-o isplaying" : "fa fa-play-circle-o";


    return (

      <div className="songs-creator">

        <div className="img-song" style={{
          backgroundImage: `url(${songImage})`
        }} onClick={() => this.updateSongInPlayerHandler(this.props.data)}>
          <div className="img-song-player-mode">
            <span className={playMode}/>
          </div>
        </div>

        <span className="song-title">{songTitle + '...'}</span>
        <span className="clock"></span>
        <span className="song-duration">{songDuration}</span>
        <i className={this.state.heartClassName} onClick={() => this.heartClicker()}/>
        {this.DropDownBuilder()}
      </div>
    )
  }

}


function mapDispatchToProps(dispatch) {
  return {
    updateSongInPlayer(song) {
      dispatch({
        type: 'UPDATE_CURRENT_TRACK',
        currentTrack: song
      });
    },
    CreateAddListToStore(song) {
      dispatch({type: 'ADDED-NEW-LIST', addedNewList: true});
      dispatch({type: 'ADD-NEW-PLAYLIST', song: song, element: this.Elm})
    },
    addRemoveSongFromListStoreUpdate(isItChecked, song, indexOfList) {
      dispatch({type: 'UPDATE-SONGS-IN-PLAYLIST', isItChecked: isItChecked, song: song, indexOfList: indexOfList})
    },
    updatePlayerModeInStore(mode){
      dispatch({
        type: 'IS-PLAYING',
        mode: mode
      })
    }

  }
}

function mapStateToProps(stateData) {
  return {
    currentTrack: stateData.currentTrackReducer,
    playerModeReducer: stateData.playerModeReducer,
    playLists: stateData.playListReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsCreator)


