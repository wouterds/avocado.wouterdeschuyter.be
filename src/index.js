//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import 'styles/core.css';

const boot = () => {
  const indexElement = document.getElementById('index');

  if (!indexElement) {
    return;
  }

  ReactDOM.render(<App />, indexElement);
};

boot();
