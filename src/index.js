import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configreAPI} from './api.js';
import {Operation} from './reducer/data/data.js';
import reducer from './reducer/index.js';
import {getCityOffers, getOffers, getActiveOffers} from './reducer/data/selectors.js';

import App from './components/app/app.jsx';

const init = () => {
  const api = configreAPI((...args) => store.dispatch(...args));
  const store = createStore(
    reducer,
    compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
);

  store.dispatch(Operation.loadOffers())

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
  );
};

init();
