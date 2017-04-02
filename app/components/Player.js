import  React from "react";
export default class Player extends React.Component{
  constructor(props) {
    super();
  }

componentDidMount() {
  console.info(this);

}

  render() {

  return (
    <footer className="Player">
      <a href="#">Song thumbnail</a>
      <audio className="playerElm" controls>
        <source src="https://api.soundcloud.com/tracks/79973942/stream?client_id=e582b63d83a5fb2997d1dbf2f62705da" type="audio/ogg"/>
      </audio>
      {/*<span>Song name</span>*/}
      {/*<span>Audio player</span>*/}
    </footer>
  )
}
}

