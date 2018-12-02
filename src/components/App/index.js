//@flow
import React from 'react';
import type { Node } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Pages from 'components/Pages';
import withContainer from './container';
import styles from './styles.css';

const App = (): Node => (
  <div className={styles.container}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Pages.Landing} />
        <Route path="/last-shot" component={Pages.LastShot} />
        <Route path="/last-day" component={Pages.LastDay} />
        <Route path="/last-week" component={Pages.LastWeek} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default withContainer(App);
