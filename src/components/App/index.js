//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';

class App extends Component<{}> {
  render(): Node {
    return (
      <div className={styles.container}>
        <div className={styles.content}>hello world</div>
      </div>
    );
  }
}

export default App;
