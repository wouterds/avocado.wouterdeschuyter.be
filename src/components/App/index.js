//@flow
import React from 'react';
import type { Node } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Pages from 'components/Pages';
import styles from './styles.css';

const App = (): Node => (
  <div className={styles.container}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Pages.Landing} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
