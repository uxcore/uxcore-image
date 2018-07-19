const sizeList = [16, 20, 24, 30, 32, 36, 40, 48, 50, 60, 64, 70, 72, 75, 80, 88, 90, 100, 110, 120, 125, 130, 140, 145, 150, 160, 170, 180, 190, 196, 200, 210, 220, 230, 234, 240, 250, 260, 270, 290, 300, 310, 312, 315, 320, 336, 350, 360, 375, 400, 430, 440, 460, 480, 500, 540, 560, 570, 580, 600, 640, 670, 720, 760, 800, 960, 1200, 1280, 2200];

export default function tfsAdapter(url, options) {
  let { width, height, multiple, adapterType } = options;

  // 首先判断是否是tfs的cdn格式
  // todo: 这里的判断不够精准
  if (adapterType !== 'tfs' && url.indexOf('.alicdn.com/tfs/') == -1) {
    return url;
  }

  // svg不缩放
  if (url.slice(-4) == '.svg') {
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

  // 如果原图片有缩放的写法，那么过滤掉
  const originalUrl = (url || '').split('_')[0];

  const size = Math.max(width, height) * multiple;
  let fixSize = null;

  for (let i = 0; i < sizeList.length; i++) {
    if (sizeList[i] > size) {
      fixSize = sizeList[i];
      break;
    }
  }

  if (!fixSize) {
    return url;
  }

  return `${originalUrl}_${fixSize}x${fixSize}.jpg`;

}
