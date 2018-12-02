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
            Last Shot
          </Link>
          <Link className={styles.link} to="/last-day">
            Last Day
          </Link>
          <Link className={styles.link} to="/last-week">
            Last Week
          </Link>
          <a className={styles.link} href="/images">
            Images
          </a>
          <a className={styles.link} href="/videos">
            Videos
          </a>
        </nav>
      </div>
    );
  }
}

export default App;
