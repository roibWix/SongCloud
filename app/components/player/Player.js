import './player.scss';
import  React from "react";
export default function Player(props) {

let songUrl = props.Track.data? props.Track.data.stream_url + '?client_id=e582b63d83a5fb2997d1dbf2f62705da' : null;
let songImage = props.Track.data? props.Track.data.artwork_url :null;
let songTitle = props.Track.data? props.Track.data.title.slice(0,35)+ '...' :null;



  return (
    <footer className="Player">
      <div className="image-in-player" style={{backgroundImage:`url(${songImage})`}}/>
      <span>{songTitle}</span>
      <audio className="playerElm" controls src={songUrl} autoPlay/>

    </footer>
  )
}



