export default function Topbar() {
  return (
  <header>
    <nav className="topnav">
      <a href="#">logo</a>
      <a href="#">Explore</a>
      <a href="#">Playlists</a>
      <div className="searchintopnav">
      <input className="search" type="text"></input>
      <button className="logout">Log out</button>
      </div>
    </nav>
  </header>
  )
}
