import Layout from '@/layout';

export const research = {
    path: '/research',
    component: Layout,
    redirect: '/research/research_management',
    name: 'research',
    meta: {
        title: '教研',
        icon: 'jiaoyan.png',
        roles: ['admin', 'cm'],
        menu: 1,
        menuList: [{
            name: 'researchCourse',
            title: '课程',
            children: [{
                title: '课程管理',
                routeName: 'course_management'
            }]
        }]
    },
    children: [
        {
            path: 'course_management',
            component: () => import('@/views/research/research_course/course_management'),
            name: 'course_management',
            meta: {
                title: '课程管理',
                roles: ['admin', 'cm']
            }
        }
    ]
}