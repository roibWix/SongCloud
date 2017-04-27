import './playlist.scss'
import React from 'react'
import SongsCreator from '../songcreator/SongCreator'
import {serverLocation} from '../../serverLocation';
import {connect} from 'react-redux';


class PlayListsCom extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 'title',
      value: ''

    };

    this.inputHandlerChange = this.inputHandlerChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteListHandler = this.deleteListHandler.bind(this);
  }

  componentDidMount() {
    let addedNewPlayList = this.props.addedNewList;
    if (addedNewPlayList === true) {
      this.setState({mode: 'input'});
    }
    this.setState({value: this.props.list.listTitle});
  }

  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
    if ((this.state.mode === 'title') && (this.props.list.listid === this.props.scrollTo)) {
      this.playList.scrollIntoView({block: "start", behavior: "smooth"})
    }
  }

  inputHandlerChange(event) {
    this.setState({value: event.target.value});
  }

  toggleInputModeHandler() {
    this.setState({mode: 'input'});
  }

  submitHandler(event) {
    event.preventDefault();
    let indexOfList = this.props.i;
    let newTitleName = this.state.value;
    if (this.state.value.length === 0) {
      newTitleName = 'Untitled';
    }
    this.SubmitXHRToServer(indexOfList, newTitleName);
    this.setState({mode: 'title'});
  }

  SubmitXHRToServer(indexOfList, newTitleValue) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${serverLocation}/ChangeTitleName`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", () =>
      this.props.SubmitHandlerToStore(indexOfList, newTitleValue)
    );
    xhr.addEventListener("error", () => {console.info('error')});

    let data = {
      indexOfList: indexOfList,
      newTitleValue: newTitleValue
    };
    xhr.send(JSON.stringify(data));
  }


  deleteListHandler(list, indexOfList) {

    const data = {indexOfList};
    let title = list.listTitle;
    const isSure = confirm(`Deleting ${title} playlist. Are you sure?`);
    if (isSure === true) {
      this.deleteListFromServer(data);
      this.props.deleteListFromStore(indexOfList);
    }
  }

  deleteListFromServer(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${serverLocation}/DeleteList`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", () => {});
    xhr.addEventListener("error", () => {console.info('error')});
    xhr.send(JSON.stringify(data));
  }

  listOfSongs() {

    if (this.props.list.songs.length === 0) {
      return <li key={this} className="empty-list">Add some songs to this playlist.</li>
    }

    return this.props.list.songs.map((song, i) => {
      return <li key={song.id} className="song-card"><SongsCreator
        from={'Playlists'}
        list={this.props.list}
        data={song}/>
      </li>
    })
  }

  render() {
    return (

      <ul className="playlist">
        <li>
          <form onSubmit={this.submitHandler}>
            <div className="form-container">
              {(this.state.mode === 'title') &&
              <label className="playlist-title" onClick={() => this.toggleInputModeHandler()}>
                {this.props.list.listTitle}
                <div className="songs-counter-in-playlist-bg">
                  <span className="songs-counter-in-playlist"> {this.props.list.songs.length}</span>
                </div>
              </label>}
              <button className="delete-btn" type="button"
                      onClick={() => this.deleteListHandler(this.props.list, this.props.i)}>Delete
              </button>
            </div>
            {(this.state.mode === 'input') &&
            <input type="text" value={this.state.value} onChange={this.inputHandlerChange} className="playlist-title"
                   ref={(evt) => this.input = evt} onBlur={this.submitHandler}/>}

          </form>
        </li>
        <li ref={(evt) => this.playList = evt} className="scroll-to"/>
        <li>
          <ul className="list-of-songs">
            {this.listOfSongs()}
          </ul>
        </li>

      </ul>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {

    SubmitHandlerToStore(index, newTitleName) {
      dispatch({type: 'UPDATE-LIST', index: index, newTitleName: newTitleName});
      dispatch({type: 'ADDED-NEW-LIST', addedNewList: false});
    },

    deleteListFromStore(index) {
      dispatch({type: 'DELETE-LIST', index: index});

    }
  }
}

function mapStateToProps(stateData) {
  return {
    playLists: stateData.playListReducer,
    addedNewList: stateData.addedNewPlayListReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayListsCom)
