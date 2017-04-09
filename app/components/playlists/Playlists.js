import './playlists.scss';
import React from 'react'
import SongsCreator from '../songcreator/SongCreator';
import PlayList from '../playlist/PlayList';

export default class Playlists extends React.Component {
  constructor() {
    super();

    this.state = {
      isTitleMode: true
    }
  }

  componentDidMount() {
console.info('fucker',this.lastList);

  }

  listBuilderInBar() {
    return this.props.playLists.map((list, i) => {
      return <li className="playlist-bar-list" key={i}  ref={(evt) => this.Elm = evt}>{list.listTitle}</li>;
    })
  }

  componentDidUpdate() {

      // this.inputState.focus()

  }



  listBuilderInPlaylists() {


    return this.props.playLists.map((list, i) => {
      return (

        <PlayList playLists={this.props.playLists} key={i} i={i} list={list} updateList={this.props.updateList} {...this.props}/>

      )


    })
  }


  render() {

    return (
      <div className="playlists">
        <div className="playlist-bar">
          <div className="playlist-bar-top">
            <button className="pagenumberbtn add-list-btn" onClick={() => this.props.addNewList()}>Add new playlist
            </button>
          </div>
          <div className="playlist-bar-separator"/>
          <div className="playlist-bar-bottom">
            <ul className="playlist-bar-lists" >
              {this.listBuilderInBar()}
            </ul>
          </div>
        </div>
        <div className="playlists-main" >
          {this.listBuilderInPlaylists()}
        </div>
      </div>
    )
  }


}
