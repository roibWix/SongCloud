import './explore.scss';

import React from 'react';
import SongCreator from '../songcreator/SongCreator'
import {NavLink} from 'react-router-dom';
import {setSong} from '../root/Root'


// let xhr;
export default class Explore extends React.Component {
  constructor(props) {
    super();
    this.state = {
      songsLoadingState: 'loading',
      songs: [],
      clinetID: '?client_id=e582b63d83a5fb2997d1dbf2f62705da',
      genre: '',
      offset: 0,
      limit: 15,
      pageNumber: 1

    }
  }


  componentDidMount() {
// console.info(this);
    this.getSongsXhr()
  }




  getSongsXhr() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const searchTarget = searchParams.get('search') ? 'q' : 'tags';
    // console.info(searchParams);


    const genre = this.props.match.params.genre;
    let xhr = new XMLHttpRequest();

// console.info(this.props);


    xhr.open('get', `https://api.soundcloud.com/tracks?client_id=e582b63d83a5fb2997d1dbf2f62705da&limit=${this.state.limit}&offset=${this.state.offset}&tags=${genre}`);
    // ?client_id=e582b63d83a5fb2997d1dbf2f62705da
    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), songsLoadingState: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.setState({songsLoadingState: 'error'});
    });
    xhr.send();
  }

  SongsHandler() {
    return this.state.songs.map((song, i) => <li key={song.id} className="song-card"><SongCreator
      data={this.state.songs[i]}
      from={'Explore'}/>
    </li>)
  }

  ListOfSongsCreator() {
    return <ul className="songs-container">
      {this.SongsHandler()}
    </ul>
  }

  componentDidUpdate(prevProps, prevState) {
    const prevGenre = prevProps.match.params.genre;
    const targetGenre = this.props.match.params.genre;


    if (prevGenre !== targetGenre) {
      this.setState({
        offset: 0
      }, () => this.getSongsXhr())
    }

    if (prevState.offset !== this.state.offset) {
      this.getSongsXhr()
    }


  }

  nextPage() {
    this.setState({
      offset: this.state.offset + this.state.limit
    })
  }

  prevPage() {
    this.setState({
      offset: this.state.offset - this.state.limit
    })
  }

  render() {
    switch (this.state.songsLoadingState) {
      case 'loading':
        return <div><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw margin-bottom"/>
        </div>;
      case 'error':
        return <div>Error!</div>;
      case 'loaded':
    }

    return (
      <div className="explore">
        <ul className="categories-container">
          <li className="genres-title">Genres:</li>
          <li className="category">
            <NavLink activeClassName="my-selected-category" to="/Explore/allmusic">all-music</NavLink>
          </li>

          <li className="category">
            <NavLink activeClassName="my-selected-category" to="/Explore/hiphoprap">hip hop rap</NavLink>
          </li>


          <li className="category">
            <NavLink activeClassName="my-selected-category" to="/Explore/house">house</NavLink>
          </li>
          <li className="category">
            <NavLink activeClassName="my-selected-category" to="/Explore/rock">rock</NavLink>
          </li>

          <li className="category">
            <NavLink activeClassName="my-selected-category" to="/Explore/pop">pop</NavLink>
          </li>
          <li className="category">
            <NavLink activeClassName="my-selected-category" to="/Explore/reggaeton">reggaeton</NavLink>
          </li>


          <li className="category">
            <NavLink activeClassName="my-selected-category" to="/Explore/trance">trance</NavLink>
          </li>


          <li className="category">
            <NavLink activeClassName="my-selected-category" to="/Explore/dubstep">dubstep</NavLink>
          </li>

        </ul>


        <h2 className="explore-title-genres">Genres</h2>
        {this.ListOfSongsCreator()}
        <div className="pagenumber">
          <button className="prebtn pagenumberbtn"
                  onClick={ this.prevPage.bind(this)}
                  disabled={this.state.offset === 0}>Prev
          </button>
          <span className="current-page-number">page {(this.state.offset / this.state.limit ) + 1}</span>

          <button className="nextbtn pagenumberbtn" onClick={ this.nextPage.bind(this)}>Next</button>

        </div>

      </div>

    )
  }

}
