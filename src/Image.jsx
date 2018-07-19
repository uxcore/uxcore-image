/**
 * Image Component for uxcore
 * @author eternalsky
 *
 * Copyright 2017-2018, Uxcore Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import adapter from './cdnAdapter';
// Lazyload Image


function handleImageSrc(props) {
  const { urlAdapter, adapterType, src, } = props;
  if (urlAdapter) {
    if (adapterType) {

    } else {

    }
  }

  return src;
}

class Image extends React.Component {
  static displayName = 'Image';

  static propTypes = {
    src: PropTypes.string,
    adapterType: PropTypes.string,
  };

  static defaultProps = {
    src: '',
    adapterType: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (props.src !== state.src) {
      return {
        renderSrc: handleImageSrc(props),
      }
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      renderSrc: handleImageSrc(props),
    };
  }

  render() {
    const { props } = this;

    return (
      <img className={classnames('uxcore-image', {
        [props.className]: true,
      })} src={props.src} />
    );
  }
}

Image.adapter = adapter;

polyfill(Image);

export default Image;
