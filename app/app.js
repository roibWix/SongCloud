
import 'normalize.css/normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'font-awesome/css/font-awesome.css';
import './assets/styles/main.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import Routes from './components/routes/Routes'
require('smoothscroll-polyfill').polyfill();
import store from './store';
import Provider from "react-redux/src/components/Provider";

ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.querySelector('#root'));
/*
function renderApp() {



}
renderApp();
*/


