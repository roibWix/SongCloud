import Form from 'react-router-dom';

import './topbar.scss'
import {NavLink, Route, Link} from 'react-router-dom';
import React from 'react';

export default class Topbar extends React.Component {
  constructor(props) {
    super();
    this.onSubmit = this.onSubmit.bind(this);

  }


  componentDidMount() {
    // searchValue = this.search.value;


  }


  onSubmit(evt) {
    evt.preventDefault();

    console.info(this.search.value);
    return <Route path={this.search.value}/>

  }

  render() {
    let searchValue = this.search? this.search.value : undefined;
    return (

      <header className="top-bar">
        <nav className="topnav">
          <ul className="topnavul">
            <li className={"topnavli mylogo"}>
              <NavLink className={"logos"} to="/Explore">
                <i className="fa fa-mixcloud" aria-hidden="true"/>
                <span>SongCloud</span>
              </NavLink>
            </li>

            <li className={"topnavli"}><NavLink className={"topnavlink"} activeClassName="myselected" to="/Explore">Explore</NavLink>
            </li>
            <li className={"topnavli"}><NavLink className={"topnavlink"} activeClassName="myselected"
                                                to="/Playlists">Playlists</NavLink></li>

            <div className="searchintopnav">


              <form action={`/explore/${searchValue}`} method="POST">
                <button type="submit" value="submit" className="search-sign"></button>
                <input ref={(search) => this.search = search} className="search" type="search" placeholder="SEARCH"/>
                <Link to="/Signin" className="logout topnavli">Log out</Link>
              </form>
            </div>
          </ul>
        </nav>
      </header>

    )
  }
}
// onSubmit={this.onSubmit}
