//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import Pages from 'components/Pages';
import wrapImages from 'store/Images/container';
import styles from './styles.css';

type Props = {
  isLoading: boolean,
  hasError: boolean,
  history: History,
};

class App extends Component<Props> {
  render(): Node {
    const { history } = this.props;

    return (
      <div className={styles.container}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Pages.Landing} />
            <Route path="/last-shot" component={Pages.LastShot} />
            <Route path="/last-24-hours" component={Pages.Last24H} />
            <Route path="/full-history" component={Pages.FullHistory} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default wrapImages(App);
