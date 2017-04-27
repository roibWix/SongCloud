export default function playerModeReducer(currentPlayerMode = {playing:'false'}, action) {
  switch (action.type) {
    case 'IS-PLAYING':
      return action.mode;
  }

  return currentPlayerMode;


}


