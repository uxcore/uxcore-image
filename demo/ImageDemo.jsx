/**
 * Image Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2017-2018, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import Image from '../src';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const tfsImage = 'https://img.alicdn.com/tfs/TB1ltSkD1GSBuNjSspbXXciipXa-300-300.jpg';
    const djangoImage = 'https://dl.django.t.taobao.com/rest/1.0/image?fileIds=IRj9SMzrT-mcifkVw_rEswAAACAAAQED&acl=43496dac05a29fe5043e2fa8283c455d&token=B1lIu_0jZUaOn3rFgnoq4wABUYAAAAFkrNL2pwAAACAAAQED&timestamp=1531982807064&zoom=1000x1000';
    const ossImage = 'https://alinw-oss.alicdn.com/alinw-node-admin-public-oss/2018-7-12/1531372852377/（阿里味儿首页）脱贫banner（280x180）.jpg?x-oss-process=image/resize,m_fixed,h_360,w_560';

    const options = {
      width: 70,
      height: 80,
      multiple: 2,
    };

    const ossOptions = {
      width: 70,
      height: 80,
      multiple: 2,
      adapterType: 'oss',
    };

    return (
      <div>

        <Image
          className=""
          src="https://img.alicdn.com/tfs/TB1ltSkD1GSBuNjSspbXXciipXa-300-300.jpg"
          alt=""
          title=""
          lazyLoad
          urlAdapter
          adapterType="tfs"
          multiple={2}
          width="100px"
          height="100px"
        />
        <img alt="" src={Image.adapter.tfs(tfsImage, options)} />
        {/* <img alt="" src={Image.adapter.django(djangoImage, options)} />
        <img alt="" src={Image.adapter.oss(ossImage, ossOptions)} /> */}
      </div>
    );
  }
}

export default Demo;
