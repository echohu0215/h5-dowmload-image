/*
 * @Author: huwanfei
 * @Date: 2023-05-12 09:47:46
 * @LastEditTime: 2023-07-07 11:19:06
 * @LastEditors: huwanfei
 * @Description:  
 * @FilePath: /h5-downloadImg/src/utils/convertToImage.js
 */

import html2canvas from "html2canvas";

// 生成快照
export const convertToImage = (container, options = {}) => {
  // 设置放大倍数
  const scale = window.devicePixelRatio;

  // 传入节点原始宽高
  const _width = container.offsetWidth;
  const _height = container.offsetHeight;

  let { width, height } = options;
  width = width || _width;
  height = height || _height;

  // html2canvas配置项
  const ops = {
    scale,
    width,
    height,
    useCORS: true,
    allowTaint: false,
    ...options
  };
  
  return html2canvas(container, ops).then(canvas => {
    // 返回图片的二进制数据
    return new Promise(function(resolve) {
      canvas.toBlob(function(blob) {
        resolve(blob)
      })
    })
  });
}

// 下载图像
export const saveBlob = (blob, fileName) => {
  const a = document.createElement('a');
  a.style.display = 'none';
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
}
