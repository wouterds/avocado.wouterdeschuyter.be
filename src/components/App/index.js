//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import Header from 'components/Header';
import Preloader from 'components/Preloader';
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
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <p>
            Hi there 👋
            <br />
            Here I try to keep track of the growth and progress of my avocado
            plant, not much more to see!
          </p>
          <p>
            <a href="./images">Images</a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
