import './playlist.scss'
import React from 'react'
import SongsCreator from '../songcreator/SongCreator'
// import store from '../../store';
import {connect} from 'react-redux';


class PlayListsCom extends React.Component {
  constructor(props) {
    super();
    this.state = {
      mode: 'title',
      value: ''

    };
    // this.list = props.list;
    // this.i = props.i;

    this.handleChange = this.handleChange.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    if (this.input) {
      this.input.focus();

    }
    if ((this.state.mode === 'title') && (this.props.list.listid === this.props.scrollTo)) {
      this.playList.scrollIntoView({block: "start", behavior: "smooth"})

    }


  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  toggleHandler() {
    this.setState({mode: 'input'});
  }


  handleSubmit(event) {
    event.preventDefault();
    this.SubmitXHRToServer(this.props.i, this.state.value);


    this.props.SubmitHandlerToStore(this.props.i, this.state.value);
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
    xhr.addEventListener("load", () =>
      console.info('done')
    );
    xhr.send(JSON.stringify(data));
  }

  render() {
    return (

      <ul className="playlist">
        <li>
          <form onSubmit={this.handleSubmit}>
            <div className="for-hover">
              {(this.state.mode === 'title') &&
              <label className="playlist-title" onClick={() => this.toggleHandler()} ref={(evt) => this.Label = evt}>
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
            <input type="text" value={this.state.value} onChange={this.handleChange} className="playlist-title"
                   ref={(evt) => this.input = evt} onBlur={this.handleSubmit}/>}

          </form>
        </li>
        <li ref={(evt) => this.playList = evt} className="scroll-to"/>

        {this.props.list.songs.map((song, i) => {
          return <li key={song.id} className="song-card"><SongsCreator
            from={'Playlists'}
            list={this.props.list}
            data={song}/>
          </li>
        })}
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
