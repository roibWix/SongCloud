import './playlists.scss';
import React from 'react'
import SongsCreator from '../songcreator/SongCreator';
import PlayList from '../playlist/PlayList';

export default class Playlists extends React.Component {
  constructor() {
    super();

    this.state = {
      // isTitleMode: true
      scrollTo: null
    };
    this.addNewListHandler = this.addNewListHandler.bind(this);
    this.deleteList = this.deleteList.bind(this)

  }

  componentDidMount() {


  }

  headerScroller(title) {
this.setState({scrollTo: title});
  }


  listBuilderInBar() {
    return this.props.playLists.map((list, i) => {
      return <li onClick={() => this.headerScroller(list.listTitle)} className="playlist-bar-list" key={i}
                 ref={(evt) => this.Elm = evt}>{list.listTitle}</li>;
    })
  }

  componentDidUpdate() {

  }


  listBuilderInPlaylists() {


    return this.props.playLists.map((list, i) => {
      return (

        <PlayList
          scrollTo={this.state.scrollTo}
          playLists={this.props.playLists}
          addedNewList={this.props.addedNewList && this.props.playLists.length - 1}
          key={i}
          i={i}
          list={list}
          updateCurrentTrack={this.props.updateCurrentTrack}
          updateList=
            {this.props.updateList}
          deleteList={this.deleteList}

        />
      )
    })
  }

  addNewListHandler() {
    this.props.addNewList()
  }


  deleteList(i) {
    // let title = this.list.listTitle;
    // confirm(`Deleting ${title} playlist. Are you sure?`);
    this.props.deleteList(i);

  }


  render() {

    return (
      <div className="playlists">
        <div className="playlist-bar">
          <div className="playlist-bar-top">
            <button className="pagenumberbtn add-list-btn" onClick={() => this.addNewListHandler() }>Add new playlist
            </button>
          </div>
          <div className="playlist-bar-separator"/>
          <div className="playlist-bar-bottom">
            <ul className="playlist-bar-lists">
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
//
// {...this.props}
