//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import cx from 'classnames';
import type { Image } from 'store/Images/types';
import Header from 'components/Header';
import PreLoader from 'components/PreLoader';
import wrapLastShot from './container';
import styles from './styles.css';

type Props = {
  image: Image,
};

type State = {
  isLoaded: boolean,
};

class LastShot extends Component<Props, State> {
  state: State = {
    isLoaded: false,
  };

  render(): Node {
    const { isLoaded } = this.state;
    const { image } = this.props;

    return (
      <div className={cx(styles.container, { [styles.loading]: !isLoaded })}>
        <Header />

        <div className={styles.content}>
          {!image && 'Loading..'}
          {image && (
            <>
              {!isLoaded && (
                <PreLoader
                  images={[image]}
                  onDone={() => this.setState({ isLoaded: true })}
                />
              )}

              {isLoaded && <img src={image.url} />}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default wrapLastShot(LastShot);
