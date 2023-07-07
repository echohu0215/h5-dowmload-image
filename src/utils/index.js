
/**
 * 下载文件
 * @param {*} url base64数据
 * @param {*} fileName 文件名称
 */
export function download(url, fileName) {
  var link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  link.click();
}

/**
 * 判断访问终端
 */
export const browser = {
  versions: (function () {
    const u = navigator.userAgent;
    return {
      trident: u.indexOf("Trident") > -1, //IE内核
      presto: u.indexOf("Presto") > -1, //opera内核
      webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
      iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf("iPad") > -1, //是否iPad
      webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf("MicroMessenger") > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq", //是否QQ
    };
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
};

/**
 * 截取url中的参数
 */
export function getLinkParams(name) {
  if(!name) return ''
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const params = window.location.href.split('?')[1]
  
  if(!params) return ''

  var r = params.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
