
import './songcreator.scss';




import React from 'react'
import {Link} from 'react-router-dom'

export default class SongsCreator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      class: "fa fa-heart-o heart-font",
      isDropDownOpen: false,
      mode: ''
    };


  }



  componentDidMount() {
  }

  updateSongInPlayer() {
    return this.props.updateCurrentTrack(this.props.data);
  }

  heartClicker(elm) {


    this.setState({isDropDownOpen: !this.state.isDropDownOpen})
  }

  DropDownBuilder() {
    return this.props.playLists.map((list, i) => {
      return <label key={i} className="song-drop-down-label">
        <input type="checkbox"/>
        {list.listTitle}</label>
    })

  }

  CreateAddListElm() {
    if (this.props.from === 'Explore') {
      return (<Link to="/playlists" ref={(elm) => {this.Elm = elm}} onClick={() => this.props.addNewList(this.props.data,this.Elm)}
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
        }} onClick={() => this.updateSongInPlayer()}/>
        <span className="song-title">{songTitle + '...'}</span>
        <span className="clock"></span>
        <span className="song-duration">{songDuration}</span>

        <i className={this.state.class} ref={(element) => this.Elm = element} onClick={() => this.heartClicker()}
           aria-hidden="true"
        />

        <div className={dropDownclassName} ref={(element) => this.DropDown = element}>
          <span className="song-drop-down-add-to-title">Add to Playlist</span>

          {this.CreateAddListElm()}

          {this.DropDownBuilder()}
        </div>
      </div>
    )
  }

}

