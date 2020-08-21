/*
 * @Author: madongzhe
 * @Date: 2020-08-20 09:00:04
 * @LastEditors: madongzhe
 * @LastEditTime: 2020-08-20 17:43:29
 * @Description: 新增课程
 */

 import { getDictTree, getTeacherData, getCourseBelongData, getCampusData } from '@/api/common/dictTree';

export default {
  namespaced: true,
  state: {
    teacher:[], // 授课老师
    classDept: [], // 课程归属
    campus: [], // 校区
    courseYear: [], // 课程年份
    courseQuarter: [], // 课程季度
    subject: [], // 科目
    grade: [], // 年级
    billingMethod: [], // 计费方式
  },
  mutations: {
    setTeacher(state,payload){
      state.teacher = payload
    },
    setClassDept(state,payload){
      state.classDept = payload
    },
    setCampus(state,payload){
     state.campus = payload
    },
    setCourseYear(state,payload){
      state.courseYear = payload
    },
    setCourseQuarter(state,payload){
      state.courseQuarter = payload
    },
    setSubject(state,payload){
      state.subject = payload
    },
    setGrade(state,payload){
      state.grade = payload
    },
    setBillingMethod(state,payload){
      state.billingMethod = payload
    }
  },
  actions: {
    // 授课老师
    getTeacher(context){
      return new Promise((resolve, reject) => {
        getTeacherData().then(res => {
          if (res.code === '200') {
            context.commit('setTeacher',res.data)
          }
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
    // 课程归属
    getClassDept(context) {
      return new Promise((resolve, reject) => {
        getCourseBelongData().then(res => {
          if (res.code === '200') {
            context.commit('setClassDept',res.data)
          }
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
    // 校区
    getCampus(context,id) {
      return new Promise((resolve, reject) => {
        getCampusData(id).then(res => {
          if (res.code === '200') {
            context.commit('setCampus',res.data)
          }
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
    // 课程年份
    getcourseYear(context) {
      return new Promise((resolve, reject) => {
        getDictTree({remark: '年份'}).then(res => {
          if (res.code === '200') {
            context.commit('setCourseYear',res.data)
          }
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    }, 
    // 课程季度
    getcourseQuarter(context) {
      return new Promise((resolve, reject) => {
        getDictTree({remark: '课程季度'}).then(res => {
          if (res.code === '200') {
            context.commit('setCourseQuarter',res.data)
          }
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    }, 
    // 科目
    getSubject(context) {
      return new Promise((resolve, reject) => {
        getDictTree({remark: '教学学科'}).then(res => {
          if (res.code === '200') {
            context.commit('setSubject',res.data)
          }
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    }, 
    // 年级
    getGrade(context) {
      return new Promise((resolve, reject) => {
        getDictTree({remark: '教学年级'}).then(res => {
          if (res.code === '200') {
            context.commit('setGrade',res.data)
          }
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    }, 
    // 计费方式
    getBillingMethod(context) {
      return new Promise((resolve, reject) => {
        getDictTree({remark: '计费方式'}).then(res => {
          if (res.code === '200') {
            context.commit('setBillingMethod',res.data)
          }
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
      })
    },
  }
}