import {NavLink} from 'react-router-dom';
import React from 'react';

export default function Topbar(props) {
  return (

    <header>
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
            <span className="search-sign"></span>
            <input className="search" type="search" placeholder="SEARCH"/>
            <button className="logout">Log out</button>
          </div>
        </ul>
      </nav>
    </header>

  )
}
