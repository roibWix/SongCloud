import './playlist.scss'
import React from 'react'
import SongsCreator from '../songcreator/SongCreator'

export default class PlayListsCom extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isTitleMode: true,
      mode: 'input',
      value: '',
      isThisTheFirstTime: true

    };
    this.list = props.list;
    this.i = props.i;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({value: this.list.listTitle});
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.input) {
        this.input.focus();
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

  temp() {

    let title = this.list.listTitle;
    confirm(`Deleting ${title} playlist. Are you sure?`);
    this.props.deleteList(this.props.i);

  }

  tempp() {
    if (this.state.isThisTheFirstTime === true) {
      this.setState({isThisTheFirstTime: !this.state.isThisTheFirstTime});
    }
    this.setState({mode: 'input'});
  }

  render() {
    return (
      <ul className="playlist" ref={(evt) => this.lastList = evt}>

        <form onSubmit={this.handleSubmit}>
          <div className="for-hover">
            {(this.state.mode === 'title') &&
            <label className="playlist-title" onClick={() => this.toggleHandler()} ref={(evt) => this.Label = evt}>
              {this.list.listTitle}


            </label>}
            <button className="delete-btn" type="button" onClick={() => this.temp()}>Delete</button>
          </div>
          {(this.state.mode === 'input') &&
          <input type="text" value={this.state.value} onChange={this.handleChange} className="playlist-title"
            ref={(evt) => this.input = evt}  onBlur={this.handleSubmit}/>}

        </form>


        {this.list.songs.map((song, i) => {

          return <li key={song.id} className="song-card"><SongsCreator
            from={'Playlists'}
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
 onChange={this.temp}/>*/
}
{/*     <form onSubmit={this.handleSubmit.bind(this)}>


 <label className={titleContainerClassName} key={this.i}
 onClick={(event) => this.handler(event)}>{this.list.listTitle}>
 name:</label>
 <input type="text" name="name" className={titleContainerClassName} value={this.state.listTitle}
 ref={(evt) => this.Elm = evt}
 onChange={this.temp}
 onBlur={ () => this.inputEditMode() }/>

 <input className="submit" type="submit" value="submit"/>

 </form>*/
}
// (evt) => this.Label = evt
