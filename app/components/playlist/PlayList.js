import './playlist.scss'
import React from 'react'
import SongsCreator from '../songcreator/SongCreator'

export default class PlayListsCom extends React.Component {
  constructor(props) {
    super();
    this.state = {
      mode: 'title',
      value: ''

    };
    this.list = props.list;
    this.i = props.i;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    if (this.props.addedNewList) {
      this.setState({mode:'input'});
    }
    this.setState({value: this.list.listTitle});
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.input) {

        // this.input.scrollIntoView({block: "start", behavior: "smooth"})
        this.input.focus();
      }
      if (this.list.listTitle === this.props.scrollTo) {
        this.playList.scrollIntoView({block: "start", behavior: "smooth"})
      }

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.updateList(this.list, this.i, this.state.value);
    this.setState({mode: 'title'});
    event.preventDefault();
  }

  toggleHandler() {
    this.setState({mode: 'input'});

  }

  deleteListHandler() {
    console.info('here', this.props);
    let title = this.list.listTitle;
    confirm(`Deleting ${title} playlist. Are you sure?`);
    this.props.deleteList(this.i);

  }



  render() {
    return (
      <ul ref={(evt) => this.playList = evt} className="playlist">

        <form onSubmit={this.handleSubmit}>
          <div className="for-hover">
            {(this.state.mode === 'title') &&
            <label className="playlist-title" onClick={() => this.toggleHandler()} ref={(evt) => this.Label = evt}>
              {this.list.listTitle}


            </label>}
            <button className="delete-btn" type="button" onClick={() => this.deleteListHandler()}>Delete</button>
          </div>
          {(this.state.mode === 'input') &&
          <input type="text" value={this.state.value} onChange={this.handleChange} className="playlist-title"
            ref={(evt) => this.input = evt}  onBlur={this.handleSubmit}/>}

        </form>


        {this.list.songs.map((song, i) => {

          return <li key={song.id} className="song-card"><SongsCreator
            from={'Playlists'}
            list={this.props.list}
            data={song}
            updateCurrentTrack={this.props.updateCurrentTrack}
            playLists={this.props.playLists}/>
          </li>
        })}
      </ul>
    )
  }
}
{/*<div onClick={() => this.editNameModeHandler()} className={titleContainerClassName}>    </div>*/
}
{/* <h2 className={titleContainerClassName} key={this.i}
 onClick={(event) => this.handler(event)}>{this.list.listTitle}</h2>
 <input type="text" className={titleContainerClassName} value={this.list.listTitle} ref={(evt) => this.Elm = evt}
 onChange={this.deleteList}/>*/
}
{/*     <form onSubmit={this.handleSubmit.bind(this)}>


 <label className={titleContainerClassName} key={this.i}
 onClick={(event) => this.handler(event)}>{this.list.listTitle}>
 name:</label>
 <input type="text" name="name" className={titleContainerClassName} value={this.state.listTitle}
 ref={(evt) => this.Elm = evt}
 onChange={this.deleteList}
 onBlur={ () => this.inputEditMode() }/>

 <input className="submit" type="submit" value="submit"/>

 </form>*/
}
// (evt) => this.Label = evt
