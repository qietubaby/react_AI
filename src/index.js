import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore, { history } from './reduxes/configureStore'

const store = configureStore()

ReactDOM.render(
 <Provider store={store}>
  <ConnectedRouter history={history}>

   <Route path="/" component={App}></Route>


  </ConnectedRouter>

 </Provider>,
 document.getElementById('root'));
