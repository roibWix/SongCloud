import Form from 'react-router-dom';

import './topbar.scss'
import {NavLink, Route, Link} from 'react-router-dom';
import React from 'react';

export default class Topbar extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);

  }


  componentDidMount() {
  }

  onSubmit(evt) {
    evt.preventDefault();
    // input element value
    const searchValue = this.search.value;
    if (searchValue.length > 0) {
      this.props.history.push(`${searchValue}?search=true`);
    }
  }

  render() {
    return (

      <header className="top-bar">
        <nav className="topnav">
          <ul className="topnavul">
            <li className={"topnavli mylogo"}>
              <NavLink className={"logos"} to="/Explore">
                <i className="fa fa-mixcloud" />
                <span>SongCloud</span>
              </NavLink>
            </li>

            <li className={"topnavli"}><NavLink className={"topnavlink"} activeClassName="myselected" to="/Explore">Explore</NavLink>
            </li>
            <li className={"topnavli"}><NavLink className={"topnavlink"} activeClassName="myselected"
                                                to="/Playlists">Playlists</NavLink></li>

            <div className="searchintopnav">


              <form onSubmit={this.onSubmit}>
                <button type="submit" value="submit" className="search-sign"></button>
                <input ref={(search) => this.search = search}
                       className="search"
                       type="search"
                       placeholder="SEARCH"/>

                <Link to="/Signin" className="logout topnavli">Log out</Link>
              </form>
            </div>
          </ul>
        </nav>
      </header>

    )
  }
}

