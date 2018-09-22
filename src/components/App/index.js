//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import Header from 'components/Header';
import ImageList from 'components/ImageList';
import styles from './styles.css';

type Props = {};

class App extends Component<Props> {
  render(): Node {
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

          <ImageList />
        </div>
      </div>
    );
  }
}

export default App;
