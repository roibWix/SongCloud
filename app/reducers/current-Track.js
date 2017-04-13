import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

export default function currentTrackReducer(currentTrack = {}, action) {

  switch (action.type) {
    case 'UPDATE_CURRENT_TRACK':
      return action.currentTrack;
  }

  return currentTrack;
}





