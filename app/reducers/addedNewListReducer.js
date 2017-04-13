import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

export default function addedNewListReducer(addedNewList = false, action) {

  switch (action.type) {
    case 'ADDED-NEW-LIST':
      return action.addedNewList;
  }

  return addedNewList;
}
