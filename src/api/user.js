/*
 * @Author: your name
 * @Date: 2020-08-06 08:57:55
 * @LastEditTime: 2020-08-21 10:14:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\api\user.js
 */
import axios from './axios.config';
import md5 from 'md5';

export function login(data) {
  console.log(data);
  return axios({
    // url: '/static/demo/user.json',
    url: '/admin/system/rest/v1/login',
    method: "post",
    data: {
      loginName: data.loginName,
      password: md5(data.password)
    }
  })
}

export function getUserInfo() {
  return axios({
    url: '/admin/system/rest/v1/getUserInfo',
    method: "get",
    data: {}
  })
}

export function getMenuTreeList(data) {
  // 获取菜单权限树
  return axios({
    // url: '/api/mock/menuTreeList',
    url: '/admin/system/rest/v1/listMenuTreeByUserId',
    method: "get",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    params: data
  })
}
