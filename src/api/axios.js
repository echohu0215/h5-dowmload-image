import axios from "axios";
import Vue from "vue";
import qs from "qs";

const vm = new Vue();
axios.defaults.baseURL = process.env.VUE_APP_URL;

const api = axios.create({
  responseType: "json",
  timeout: 30000, // 超时时间
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  // If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: status => {
    return status >= 200 && status < 300;
  }
});

// 请求拦截
api.interceptors.request.use(
  config => {
    config.params = {
      ...config.params,
      parkTimestamp: new Date().getTime()
    }
    return config;
  },
  error => Promise.reject(error)
);
// 错误信息
export const errorFn = error => {
  switch (error.response.status) {
    case 400:
      vm.$toast("请求错误(400)");
      break;
    case 403:
      vm.$toast("拒绝访问(403)");
      break;
    case 404:
      vm.$toast("请求出错(404)");
      break;
    case 405:
      vm.$toast("请求方法不支持(405)");
      break;
    case 408:
      vm.$toast("请求超时(408)");
      break;
    case 500:
      vm.$toast("系统网络有点小延迟，请稍等~");
      break;
    case 501:
      vm.$toast("服务未实现(501)");
      break;
    case 502:
      vm.$toast("网络错误(502)");
      break;
    case 503:
      vm.$toast("服务不可用(503)");
      break;
    case 504:
      vm.$toast("网络超时(504)");
      break;
    case 505:
      vm.$toast("HTTP版本不受支持(505)");
      break;
    default:
      vm.$toast("连接出错");
      break;
  }
};
// 响应拦截
api.interceptors.response.use(
  (res = {}) => {
    const data = res.data;
    if (data.code === 200) {
      return Promise.resolve(data);
    } else {
      if (res.data.code === 10410) {
        // 链接失效,接口错误不提示信息
      } else {
        if (data.msg) {
          vm.$toast(data.msg);
        }
      }
      return Promise.reject(data);
    }
  },
  e => {
    if (e.response) {
      errorFn(e);
      return Promise.reject(e);
    } else {
      vm.$toast("系统错误");
    }
  }
);

const http = {};

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.get = function (url, params = null, responseType = 'json') {
  return new Promise((resolve, reject) => {
    api
      .get(url, {
        params: params,
        responseType: responseType,
        paramsSerializer: params => {
          return qs.stringify(params, {indices: false});
        }
      })
      .then(res => {
        if (res.data) {
          resolve(res.data);
        } else {
          resolve(res);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
};


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.post = function (url, data, responseType= 'json') {
  return new Promise((resolve, reject) => {
    api({
      url: url,
      method: "post",
      data: data,
      responseType: responseType
    })
      // .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.put = function (url, params, responseType= 'json') {
  return new Promise((resolve, reject) => {
    api({
      url: url,
      method: "put",
      data: params,
      responseType: responseType
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

/**
 * delete方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.delete = function (url, params) {
  return new Promise((resolve, reject) => {
    api({
      url: url,
      method: "delete",
      params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  })
}

/**
 * upload方法，对应upload请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
http.upload = function (url, data) {
  return new Promise((resolve, reject) => {
    const token = sessionStorage.getItem("upload_token") ? sessionStorage.getItem("upload_token") : "";
    api({
      url: url,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        uploadtoken: token
      },
      data: data
    })
      .then((res) => {
        if (res.code === 200) {
          resolve(res.data);
        } else {
          // 错误处理
          vm.$toast(res.msg);
        }
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};

export default http;
