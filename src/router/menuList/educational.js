/*
 * @Author: your name
 * @Date: 2020-08-06 16:06:44
 * @LastEditTime: 2020-08-18 11:10:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\router\menuList\educational.js
 */
import Layout from '@/layout';

export const educational = {
    path: '/edu',
    component: Layout,
    redirect: '/edu/teacher_management',
    name: 'edu',
    meta: {
        title: '教务',
        icon: 'jiaowu.png',
        roles: ['admin', 'tm'],
        menu: 1,
        menuList: [{
            name: 'teacherClass',
            title: '教师教室',
            children: [{
                title: '教师管理',
                routeName: 'teacher_management'
            },{
                title: '教室管理',
                routeName: 'classroom_management'
            },{
                title: '教室课表',
                routeName: 'classroom_schedule'
            },{
                title: '教师课表',
                routeName: 'teacher_schedule'
            },]
        }]
    },
    children: [
        {
            path: 'teacher_management',
            component: () => import('@/views/edu/edu_classroom/teacher_management'),
            name: 'teacher_management',
            meta: {
                title: '教师管理',
            }
        },
        {
            path: 'classroom_management',
            component: () => import('@/views/edu/edu_classroom/classroom_management'),
            name: 'classroom_management',
            meta: {
                title: '教室管理',
            }
        },
        {
            path: 'classroom_schedule',
            component: () => import('@/views/edu/edu_classroom/classroom_schedule'),
            name: 'classroom_schedule',
            meta: {
                title: '教室课表',
            }
        },
        {
            path: 'teacher_schedule',
            component: () => import('@/views/edu/edu_classroom/teacher_schedule'),
            name: 'teacher_schedule',
            meta: {
                title: '教师课表',
            }
        },
    ]
}