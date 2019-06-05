import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {compose} from "recompose";

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureAPI} from './api.js';
import {Operation} from './reducer/data/data.js';
import reducer from './reducer/index.js';

import App from './components/app/app.jsx';

const init = () => {
  const api = configureAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (b) => b)
  );

  store.dispatch(Operation.loadOffers());

  ReactDOM.render(
      <Provider store = { store } >
        <App />
      </Provider>, document.querySelector(`#root`));
};

init();
