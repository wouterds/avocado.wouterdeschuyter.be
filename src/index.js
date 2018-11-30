//@flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import App from 'components/App';
import 'styles/core.css';

(() => {
  const index = document.getElementById('index');

  if (!index) {
    return;
  }

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    index,
  );
})();
