//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import Preloader from 'components/Preloader';
import Pages from 'components/Pages';
import wrapImages from 'store/Images/container';
import styles from './styles.css';

type Props = {
  isLoading: boolean,
  hasError: boolean,
  history: History,
};

type State = {
  isLoaded: boolean,
};

class App extends Component<Props, State> {
  state: State = {
    isLoaded: false,
  };

  render(): Node {
    const { history } = this.props;
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <div className={styles.loadingContainer}>
          <Preloader onDone={() => this.setState({ isLoaded: true })} />
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Pages.Landing} />
            <Route path="/last-shot" component={Pages.LastShot} />
            <Route path="/last-day" component={Pages.LastDay} />
            <Route path="/full-history" component={Pages.FullHistory} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default wrapImages(App);
