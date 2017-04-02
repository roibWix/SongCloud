import React from 'react';
import SongsCreator from './SongsCreator'
import Player from './Player'
import {NavLink} from 'react-router-dom';

let xhr;
export default class Explore extends React.Component {
  constructor(props) {
    super();
    this.state = {
      songsLoadingState: 'loading',
      songs: [],
      clinetID: '?client_id=e582b63d83a5fb2997d1dbf2f62705da',
      currentplaying: '',
      genre: ''

    }
  }


  componentDidMount() {


    this.songsLoader()
  }

  songsLoader() {
    const genre = this.props.match.params.genre;
    xhr = new XMLHttpRequest();
    xhr.open('get', `https://create-bootcamp-songcloud-server.now.sh/tracks?genre=${genre}`);

    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), songsLoadingState: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.setState({songsLoadingState: 'error'});
    });
    xhr.send();
  }

  SongsHandler() {
  return  this.state.songs.map((song, i) => <li key={song.id} className="song-card"><SongsCreator data={this.state.songs[i]}/>
    </li>)
  }

ListOfSongsCreator() {
    return     <ul className="songs-container">
      {this.SongsHandler()}
    </ul>
}

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.genre === this.props.match.params.genre)
      return;
    this.songsLoader();
  }
  temp() {
    console.info(this);
  }
  render() {
    switch (this.state.songsLoadingState) {
      case 'loading':
        return <div>Loading...</div>;
      case 'error':
        return <div>Error!</div>;
      case 'loaded':
    }

    return (
      <div>
        <ul className="categories-container">
          <li className="genres-title">Genres:</li>
          <li className="category"><NavLink  activeClassName="my-selected-category" to="/Explore/trance">Trance</NavLink></li>
          <li className="category"><NavLink  activeClassName="my-selected-category" to="/Explore/dubstep">Dubstep</NavLink></li>
          <li className="category"><NavLink  activeClassName="my-selected-category" to="/Explore/house">House</NavLink></li>
        </ul>


        <h2 className="explore-title-genres">Genres</h2>
        {this.ListOfSongsCreator()}

        <div className="pagenumber">
        <button className="prebtn pagenumberbtn">Prev</button>
        <span className="current-page-number">page 1</span>

        <button className="nextbtn pagenumberbtn">Next</button>
        </div>



        <Player ref={(playerElm) => this.PlayerElm = playerElm}  onClick={ ()=> this.temp()}/>
      </div>


    )
  }

}
