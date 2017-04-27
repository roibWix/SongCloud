import './explore.scss';

import React from 'react';
import SongCreator from '../songcreator/SongCreator'
import {NavLink} from 'react-router-dom';
// import {setSong} from '../root/Root'


export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      exploreLoadingState: 'loading',
      songs: [],
      offset: 0,
      limit: 15
    }
  }

  componentDidMount() {
    this.getSongsXhr();
  }

  getSongsXhr() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const searchTarget = searchParams.get('search') ? 'q' : 'tags';
    const clientID = 'e582b63d83a5fb2997d1dbf2f62705da';
    const genre = this.props.match.params.genre;
    let xhr = new XMLHttpRequest();


    xhr.open('get', `https://api.soundcloud.com/tracks?client_id=${clientID}&limit=${this.state.limit}&offset=${this.state.offset}&${searchTarget}=${genre}`);
    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), exploreLoadingState: 'loaded'})
    });
    xhr.addEventListener('error', () => {
      this.setState({exploreLoadingState: 'error'})
    });
    xhr.send();
  }

  SongsBuilder() {
    return this.state.songs.map((song, i) => <li key={song.id} className="song-card"><SongCreator
      data={this.state.songs[i]}
      from={'Explore'}/>
    </li>)
  }

  ListOfSongsCreator() {
    if (this.state.songs.length === 0) {
      return <div className="no-songs-were-found-container"><h2 className="no-songs-were-found-msg">No songs were found
        for your search</h2></div>
    }
    return <ul className="songs-container">
      {this.SongsBuilder()}
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


  paginationButtons() {
    if (this.state.songs.length > 0) {

      return <div className="pagenumber">
        <button className="prebtn pagenumberbtn"
                onClick={ this.prevPage.bind(this)}
                disabled={this.state.offset === 0}>Prev
        </button>
        <span className="current-page-number">page {(this.state.offset / this.state.limit ) + 1}</span>
        <button className="nextbtn pagenumberbtn" onClick={this.nextPage.bind(this)}>Next</button>
      </div>
    }


  }

  render() {
    const SongsTitle = this.props.location.search.length ? 'Search:' : 'Genre:';

    switch (this.state.exploreLoadingState) {
      case 'loading':
        return <div className="loader"><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw margin-bottom"/>
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

        <h2 className="explore-title-genres">{SongsTitle} {this.props.match.params.genre}</h2>


        {this.ListOfSongsCreator()}


        {this.paginationButtons()}

      </div>
    )
  }
}
