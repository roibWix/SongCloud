import Explore from './Explore'
import Player from './Player'
import Playlists from './Playlists'
import Signin from './Signin'
import Signup from './Signup'
import Topbar from './Topbar'



export default function Root() {
  return (
    <div>
      {/*<Signup/>*/}
      {/*<Signin/>*/}


      <Topbar/>

      <Explore/>

      <Playlists/>
      <Player/>

    </div>
  );
};
