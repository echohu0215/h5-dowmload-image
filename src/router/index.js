/*
 * @Author: huwanfei
 * @Date: 2023-05-12 09:21:23
 * @LastEditTime: 2023-07-07 10:55:21
 * @LastEditors: huwanfei
 * @Description:  
 * @FilePath: /h5-downloadImg/src/router/index.js
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: () => import('@/views/index'),
    meta: {
      title: '首页'
    }
  }
];

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export default router;
