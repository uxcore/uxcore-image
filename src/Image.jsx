/**
 * Image Component for uxcore
 * @author eternalsky
 *
 * Copyright 2017-2018, Uxcore Team, Alinw.
 * All rights reserved.
 */
import React from 'react';

// Lazyload Image

class Image extends React.Component {
  static displayName = 'Image';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        uxcore-image component
      </div>
    );
  }
}

export default Image;
