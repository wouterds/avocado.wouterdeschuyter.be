//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import ImagesContext from 'context/Images';
import App from 'components/App';
import 'styles/core.css';

const boot = () => {
  const indexElement = document.getElementById('index');

  if (!indexElement) {
    return;
  }

  ReactDOM.render(
    <ImagesContext>
      <App />
    </ImagesContext>,
    indexElement,
  );
};

boot();
