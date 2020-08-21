/*
 * @Author: your name
 * @Date: 2020-08-13 11:08:04
 * @LastEditTime: 2020-08-18 15:47:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\api\axios.config.js
 */
import axios from "axios";
import { MessageBox, Message } from 'element-ui'
import querystring from "querystring";
import store from '@/store'
import { getToken } from '@/utils/auth'
import { __INTERFACEURL__ } from '@/assets/js/constants'

// axios 实例
const INSTANCE = axios.create({
  baseURL: __INTERFACEURL__,
  timeout: 1000 * 12,
  transformRequest: [
    function (data) {
      // return querystring.stringify(data);
      return JSON.stringify(data);
    }
  ]
});

// post 请求头设置
INSTANCE.defaults.headers.post["Content-Type"] =
  "application/json";

// 添加请求拦截器
INSTANCE.interceptors.request.use(
  config => {
    config.headers["token"] = getToken();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
INSTANCE.interceptors.response.use(
  response => {
    return response.status === 200 ?
      Promise.resolve(response.data) :
      Promise.reject(response);
  },
  error => {
    console.log(error);
    const {
      response
    } = error;
    if (response) {
      errHandler(response.status, response.data);
      // if (next) {
      //   Message({
      //     message: response.data || 'Error',
      //     type: 'error',
      //     duration: 5 * 1000
      //   })
      // }
      return Promise.reject(error);
    } else {
      // 断网情况
      Message({
        message: '网络错误',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
);

// 错误处理
function errHandler(status, message) {
  switch (status) {
    case 404:
      Message({
        message: '404为找到相关内容:' + message.message || message,
        type: 'error',
        duration: 5 * 1000
      })
      break;
    default:
      return message;
  }
}

export default INSTANCE;