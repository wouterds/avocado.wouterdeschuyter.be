//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import Header from 'components/Header';
import styles from './styles.css';

type Props = {};

class Landing extends Component<Props> {
  render(): Node {
    return (
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <p>
            Hi there 👋
            <br />
            Here I try to keep track of the growth and progress of my avocado
            plant, not much else to see!
          </p>
          <p>
            <a href="./images">Images</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Landing;
