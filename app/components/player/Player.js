import './player.scss';
import  React from "react";
import {connect} from 'react-redux';


class Player extends React.Component {
  constructor() {
    super();
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this)
  }


  componentDidUpdate(prevProps, prevState) {

    if (this.props.playerModeReducer === false) {
      this.player.pause()
    }
    if (this.props.playerModeReducer === true) {
      this.player.play()
    }


    if (this.props.currentTrack) {
      this.playerElm.classList.add('song-loaded')

    }

  }

  onPlay() {
    const playing = true;
    this.props.updatePlayerModeInStore(playing)
  }

  onPause() {
    const pause = false;
    this.props.updatePlayerModeInStore(pause)
  }

  render() {
    let songUrl = this.props.currentTrack ? this.props.currentTrack.stream_url + '?client_id=e582b63d83a5fb2997d1dbf2f62705da' : null;
    let songImage = this.props.currentTrack ? this.props.currentTrack.artwork_url : null;
    let songTitle = this.props.currentTrack.title ? this.props.currentTrack.title.slice(0, 35) + '...' : null;
    return (
      <footer className="Player" ref={(elm) => this.playerElm = elm}>
        <div className="image-in-player" style={{backgroundImage: `url(${songImage})`}}/>
        <span>{songTitle}</span>
        <audio className="playerElm" controls src={songUrl} autoPlay ref={(elm) => this.player = elm}
               onPlay={this.onPlay} onPause={this.onPause}/>
      </footer>
    )
  }


}
function mapDispatchToProps(dispatch) {
  return {
    updatePlayerModeInStore(mode) {
      dispatch({
        type: 'IS-PLAYING',
        mode: mode
      })
    }

  }
}
function mapStateToProps(stateData) {
  return {
    playerModeReducer: stateData.playerModeReducer,
    currentTrack: stateData.currentTrackReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player)


