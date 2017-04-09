import './topbar.scss'
import {NavLink, Link} from 'react-router-dom';
import React from 'react';

export default function Topbar(props) {
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
            <form>
            <button type="submit" value="submit" className="search-sign"></button>
            <input className="search" type="search" placeholder="SEARCH"/>
            <Link  to="/Signin" className="logout topnavli">Log out</Link>
            </form>
          </div>
        </ul>
      </nav>
    </header>

  )
}
