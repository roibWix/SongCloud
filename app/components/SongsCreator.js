import React from 'react'
import {Link} from 'react-router-dom'
import Player from "./Player";
import setSong from './Root'

export default class SongsCreator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      class: "fa fa-heart-o heart-font"
    }


  }


  updateSongInPlayer() {
    return this.props.updateCurrentTrack(this.props.data);
  }

  heartClicker(elm) {
    const emptyHeart = "fa fa-heart-o heart-font";
    const fullHeart = "fa fa-heart heart-font";

    if (this.state.class === emptyHeart) {
      this.setState({class: fullHeart})
    }
    if (this.state.class === fullHeart) {
      this.setState({class: emptyHeart})
    }

  }

  render() {
    let songImage = this.props.data.artwork_url ? this.props.data.artwork_url.replace('large', 't300x300') : this.props.data.artwork_url;
    const songTitle = this.props.data.title.slice(0, 30);
    const minutes = Math.floor(parseInt(this.props.data.duration) / 60000);
    const seconds = ((parseInt(this.props.data.duration % 60000) / 1000).toFixed(0));
    const songDuration = (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);


    return (
      <div onClick={() => this.updateSongInPlayer()}>
        <div className="img-song" style={{
          backgroundImage: `url(${songImage})`
        }}/>
        <span className="song-title">{songTitle + '...'}</span>
        <span className="clock"></span>
        <span className="song-duration">{songDuration}</span>
        <i className={this.state.class} ref={(element) => this.Elm = element} onClick={() => this.heartClicker()}
           aria-hidden="true"/>

        <div className="song-drop-down">
          <span className="song-drop-down-add-to-title">Add to Playlist</span>
          <botton className="song-drop-down-add-to-btn">Create playlist +</botton>
          <label className="song-drop-down-label">
          <input type="checkbox"/>
            list one </label>

          <label className="song-drop-down-label">
            <input type="checkbox"/>
            list two </label>
          <label className="song-drop-down-label">
            <input type="checkbox"/>
            list three </label>
          <label className="song-drop-down-label">
            <input type="checkbox"/>
            list four </label>

        </div>


        {/*<button className="play-on-card" onClick={() => this.updateSongInPlayer()}/>*/}
      </div>
    )
  }

}

