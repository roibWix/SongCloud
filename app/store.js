import {createStore} from 'redux'


const initialState = {
  currentTrack: {null},
};


let store = createStore(reduce, initialState);

function reduce(currentState, action) {
  if (action.type === 'updateCurrentTrack') {
    return Object.assign({}, currentState, {currentTrack: action.data})
  }

  return currentState;


  return {
    type: 'ADD_TODO'

  }
}

export default store;
