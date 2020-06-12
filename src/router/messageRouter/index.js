import Main from '@/components/main'
export default [
  {
    path: '/message-center',
    name: 'message-center',
    meta: {
      icon: 'md-chatboxes',
      title: 'msg-center'//消息中心
    },
    component: Main,
    children: [
      {
        path: 'push',
        name: 'push',
        meta: {
          icon: 'ios-document',
          title: 'push_title'//push推送
        },
        component: () => import('@/view/message-center/push/push.vue')
      },
      {
        path: 'feedback',
        name: 'feedback',
        meta: {
          icon: 'ios-document',
          title: 'feedback_title'//意见反馈
        },
        component: () => import('@/view/message-center/feedback/feedback.vue')
      }
    ]
  }
]
