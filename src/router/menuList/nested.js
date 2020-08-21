import Layout from '@/layout';

export const nested = {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
        title: 'Nested',
        icon: 'yingxiao@2x.png',
        menu: 1,
        menuList: [{
            name: 'Menu1',
            title: '分类1',
            children: [{
                title: 'Menu1',
                routeName: 'menu1'
            },{
                title: 'Menu1-2',
                routeName: 'menu1'
            },{
                title: 'Menu1-3',
                routeName: 'menu1'
            },{
                title: 'Menu1-4',
                routeName: 'menu1'
            }]
        },{
            name: 'Menu2',
            title: '分类2',
            children: [{
                title: 'Menu2',
                routeName: 'menu2'
            }]
        }]
    },
    children: [
        {
            path: 'menu1',
            component: () => import('@/views/nested/menu1/index'), // Parent router-view
            name: 'menu1',
            meta: { 
                title: 'Menu1'
            }
        },
        {
            path: 'menu2',
            component: () => import('@/views/nested/menu2/index'),
            name: 'menu2',
            meta: { 
                title: 'menu2'
            }
        }
    ]
};