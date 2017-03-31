import React from 'react';
import SongsCreator from './SongsCreator'
let xhr;
export default class Explore extends React.Component {
  constructor(props) {
    super();
    this.state = {
      songsLoadingState: 'loading',
      songs: []
    }
  }

  componentDidMount() {
    this.songsLoader()
  }

  songsLoader() {
    xhr = new XMLHttpRequest();
    xhr.open('get', "https://create-bootcamp-songcloud-server.now.sh/tracks?genre=trance");
    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), songsLoadingState: 'loaded'});
      // console.info('finish done');
    });
    xhr.addEventListener('error', () => {
      this.setState({songsLoadingState: 'error'});
      // console.info('error');
    });
    xhr.send();
  }

  SongsHandler() {
  return  this.state.songs.map((song, i) => <li key={song.id} className="song-card"><SongsCreator data={this.state.songs[i]}/>
    </li>)
  }

ListOfSongsCreator() {
    return     <ul>
      {this.SongsHandler()}
    </ul>
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
        <ul className="categoriescontainer">
          <li>Categories list</li>
          <li>Categories list</li>
          <li>Categories list</li>
          <li>Categories list</li>
          <li>Categories list</li>
          <li>Categories list</li>
          <li>Categories list</li>
        </ul>


        {this.ListOfSongsCreator()}


        <span>Current page number: 1</span><br/>
        <button>Previous page</button>
        <button>Next page</button>
        <button onClick={this.temp}>console.info</button>


      </div>
    )
  }

}
