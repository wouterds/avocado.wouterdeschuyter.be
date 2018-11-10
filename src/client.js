//@flow
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from 'app';

(() => {
  const index = document.getElementById('index');

  if (!index) {
    throw new Error('Could not find index element!');
  }

  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    index,
  );
})();
