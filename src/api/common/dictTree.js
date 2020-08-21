/*
 * @Author: madongzhe
 * @Date: 2020-08-18 10:46:14
<<<<<<< HEAD
 * @LastEditors: madongzhe
 * @LastEditTime: 2020-08-20 14:50:12
=======
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-21 13:36:39
>>>>>>> develop_lr
 * @Description: 
 */
import axios from '@/api/axios.config';

export function getDictTree(data) {
  return axios({
    url: '/admin/dict/tree',
    method: "get",
    params: data
  })
}

export function getOrgTree(data) {
  return axios({
    url: '/admin/org/tree',
    method: "get",
    params: data
  })
}
/**
 * @description: 获取课程归属下拉列表
 * @param {type} 
 * @return {type} 
 */
export function getCourseBelongData() {
  return axios({
    url: '/course/rest/v1/info/orgDept/downList',
    method: "get",
  })
}
/**
 * @description: 适用校区
 * @param id {int} 课程归属ID  
 * @return {type} 
 */
export function getCampusData(id) {
  return axios({
    url: '/course/rest/v1/info/campus/downList',
    method: "get",
    params: { id }
  })
}
/**
 * @description: 获取授课老师
 * @param {type} 
 * @return {type} 
 */
export function getTeacherData() {
  return axios({
    url: '/course/rest/v1/info/teacher/downList',
    method: "get",
  })
}
