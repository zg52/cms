import Layout from '@/layout';

export const content = {
    path: '/content',
    component: Layout,
    redirect: '/home',
    name: 'content',
    meta: {
        title: 'CMS',
        icon: 'cms.png',
        menu: 1,
        menuList: []
    },
    children: []
}