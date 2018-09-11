import util from '../util';

export default function djangoAdapter(url, options) {
  let {
    width, height, multiple, adapterType,
  } = options;

  // 由于oss的url是可以任意配置的，所以这里必须强制指定
  if (adapterType !== 'oss') {
    return url;
  }

  // 自动宽高不缩放
  if (width === 'auto' || height === 'auto') {
    return url;
  }

  // 去掉px
  if (width.toString().slice(-2) === 'px') {
    width = width.toString().slice(0, -2);
  }

  if (height.toString().slice(-2) === 'px') {
    height = height.toString().slice(0, -2);
  }

  // 如果传入的width、height不是纯数字，即类似 "100%", "100em" 这种类型
  if (width != window.parseInt(width, 10) || height != window.parseInt(height, 10)) {
    return url;
  }

  // oss 裁剪最大支持4096
  width = Math.min(width * multiple, 4096);
  height = Math.min(height * multiple, 4096);

  // django的zoom拼接很灵活，服务端会自动处理能够返回的大小
  return util.urlSetParams(url, {
    'x-oss-process': `image/resize,w_${width},h_${height}`,
  });
}
