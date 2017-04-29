import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Signin from '../auth/Signin';
import Signup from '../auth/Signup';
import Root from '../root/Root';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
         {/*not done*/}
        <Route exact path="/signin" component={Signin}/>
         {/*not done*/}
        <Route exact path="/signup" component={Signup}/>
        <Route path="/" component={ Root }/>
      </Switch>
    </BrowserRouter>




  )
}





