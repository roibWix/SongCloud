import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Signup from '../auth/Signup';
import Signin from '../auth/Signin';
import Root from '../root/Root';

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





