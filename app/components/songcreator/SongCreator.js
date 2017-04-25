import './songcreator.scss';
// import store from '../../store'

import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class SongsCreator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      class: "fa fa-heart-o heart-font",
      isDropDownOpen: false,
      checker: false
    };

    this.checkHandler = this.checkHandler.bind(this);
    this.DropDownModeHandler = this.DropDownModeHandler.bind(this);
    this.handler = this.handler.bind(this);
    this.DropDownBuilder = this.DropDownBuilder.bind(this);
    this.CreateAddListHandler = this.CreateAddListHandler.bind(this);
    this.updateSongInPlayerHandler = this.updateSongInPlayerHandler.bind(this);
  };


  componentDidMount() {
    this.heartHandler()


  }


  heartHandler() {
    const storeDataPlayLists = this.props.playLists;

    storeDataPlayLists.map((list, i) => {
      list.songs.map((song) => {
        if (song.id === this.props.data.id) {
          return this.setState({
            class: "fa fa-heart heart-font"
          })
        }
      });
    })

  }


  heartClicker() {

    this.setState({isDropDownOpen: !this.state.isDropDownOpen});


  }


  checkHandler(event) {
    let isItChecked = event.target.checked;
    let song = this.props.data;
    let indexOfList = event.target.id;

    let data = {isItChecked, song, indexOfList};
    this.checkHandlerToServer(data);
    this.props.checkHandlerToStore(isItChecked, song, indexOfList);


  }


  checkHandlerToServer(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3000/CheckHandler');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", () =>
      console.info('')
    );
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
               onChange={this.checkHandler}
               checked={ checked }/>
        {list.listTitle}
        <span className="indicator"/>
      </label>
    })
  }


  CreateAddListHandler(data) {
    // console.info(data);

    this.CreateAddListWithSongToServer(data);
    this.props.CreateAddListToStore(data)
  }

  CreateAddListWithSongToServer(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3000/AddNewListWithSong');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", () =>
      console.info('done')
    );

    xhr.send(JSON.stringify(data));
  }

  CreateAddListElm() {
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
    const dropDownclassName = this.state.isDropDownOpen ? 'song-drop-down show' : 'song-drop-down';
    return (
      <div className={dropDownclassName}>
        {this.DropDownModeHandler()}
        {this.CreateAddListElm()}
        {this.CheckBoxBuilder()}
      </div>
    )
  }


  handler() {
    this.setState({isDropDownOpen: false})
  }

  updateSongInPlayerHandler(data) {


    if ((this.props.playerReducer.playing === 'false') || (this.props.currentTrack !== this.props.data)) {
      const playing = true;
      this.props.updatePlayerModeInStore(playing);
      this.props.updateSongInPlayer(data);
    }

    if ((this.props.playerReducer.playing === 'true') || (this.props.currentTrack === this.props.data)) {
      const notplaying = false;
      this.props.updatePlayerModeInStore(notplaying)
    }

    if ((this.props.playerReducer === false) && (this.props.currentTrack === this.props.data)) {
      const playing = true;
      this.props.updatePlayerModeInStore(playing)
    }

  }

  togglePlayingModeView() {
    this.icon.classList.toggle("fa-play-circle-o");
    this.icon.classList.toggle("fa-pause-circle-o");
    this.icon.classList.toggle("isplaying");
  }

  componentDidUpdate(prevProps, prevState) {

    // heart Handler
    if ((prevState.isDropDownOpen === false) && (this.state.isDropDownOpen === true)) {
      this.setState({
        class: "fa fa-heart heart-font"
      });
    }
    if ((prevState.isDropDownOpen === true) && (this.state.isDropDownOpen === false)) {
      this.setState({
        class: "fa fa-heart-o heart-font"
      });

      this.heartHandler()
    }
// if happens any change in heart condition and this song is playing keep the icon on playing mode
    if (((prevState.isDropDownOpen === true) && (this.state.isDropDownOpen === false) || ((prevState.isDropDownOpen === false) && (this.state.isDropDownOpen === true))) && (this.props.playerReducer === true) && (this.props.currentTrack === this.props.data)) {
      this.icon.classList.remove("fa-play-circle-o");
      this.icon.classList.add("fa-pause-circle-o");
      this.icon.classList.add("isplaying");
    }




    // if this song is in the player and it's playing change the icon to pause
    if ((this.props.playerReducer === true) && (this.props.currentTrack === this.props.data)) {
      this.togglePlayingModeView()
    }
    // if this song is in the player and it's in pause mode change the icon to play
    if ((this.props.playerReducer === false) && (this.props.currentTrack === this.props.data)) {
      this.togglePlayingModeView()
    }
    // if song changed in player change icon to defult mode
    if ((prevProps.currentTrack === this.props.data) && (this.props.currentTrack !== this.props.data)) {
      this.togglePlayingModeView()
    }


  }

  render() {

    let songImage = this.props.data.artwork_url ? this.props.data.artwork_url.replace('large', 't300x300') : this.props.data.artwork_url;
    const songTitle = this.props.data.title ? this.props.data.title.slice(0, 30) : null;
    const minutes = Math.floor(parseInt(this.props.data.duration) / 60000);
    const seconds = ((parseInt(this.props.data.duration % 60000) / 1000).toFixed(0));
    const songDuration = (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);


    return (
      <div className="songs-creator" ref={(song) => this.song = song}>

        <div className="img-song" style={{
          backgroundImage: `url(${songImage})`
        }} onClick={() => this.updateSongInPlayerHandler(this.props.data)}>
          <div className="img-song-player-mode"><span ref={(elm) => {
            this.icon = elm
          }} className="fa fa-play-circle-o" aria-hidden="true"/></div>
        </div>


        <span className="song-title">{songTitle + '...'}</span>
        <span className="clock"></span>
        <span className="song-duration">{songDuration}</span>

        <i className={this.state.class} onClick={() => this.heartClicker()}
           aria-hidden="true"/>

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
    checkHandlerToStore(isItChecked, song, indexOfList) {
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
    playerReducer: stateData.playerReducer,
    playLists: stateData.playListReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsCreator)


// <span>{this.playingModeCharHandler()}</span>
