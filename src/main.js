/*
 * @Author: huwanfei
 * @Date: 2023-05-12 09:21:23
 * @LastEditTime: 2023-07-07 10:24:55
 * @LastEditors: huwanfei
 * @Description:  
 * @FilePath: /h5-downloadImg/src/main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import fastclick from "fastclick";

import 'lib-flexible';

// 引入全部样式
import 'vant/lib/index.less';

import './app.js'

// 移动端适配
fastclick.attach(document.body);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
