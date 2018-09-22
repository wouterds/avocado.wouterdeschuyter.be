// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import axios from 'axios';
import type { Images } from 'types/Image';
import { API_ENDPOINT } from 'config';

type Props = {
  children: Node,
};

type State = {
  images: Images,
};

export const Context = React.createContext();

class ImagesContext extends Component<Props, State> {
  state: State = {
    images: [],
  };

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { images } = this.state;

    return (
      <Context.Provider value={images}>{this.props.children}</Context.Provider>
    );
  }

  fetch = async () => {
    const response = await axios.get(API_ENDPOINT);

    const images: Images = response.data.map(data => {
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

export default ImagesContext;
