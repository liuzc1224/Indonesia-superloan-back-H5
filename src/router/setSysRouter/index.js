import Main from '@/components/main'
export default [
    {
        path: '/setup',
        name: 'setup',
        meta: {
            icon: 'ios-settings',
            title: 'setup'//设置
        },
        component: Main,
        children: [
            {
                path: 'permission',
                name: 'permission',
                meta: {
                    icon: 'ios-document',
                    title: 'permission'//管理员权限
                },
                component: () => import('@/view/setup/permission.vue')
                },
                {
                path: 'role-page',
                name: 'role-page',
                meta: {
                    icon: 'ios-document',
                    title: 'role-page'//角色设置
                },
                component: () => import('@/view/setup/role.vue')
                },
                {
                path: 'tree-page',
                name: 'tree-page',
                meta: {
                    icon: 'ios-document',
                    title: 'tree-page'//菜单设置
                },
                component: () => import('@/view/setup/tree.vue')
                },
                {
                path: 'department-page',
                name: 'department-page',
                meta: {
                    icon: 'ios-document',
                    title: 'tree-page'//菜单设置
                },
                component: () => import('@/view/setup/department.vue')
            }
        ]
    }
]
