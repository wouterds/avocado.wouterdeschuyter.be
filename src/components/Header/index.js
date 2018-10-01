//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

type Props = {};

class App extends Component<Props> {
  render(): Node {
    return (
      <div className={styles.container}>
        <Link className={styles.title} to="/">
          <h1>Avocado Tracker</h1>
        </Link>
        <nav className={styles.nav}>
          <Link className={styles.link} to="/last-shot">
            Last shot
          </Link>
          <Link className={styles.link} to="/last-day">
            Last day
          </Link>
          <Link className={styles.link} to="/full-history">
            Full history
          </Link>
          <a className={styles.link} href="/images">
            Raw
          </a>
        </nav>
      </div>
    );
  }
}

export default App;
