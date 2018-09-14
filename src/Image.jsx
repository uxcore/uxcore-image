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

function getDPR() {
  if (typeof window !== 'undefined') { return window.devicePixelRatio || 1; }
  return 1;
}

function handleImageSrc(props) {
  const {
    enableUrlAdapter, adapterType, src,
    width, height, type,
  } = props;

  const options = {
    multiple: getDPR(),
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

const isDocumentLoaded = () => {
  if (typeof document !== 'undefined') {
    return document.readyState === 'complete';
  }
  return true;
};

class Image extends React.Component {
  static displayName = 'Image';

  static propTypes = {
    src: PropTypes.string,
    adapterType: PropTypes.string,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    defaultPic: PropTypes.string,
    showDefaultPicDelay: PropTypes.number,
    enableUrlAdapter: PropTypes.bool,
    style: PropTypes.object,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    lazyload: PropTypes.bool,
  };

  static defaultProps = {
    src: '',
    adapterType: '',
    className: '',
    prefixCls: 'uxcore-image',
    defaultPic: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='1000' height='1000' style=''%3E %3Crect width='100%25' height='100%25' x='0' y='0' fill='%23f2f3f5' stroke='none'/%3E %3C/svg%3E",
    showDefaultPicDelay: 200,
    enableUrlAdapter: true,
    style: {},
    height: undefined,
    width: undefined,
    lazyload: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      renderSrc: handleImageSrc(props),
      prevSrc: props.src,
      prevEnableUrlAdapter: props.enableUrlAdapter,
      prevAdapterType: props.adapterType,
      loaded: !props.lazyload || isDocumentLoaded(),
      showDefault: !props.lazyload,
    };
  }

  componentDidMount() {
    const { showDefaultPicDelay, lazyload } = this.props;
    if (lazyload) {
      if (!isDocumentLoaded()) {
        this.loadListener = addEventListener(window, 'load', () => {
          setTimeout(() => {
            this.setState({
              loaded: true,
            });
          }, 3000);
        });
      }

      this.delayTimer = setTimeout(() => {
        this.setState({
          showDefault: true,
        });
      }, showDefaultPicDelay);
    }
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

    Object.keys(Image.propTypes).forEach((key) => {
      delete others[key];
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
