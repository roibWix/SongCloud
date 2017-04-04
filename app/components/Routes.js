import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Signup from './Signup';
import Signin from './Signin';
import Root from './Root';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={Signin}/>
        <Route exact path="/signup" component={ Signup }/>
        <Route path="/" component={ Root }/>
      </Switch>
    </BrowserRouter>




  )
}





