import './playlists.scss';
import {serverLocation} from '../../serverLocation';
import uuid from 'uuid';
import React from 'react';
import {connect} from 'react-redux';
import PlayList from '../playlist/PlayList';

class Playlists extends React.Component {
  constructor() {
    super();

    this.state = {
      scrollTo: null
    };


    this.ScrollToList = this.ScrollToList.bind(this);
    this.addNewListHandler = this.addNewListHandler.bind(this);
  }

  componentDidMount() {

  }


  ScrollToList(listId) {
    this.setState({scrollTo: listId});
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state.scrollTo !== null) {
      this.setState({scrollTo: null});
    }
  }

  listBuilderInBar() {
    const playLists = this.props.playLists;
    return playLists.map((list, i) => {
      return <li onClick={() => this.ScrollToList(list.listid)}
                 onBlur={() => this.ScrollToList(null)}
                 className="playlist-bar-list"
                 key={i}
                 ref={(evt) => this.Elm = evt}>{list.listTitle}</li>;
    })

  }

  listBuilderInPlaylists() {
    const playLists = this.props.playLists;
    if (playLists.length === 0) {
return <h2 className="why-dont-have-songs">Why don’t you create some nice playlist?</h2>
    }
    if (playLists.length > 0) {
      return playLists.map((list, i) => {
        return <PlayList
          scrollTo={this.state.scrollTo}
          key={i}
          i={i}
          list={list}
          ref={(evt) => this.last = evt}
        />
      })
    }

  }

  addNewListHandler() {
    this.XhrNewList();


  }
  XhrNewList() {
    let newuuid = uuid();
    let playlist = {
      listid: newuuid,
      listTitle: 'Untitled',
      songs: [{
        id: 250711755,
        title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
        duration: 219082,
        stream_url: "https://api.soundcloud.com/tracks/250711755/stream",
        uri: "https://api.soundcloud.com/tracks/250711755",
        artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
      }]
    };

    const xhr = new XMLHttpRequest();
    xhr.open('post', `${serverLocation}/addNewList`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", ()=>
      this.props.addNewListToStore()
    );
    xhr.send(JSON.stringify(playlist))
  }





  render() {

    return (
      <div className="playlists">


        <div className="playlist-sidebar">
          <div className="playlist-sidebar-top">
            <button className="pagenumberbtn add-list-btn" onClick={() => this.addNewListHandler() }>Add new
              playlist
            </button>
          </div>
          <div className="playlist-sidebar-separator"/>
          <div className="playlist-sidebar-bottom">
            <ul className="playlist-sidebar-lists">
              {this.listBuilderInBar()}
            </ul>
          </div>
        </div>
        <div className="playlists-main">
          {this.listBuilderInPlaylists()}
        </div>
      </div>
    )
  }


}


function mapDispatchToProps(dispatch) {
  return {
    addNewListToStore() {
      dispatch({type: 'ADDED-NEW-LIST', addedNewList: true});
      dispatch({
        type: 'ADD-NEW-PLAYLIST'
      });
    }
  }
}

function mapStateToProps(stateData) {
  return {
    playLists: stateData.playListReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists)



