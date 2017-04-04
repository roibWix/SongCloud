import React from 'react'
export default class Playlists extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // this.listBuilder()
  }

  listBuilder() {
    // console.info(this.props.data);


  return  this.props.data.map((list,i) => {
      console.info(list);
      return <li key={i}>{list.listTitle}</li>;
    })
  }


  render() {

    return (

      <div className="playlist-container">
        <div className="playlist-bar">

          <div className="playlist-bar-top">
            <button className="pagenumberbtn add-list-btn">Add new playlist</button>
          </div>
          <div className="playlist-bar-separator"/>


          <div className="playlist-bar-bottom">
            <ul>
              {this.listBuilder()}
            </ul>
          </div>
        </div>
        <div className="playlists">favorite songs</div>
      </div>
    )
  }
}
