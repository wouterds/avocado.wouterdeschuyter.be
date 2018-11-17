//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import store from 'store';
import App from 'components/App';
import 'styles/core.css';

const boot = () => {
  const indexElement = document.getElementById('index');

  if (!indexElement) {
    return;
  }

  ReactDOM.render(
    <Provider store={store}>
      <App history={createHistory()} />
    </Provider>,
    indexElement,
  );
};

boot();
