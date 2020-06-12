import Main from '@/components/main'
export default [
  {
    path: '/under-management',
    name: 'under-management',
    meta: {
      icon: 'md-cloud-upload',
      title: 'under-management'//下架管理
    },
    component: Main,
    children: [
      {
        path: 'monitoring-link',
        name: 'monitoring-link',
        meta: {
          icon: 'ios-document',
          title: 'monitoring-link'//自定义谷歌监测链接
        },
        component: () => import('@/view/under-management/monitoring-link')
      },
      {
        path: 'dismissal-notice',
        name: 'dismissal-notice',
        meta: {
          icon: 'ios-document',
          title: 'dismissal-notice',//下架通知
        },
        component: () => import('@/view/under-management/dismissal-notice')
      },
      {
        path: 'dismissal-notice-email',
        name: 'dismissal-notice-email',
        meta: {
          icon: 'ios-document',
          title: 'dismissal-notice-email',//下架通知邮箱
        },
        component: () => import('@/view/under-management/dismissal-notice-email')
      }
    ]
  }
]
