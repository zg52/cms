/*
 * @Author: your name
 * @Date: 2020-08-13 14:28:30
 * @LastEditTime: 2020-08-21 13:38:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\api\edu\edu_classroom\teacher_management.js
 */
import axios from '@/api/axios.config';

/**
 * @description: 
 * @param {教师筛选项} 
 * @return {type} 
 */
export function getTeacherList(data) {
  return axios({
    // url: '/api/mock/list',
    url: '/admin/teacher/rest/v1/list',
    method: "post",
    data
  })
}

/**
 * @description: 
 * @param {orgCode, position(有值即可)} 
 * @return {type} 
 */
export function getStaffDropdown(data) {
  return axios({
    // url: '/api/mock/list',
    url: '/admin/teacher/rest/v1/staff/dropDown',
    method: "get",
    params: data
  })
}

/**
 * @description: 
 * @param teacherId
 * @return {type} 
 */
export function getTeacherDetail(teacherId) {
  return axios({
    // url: '/api/mock/list',
    url: `/admin/teacher/rest/v1/${teacherId}`,
    method: "get"
  })
}

/**
 * @description: 保存、新增教师。新增的时候需要根据员工id调取员工个人信息在保存
 * @param {type} 
 * @return {type} 
 */
export function saveTeacherData(data) {
  return axios({
    url: `/admin/teacher/rest/v1/save`,
    method: "post",
    data
  })
}

/**
 * @description: 获取员工详情
 * @param 员工id 
 * @return {type} 
 */
export function getStaffDetailData(employeeId) {
  return axios({
    url: `/admin/teacher/rest/v1/staff/${employeeId}`,
    method: "get"
  })
}

/**
 * @description: 
 * @param {type} 
 * @return {type} 
 */
export function deleteTeacher(data) {
  return axios({
    url: `/admin/teacher/rest/v1/deleteStatus`,
    method: "post",
    data
  })
}

/**
 * @description: 获取上传所需数据
 * @param {expireTime} 
 * @return {type} 
 */
export function getUpload(data) {
  return axios({
    url: `/admin/teacher/rest/v1/headImageParams`,
    method: "get",
    params: data
  })
}


