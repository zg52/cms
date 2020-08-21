/*
 * @Author: madongzhe
 * @Date: 2020-08-19 08:19:44
 * @LastEditors: madongzhe
 * @LastEditTime: 2020-08-21 08:17:52
 * @Description: 
 */
import axios from '@/api/axios.config';
/**
 * @description: 课程管理列表查询
 * @param {type} 
 * @return {type} 
 */
export function getCourseListData(data) {
  return axios({
    url: '/course/rest/v1/list',
    method: "post",
    data
  })
}
/**
 * @description: 保存课程信息
 * @param {type} 
 * @return {type} 
 */
export function getCourseListSave(data) {
  return axios({
    url: '/course/rest/v1/save',
    method: "post",
    data
  })
}
/**
 * @description: 删除课程
 * @param {type} 
 * @return {type} 
 */
export function getDeleteCourse(id) {
  return axios({
    url: '/course/rest/v1/info/delete/' + id,
    method: "get",
  })
}
/**
 * @description: 获取课程详情
 * @param {type} 
 * @return {type} 
 */
export function getCourseInfo(id) {
  return axios({
    url: '/course/rest/v1/info/' + id,
    method: "get",
  })
}
