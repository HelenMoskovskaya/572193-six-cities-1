import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {compose} from "recompose";

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureAPI} from './api.js';
import reducer from './reducer/index.js';
import {BrowserRouter} from "react-router-dom";


import App from './components/app/app.jsx';

const init = () => {
  const api = configureAPI();
  const store = createStore(
      reducer,
      compose(applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (b) => b)
  );

  ReactDOM.render(
      <Provider store = {store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`));
};

init();
