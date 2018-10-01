//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import Header from 'components/Header';
import Movie from 'components/Movie';
import styles from './styles.css';

type Props = {};

class FullHistory extends Component<Props> {
  render(): Node {
    return (
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <Movie />
        </div>
      </div>
    );
  }
}

export default FullHistory;
