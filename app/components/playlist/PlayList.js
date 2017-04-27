import './playlist.scss'
import React from 'react'
import SongsCreator from '../songcreator/SongCreator'
import {connect} from 'react-redux';


class PlayListsCom extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 'title',
      value: ''

    };

    this.inputHandlerChange = this.inputHandlerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteListHandler = this.deleteListHandler.bind(this);
  }

  componentDidMount() {
    let storeDataAddedNewPlayList = this.props.addedNewList;
    if (storeDataAddedNewPlayList === true) {
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

  handleSubmit(event) {
    event.preventDefault();

    let indexOfList = this.props.i;

    this.SubmitXHRToServer(indexOfList, this.state.value);
    this.props.SubmitHandlerToStore(indexOfList, this.state.value);
    this.setState({mode: 'title'});
  }

  SubmitXHRToServer(indexOfList, newTitleValue) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3000/ChangeTitleName');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", () =>
      console.info('done')
    );
    let data = {
      indexOfList: indexOfList,
      newTitleValue: newTitleValue
    };
    xhr.send(JSON.stringify(data));
  }


  deleteListHandler(List, indexOfList) {

    const data = {indexOfList};
    let title = List.listTitle;
    const isSure = confirm(`Deleting ${title} playlist. Are you sure?`);
    if (isSure === true) {
      this.deleteListFromServer(data);
      this.props.deleteListFromStore(indexOfList)
    }
  }

  deleteListFromServer(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3000/DeleteList');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", () => {
    });
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
          <form onSubmit={this.handleSubmit}>
            <div className="form-container">
              {(this.state.mode === 'title') &&
              <label className="playlist-title" onClick={() => this.toggleInputModeHandler()}>
                {this.props.list.listTitle}
                <div className="counter-bg">
                  <span className="counter"> {this.props.list.songs.length}</span>
                </div>
              </label>}
              <button className="delete-btn" type="button"
                      onClick={() => this.deleteListHandler(this.props.list, this.props.i)}>Delete
              </button>
            </div>
            {(this.state.mode === 'input') &&
            <input type="text" value={this.state.value} onChange={this.inputHandlerChange} className="playlist-title"
                   ref={(evt) => this.input = evt} onBlur={this.handleSubmit}/>}

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
