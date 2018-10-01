//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Preloader from 'components/Preloader';
import Pages from 'components/Pages';
import styles from './styles.css';

type Props = {};

type State = {
  isLoaded: boolean,
};

class App extends Component<Props, State> {
  state: State = {
    isLoaded: false,
  };

  render(): Node {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <div className={styles.loadingContainer}>
          <Preloader onDone={() => this.setState({ isLoaded: true })} />
        </div>
      );
    }

    return (
      <Router history={createHistory()}>
        <Switch>
          <Route exact path="/" component={Pages.Landing} />
          <Route path="/last-shot" component={Pages.LastShot} />
          <Route path="/last-day" component={Pages.LastDay} />
          <Route path="/full-history" component={Pages.FullHistory} />
        </Switch>
      </Router>
    );
  }
}

export default App;
