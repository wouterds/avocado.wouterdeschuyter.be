//@flow
import React, { Component } from 'react';
import type { Node } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from 'config';
import styles from './styles.css';

type Props = {};

type Image = {
  filename: string,
  time: Date,
  size: number,
};

type State = {
  images: Array<Image>,
};

const Images = (props: { images: Array<Image> }): Node => {
  const { images } = props;

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.images}>
      {images.map((image: Image, index: number) => (
        <img key={`image-${index}`} src={`https://avocado.wouterdeschuyter.be/images/${image.filename}`} />
      ))}
    </div>
  );
};

class App extends Component<Props, State> {
  state: State = {
    images: [],
  };

  componentDidMount() {
    this.fetch();
  }

  render(): Node {
    const { images } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Avocado Tracker</h1>

          <p>
            Hi there 👋
            <br />
            Here I try to keep track of the growth and progress of my avocado plant, not much more to see!
          </p>

          <Images images={images} />
        </div>
      </div>
    );
  }

  fetch = async () => {
    const response = await axios.get(API_ENDPOINT);

    const images: Array<Image> = response.data.map(data => {
      const { name, size } = data;

      const year = name.substr(0, 4);
      const month = name.substr(4, 2);
      const day = name.substr(6, 2);
      const hour = name.substr(8, 2);
      const minute = name.substr(10, 2);
      const time = new Date(`${year}-${month}-${day} ${hour}:${minute} UTC`);

      return { filename: name, size, time };
    });

    this.setState({ images });
  };
}

export default App;
