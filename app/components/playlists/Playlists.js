import './playlists.scss';
import React from 'react';
import {connect} from 'react-redux';
import PlayList from '../playlist/PlayList';

class Playlists extends React.Component {
  constructor() {
    super();

    this.state = {
      scrollTo: null
    };


    this.headerScroller = this.headerScroller.bind(this)
  }

  componentDidMount() {
// console.info('first time',this);

  }

  headerScroller(listId) {
    this.setState({scrollTo: listId});
  }


  componentDidUpdate(prevProps, prevState) {
     if (this.state.scrollTo !== null) {
      this.setState({scrollTo: null});
    }
    // console.info('did update',this);
  }

  listBuilderInBar() {
    const playLists = this.props.playLists;
    return playLists.map((list, i) => {
      // console.info('in bar',i);
      return <li onClick={() => this.headerScroller(list.listid)}
                 onBlur={() => this.headerScroller(null)}
                 className="playlist-bar-list"
                 key={i}
                 ref={(evt) => this.Elm = evt}>{list.listTitle}</li>;
    })

  }

  listBuilderInPlaylists() {
    const playLists = this.props.playLists;
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


  render() {
    return (
      <div className="playlists">
        <div className="playlist-bar">
          <div className="playlist-bar-top">
            <button className="pagenumberbtn add-list-btn" onClick={() => this.props.addNewListHandler() }>Add new
              playlist
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


function mapDispatchToProps(dispatch) {
  return {
    addNewListHandler() {
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


/*
 <PlayList
 scrollTo={this.state.scrollTo}
 playLists={this.props.playLists}
 addedNewList={this.props.addedNewList && this.props.playLists.length - 1}
 key={i}
 i={i}
 list={list}



 />*/
