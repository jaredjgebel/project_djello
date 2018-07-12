import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './src/redux/reducers'
import logger from 'redux-logger'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContainer from "./src/react/containers/AppContainer";

let store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)))

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);