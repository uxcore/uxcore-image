import util from '../util';

export default function djangoAdapter(url, options) {
  let {
    width, height, multiple, type, adapterType,
  } = options;

  // 首先判断是否是django的cdn格式
  // todo: 这里的判断不够精准
  if (adapterType !== 'django' && url.indexOf('dl.django.t.taobao.com/rest/1.0/image') === -1 && url.indexOf('dl-daily.django.alibaba.net/rest/1.0/image') === -1) {
    return url;
  }

  // 如果django的图片是gif的，那么缩放有问题，这里先留个口
  if (type && type === 'gif') {
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

  // django的zoom拼接很灵活，服务端会自动处理能够返回的大小
  return util.urlSetParams(url, {
    zoom: `${width * multiple}x${height * multiple}`,
  });
}
