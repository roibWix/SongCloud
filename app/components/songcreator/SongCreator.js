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
      mode: '',
      checker: false
    };

    // this.CreateAddListElmHandler = this.CreateAddListElmHandler.bind(this)
    this.checkHandler = this.checkHandler.bind(this)
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


  heartClicker(elm) {

    this.setState({isDropDownOpen: !this.state.isDropDownOpen});


  }


  checkHandler(event) {
    let isItChecked = event.target.checked;
    let song = this.props.data;
    let indexOfList = event.target.id;
    this.props.checkHandlerToStore(isItChecked, song, indexOfList);
  }


  DropDownBuilder() {
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
        <input type="checkbox" id={i} onChange={this.checkHandler} checked={ checked }/>
        {list.listTitle}
        <span className="indicator"/>
      </label>
    })
  }


  componentDidUpdate(prevProps, prevState) {
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


  }


  CreateAddListElm() {
    if (this.props.from === 'Explore') {

      return (<Link to="/playlists" ref={(elm) => {
        this.Elm = elm
      }} onClick={() => this.props.CreateAddListElmHandler(this.props.data) }
                    className="song-drop-down-add-to-btn">Create playlist +</Link>)
    }


  }

  render() {

    const dropDownclassName = this.state.isDropDownOpen ? 'song-drop-down show' : 'song-drop-down';


    let songImage = this.props.data.artwork_url ? this.props.data.artwork_url.replace('large', 't300x300') : this.props.data.artwork_url;
    const songTitle = this.props.data.title ? this.props.data.title.slice(0, 30) : null;
    const minutes = Math.floor(parseInt(this.props.data.duration) / 60000);
    const seconds = ((parseInt(this.props.data.duration % 60000) / 1000).toFixed(0));
    const songDuration = (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);


    return (
      <div className="songs-creator" ref={(song) => this.song = song}>
        <div className="img-song" style={{
          backgroundImage: `url(${songImage})`
        }} onClick={() => this.props.updateSongInPlayer(this.props.data)}/>
        <span className="song-title">{songTitle + '...'}</span>
        <span className="clock"></span>
        <span className="song-duration">{songDuration}</span>

        <i className={this.state.class} ref={(element) => this.Heart = element} onClick={() => this.heartClicker()}
           aria-hidden="true"
        />

        <div className={dropDownclassName} ref={(element) => this.DropDown = element}>
          {(this.props.from === 'Explore') && <span className="song-drop-down-add-to-title">Add to Playlist</span>}

          {(this.props.from === 'Playlists') && <span className="song-drop-down-add-to-title">Edit Playlist</span>}
          {this.CreateAddListElm()}

          {this.DropDownBuilder()}
        </div>
      </div>
    )
  }

}

// () => this.updateSongInPlayer()
// onClick={() => this.props.addNewList(this.props.data, this.Elm)}


function mapDispatchToProps(dispatch) {
  return {
    updateSongInPlayer(song) {
      dispatch({
        type: 'UPDATE_CURRENT_TRACK',
        currentTrack: song
      });
    },
    CreateAddListElmHandler(song) {
      dispatch({type: 'ADDED-NEW-LIST', addedNewList: true});
      dispatch({type: 'ADD-NEW-PLAYLIST', song: song, element: this.Elm})
    },
    checkHandlerToStore(isItChecked, song, indexOfList) {
      dispatch({type: 'UPDATE-SONGS-IN-PLAYLIST', isItChecked: isItChecked, song: song, indexOfList: indexOfList})
    }
  }
}

function mapStateToProps(stateData) {
  return {
    playLists: stateData.playListReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsCreator)
