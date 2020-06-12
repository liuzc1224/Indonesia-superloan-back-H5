import Main from '@/components/main'

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        },
        component: () => import('@/view/login/login.vue')
    },
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    title: 'home',//首页
                    notCache: true,
                    icon: 'md-home'
                },
                component: () => import('@/view/single-page/home')
            }
        ]
    },
    {
        path: '/message',
        name: 'message',
        component: Main,
        meta: {
            hideInBread: true,
            hideInMenu: true
        },
        children: [
            {
                path: 'message_page',
                name: 'message_page',
                meta: {
                    icon: 'md-notifications',
                    title: 'msg-center'//消息中心
                },
                component: () => import('@/view/single-page/message/index.vue')
            }
        ]
    },
    {
        path: '/i18n',
        name: 'i18n',
        meta: {
            hideInBread: true,
            hideInMenu: true
        },
        component: Main,
        children: [
            {
                path: 'i18n_page',
                name: 'i18n_page',
                meta: {
                    icon: 'md-planet',
                    title: 'i18n - {{ i18n_page }}',
                },
                component: () => import('@/view/i18n/i18n-page.vue')
            }
        ]
    },
    {
        path: '/error_logger',
        name: 'error_logger',
        meta: {
            hideInBread: true,
            hideInMenu: true
        },
        component: Main,
        children: [
            {
                path: 'error_logger_page',
                name: 'error_logger_page',
                meta: {
                    icon: 'ios-bug',
                    title: '错误收集'
                },
                component: () => import('@/view/single-page/error-logger.vue')
            }
        ]
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/404.vue')
    }
]
