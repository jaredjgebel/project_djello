import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { boards } from './src/redux/reducers'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContainer from './src/react/containers/AppContainer'

let store = createStore(boards,
  composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);