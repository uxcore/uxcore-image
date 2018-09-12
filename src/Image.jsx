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
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import adapter from './cdnAdapter';
// Lazyload Image


function handleImageSrc(props) {
  const {
    enableUrlAdapter, multiple, adapterType, src,
    width, height, type,
  } = props;

  const options = {
    multiple,
    type,
    adapterType,
    width,
    height,
  };

  if (enableUrlAdapter) {
    // 如果指定了适配器类型，那么直接使用
    if (adapterType) {
      return adapter[adapterType](src, options);
    }

    // 如果没有指定适配器类型，那么遍历所有适配器
    const adapterKeys = Object.keys(adapter);
    for (let i = 0; i < adapterKeys.length; i++) {
      const newUrl = adapter[adapterKeys[i]](src, options);

      if (newUrl !== src) {
        return newUrl;
      }
    }
  }

  return src;
}

class Image extends React.Component {
  static displayName = 'Image';

  static propTypes = {
    src: PropTypes.string,
    defaultSrc: PropTypes.string,
    adapterType: PropTypes.string,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    defaultPic: PropTypes.string,
    showDefaultPicDelay: PropTypes.number,
    enableUrlAdapter: PropTypes.bool,
  };

  static defaultProps = {
    src: '',
    defaultSrc: '',
    adapterType: '',
    className: '',
    prefixCls: 'uxcore-image',
    defaultPic: 'https://g.alicdn.com/uxcore/pic/default.svg',
    showDefaultPicDelay: 200,
    enableUrlAdapter: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      renderSrc: handleImageSrc(props),
      prevSrc: props.src,
      prevEnableUrlAdapter: props.enableUrlAdapter,
      prevAdapterType: props.adapterType,
      loaded: false,
      showDefault: false,
    };
  }

  componentDidMount() {
    const { showDefaultPicDelay } = this.props;
    this.loadListener = addEventListener(window, 'load', () => {
      setTimeout(() => {
        this.setState({
          loaded: true,
        });
      }, 0);
    });
    this.delayTimer = setTimeout(() => {
      this.setState({
        showDefault: true,
      });
    }, showDefaultPicDelay);
  }

  componentWillUnmount() {
    if (this.loadListener) {
      this.loadListener.remove();
    }
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.src !== state.prevSrc) {
      return {
        renderSrc: handleImageSrc(props),
        prevSrc: props.src,
      };
    }
    return null;
  }

  render() {
    const {
      className, prefixCls, defaultPic, style, width, height, ...others
    } = this.props;
    const { renderSrc, loaded, showDefault } = this.state;

    let imgSrc = defaultPic;
    if (loaded) {
      imgSrc = renderSrc;
    }
    const cls = classnames(prefixCls, {
      [className]: !!className,
    });

    return showDefault ? (
      <img
        {...others}
        alt=""
        className={cls}
        src={imgSrc}
        style={style}
        height={height}
        width={width}
      />
    ) : (
        <div
          {...others}
          className={cls}
          style={{
            display: 'inline-block',
            width,
            height,
            ...style,
          }}
        />
      );
  }
}

Image.adapter = adapter;

polyfill(Image);

export default Image;
