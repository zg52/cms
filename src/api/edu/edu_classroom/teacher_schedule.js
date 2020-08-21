/*
 * @Author: your name
 * @Date: 2020-08-20 13:43:20
 * @LastEditTime: 2020-08-21 12:41:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\api\edu\edu_classroom\teacher_schedule.js
 */
import axios from '@/api/axios.config';

/**
 * @description: 
 * @param {获取双师教师课表} 
 * @return {type} 
 */
export function getScheduleList(data) {
  return axios({
    url: '/doubleteacher/teacher/rest/v1/class/period/list',
    method: "get",
    params: data
  })
}

/**
 * @description: 获取时间戳
 * @param {type} 
 * @return {type} 
 */
export function getSystemTime(data) {
  return axios({
    url: '/doubleteacher/teacher/rest/v1/class/period/sysTime',
    method: "get",
    data
  })
}
