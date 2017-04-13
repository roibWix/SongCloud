import './player.scss';
import  React from "react";
import {connect} from 'react-redux';


function Player(props) {


  let songUrl = props.currentTrack ? props.currentTrack.stream_url + '?client_id=e582b63d83a5fb2997d1dbf2f62705da' : null;


  let songImage = props.currentTrack ? props.currentTrack.artwork_url : null;
  let songTitle = props.currentTrack.title ? props.currentTrack.title.slice(0, 35) + '...' : null;


  return (
    <footer className="Player">
      <div className="image-in-player" style={{backgroundImage: `url(${songImage})`}}/>
      <span>{songTitle}</span>
      <audio className="playerElm" controls src={songUrl} autoPlay/>

    </footer>
  )
}
function mapStateToProps(stateData) {
  return {
    currentTrack: stateData.currentTrackReducer
  }
}

export default connect(mapStateToProps)(Player)

