//@flow
import React from 'react';
import type { Node } from 'react';
import Header from 'components/Header';
import styles from './styles.css';

type Props = {
  children?: Node,
};

const BasePage = (props: Props): Node => {
  const { children } = props;

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default BasePage;
