import React from 'react'

export default class SongsCreator extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
      <span>{this.props.data.title}</span>
        <img src={this.props.data.artwork_url}/>
      </div>
        )
  }

}


