import {createStore, combineReducers} from 'redux';
import currentTrackReducer from './reducers/current-Track';
import playListReducer from './reducers/playListsReducer';
import addedNewPlayListReducer from './reducers/addedNewListReducer';
import playerModeReducer from './reducers/playerModeReducer';

// let store = createStore(reduce, initialState);

const reducers = combineReducers({
  currentTrackReducer,
  playListReducer,
  addedNewPlayListReducer,
  playerModeReducer

});

const store = createStore(reducers);

export default store;
