//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import Header from 'components/Header';
import styles from './styles.css';

type Props = {};

class LastDay extends Component<Props> {
  render(): Node {
    return (
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <p>LastDay</p>
        </div>
      </div>
    );
  }
}

export default LastDay;
