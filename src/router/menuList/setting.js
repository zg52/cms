import Layout from '@/layout';

export const setting = {
    path: '/setting',
    component: Layout,
    redirect: '/setting/account_management',
    name: 'setting',
    meta: {
        title: '配置',
        icon: 'peizhi.png',
        roles: ['admin'],
        menu: 1,
        menuList: [{
            name: 'settingAccount',
            title: '账号管理',
            children: [{
                title: '用户管理',
                routeName: 'account_management'
            },{
                title: '角色管理',
                routeName: 'role_management'
            },{
                title: '资源管理',
                routeName: 'resource_management'
            }]
        }]
    },
    children: [
        {
            path: 'account_management',
            component: () => import('@/views/setting/setting_account/account_management'),
            name: 'account_management',
            meta: {
                title: '用户管理',
                roles: ['admin','tm']
            }
        },
        {
            path: 'role_management',
            component: () => import('@/views/setting/setting_account/role_management'),
            name: 'role_management',
            meta: {
                title: '角色管理',
                roles: ['admin']
            }
        },
        {
            path: 'resource_management',
            component: () => import('@/views/setting/setting_account/resource_management'),
            name: 'resource_management',
            meta: {
                title: '资源管理',
                roles: ['admin']
            }
        },
    ]
}