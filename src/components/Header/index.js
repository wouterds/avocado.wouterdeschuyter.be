//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';

type Props = {};

class App extends Component<Props> {
  render(): Node {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Avocado Tracker</h1>
      </div>
    );
  }
}

export default App;
