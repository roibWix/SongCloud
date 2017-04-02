import React from 'react'
import {Link} from 'react-router-dom'
import Player from "./Player";


export default class SongsCreator extends React.Component {
  constructor(props) {
    super();
  }

  clickHandler() {
    const uri = this.props.data.uri + '?client_id=e582b63d83a5fb2997d1dbf2f62705da';
    // console.info(uri.toString());

    // this.setState({currentplaying: uri.toString()});
    // console.info(this);
  }

  handler(elm) {

this.Elm.style.color = 'black';
  }

  render() {
    const songTitle = this.props.data.title.slice(0, 30);


    const minutes = Math.floor(parseInt(this.props.data.duration) / 60000);
    const seconds = ((parseInt(this.props.data.duration % 60000) / 1000).toFixed(0));
    const songDuration = (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    return (
      <div>

        <div className="img-song" style={{
          backgroundImage: `url(${this.props.data.artwork_url.replace('large', 't300x300')})`,
          backgroundSize: 'cover'
        }}/>
        <span className="song-title">{songTitle + '...'}</span>
        <span className="clock"></span>
        <span className="song-duration">{songDuration}</span>
        <i className="fa fa-heart-o heart-font" ref={(element) => this.Elm = element} onClick={() => this.handler()} aria-hidden="true"/>

        <button className="play-on-card" onClick={() => this.clickHandler()} value={this.props.data.uri}><i
          className="fa fa-play-circle-o" aria-hidden="true"/></button>
      </div>
    )
  }

}
// src={this.props.data.artwork_url}

