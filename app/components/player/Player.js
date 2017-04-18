import './player.scss';
import  React from "react";
import {connect} from 'react-redux';


class Player extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
  }

  render() {

    let songUrl = this.props.currentTrack ? this.props.currentTrack.stream_url + '?client_id=e582b63d83a5fb2997d1dbf2f62705da' : null;
    let songImage = this.props.currentTrack ? this.props.currentTrack.artwork_url : null;
    let songTitle = this.props.currentTrack.title ? this.props.currentTrack.title.slice(0, 35) + '...' : null;
    return (

      <footer className="Player">
        <div className="image-in-player" style={{backgroundImage: `url(${songImage})`}}/>
        <span>{songTitle}</span>
        <audio className="playerElm" controls src={songUrl} autoPlay ref={(elm) => this.player = elm}/>
      </footer>
    )
  }


}

function mapStateToProps(stateData) {
  return {
    currentTrack: stateData.currentTrackReducer
  }
}

export default connect(mapStateToProps)(Player)


