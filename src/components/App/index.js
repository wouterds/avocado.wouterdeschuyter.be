//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from 'config';
import styles from './styles.css';

class App extends Component<{}> {
  componentDidMount() {
    this.fetch();
  }

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

  fetch = async () => {
    const response = await axios.get(API_ENDPOINT);

    console.log({ response });
  };
}

export default App;
