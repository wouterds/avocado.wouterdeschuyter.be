//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './styles.css';

class App extends Component<{}> {
  render(): Node {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Avocado Tracker</h1>

          <p>
            Hi there 👋
            <br />
            Here I try to keep track of the growth and progress of my avocado plant, not much more to see!
          </p>
        </div>
      </div>
    );
  }
}

export default App;
