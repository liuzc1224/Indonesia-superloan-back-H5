import Main from '@/components/main'
import parentView from '@/components/parent-view'
export default [
  {
    path: '/operation-center',
    name: 'operation-center',
    meta: {
      icon: 'md-analytics',
      title: 'operation-center'//运营中心
    },
    component: Main,
    children: [
      {
        path: 'productConfiguration',
        name: 'productConfiguration',
        meta: {
          icon: 'ios-document',
          title: 'productConfiguration',//产品配置
        },
        component: () => import('@/view/operation-center/productConfiguration.vue')
      },
      {
        path: 'productDraft',
        name: 'productDraft',
        meta: {
          icon: 'ios-document',
          title: 'productDraft_title',//贷款产品草稿管理
        },
        component: () => import('@/view/operation-center/productDraft.vue')
      },{
        path: 'commentManagement/:id',
        name: 'commentManagement',
        meta: {
          icon: 'ios-document',
          title: 'commentManagement_title',//评论管理
        },
        component: () => import('@/view/operation-center/commentManagement.vue')
      },
      {
        path: 'bannerConfiguration',
        name: 'bannerConfiguration',
        meta: {
          icon: 'ios-document',
          title: 'bannerConfiguration',//banner配置
        },
        component: () => import('@/view/operation-center/bannerConfiguration.vue')
      },
      {
        path: 'bannerDraft',
        name: 'bannerDraft',
        meta: {
          icon: 'ios-document',
          title: 'bannerDraft_title',//banner草稿管理
        },
        component: () => import('@/view/operation-center/bannerDraft.vue')
      },
      {
        path: 'channelManagement',
        name: 'channelManagement',
        meta: {
          icon: 'ios-document',
          title: 'channelManagement',//渠道管理
        },
        component: () => import('@/view/operation-center/channel.vue')
      },
      {
        path: 'sweepstakesConfig',
        name: 'sweepstakesConfig',
        meta: {
          icon: 'ios-document',
          title: 'sweepstakesConfig_title',//抽奖活动配置
        },
        component: () => import('@/view/operation-center/sweepstakes.vue')
      },
      {
        path: 'winningList',
        name: 'winningList',
        meta: {
          icon: 'ios-document',
          title: 'winningList',//中奖名单
        },
        component: () => import('@/view/operation-center/winningList.vue')
      },
      {
        path: 'lotteryPrizes',
        name: 'lotteryPrizes',
        meta: {
          icon: 'ios-document',
          title: 'lotteryPrizes_title',//抽奖奖品管理
        },
        component: () => import('@/view/operation-center/lotteryPrizes.vue')
      },
      {
        path: '/app-template',
        name: 'app-template',
        meta: {
          icon: 'ios-document',
          title: 'app-template',//App模板配置
        },
        component:  parentView,
        children: [
          {
            path: 'sms-template',
            name: 'sms-template',
            meta: {
              icon: 'ios-document',
              title: 'sms-template',//短信模板
            },
            component: () => import('@/view/operation-center/app-template/sms-template.vue')
          },
          {
            path: 'push-template',
            name: 'push-template',
            meta: {
              icon: 'ios-document',
              title: 'push-template',//push模板
            },
            component: () => import('@/view/operation-center/app-template/push-template.vue')
          },
          {
            path: 'contact-info',
            name: 'contact-info',
            meta: {
              icon: 'ios-document',
              title: 'contact-info'//联系方式
            },
            component: () => import('@/view/operation-center/app-template/contact-info.vue')
          },
          {
            path: 'help-content',
            name: 'help-content',
            meta: {
              icon: 'ios-document',
              title: 'help-content'//帮助中心
            },
            component: () => import('@/view/operation-center/app-template/help-content.vue')
          },
          {
            path: 'bank-management',
            name: 'bank-management',
            meta: {
              icon: 'ios-document',
              title: 'bank-management',//银行管理
            },
            component: () => import('@/view/operation-center/app-template/bank-management.vue')
          },
          {
            path: 'account-type',
            name: 'account-type',
            meta: {
              icon: 'ios-document',
              title: 'account-type'//账目类型管理
            },
            component: () => import('@/view/operation-center/app-template/account-type.vue')
          },
          {
            path: 'version-update',
            name: 'version-update',
            meta: {
              icon: 'ios-document',
              title: 'version-update'//版本更新
            },
            component: () => import('@/view/operation-center/app-template/version-update.vue')
          },
          {
            path: 'app-link',
            name: 'app-link',
            meta: {
              icon: 'ios-document',
              title: 'app-link'//APP链接管理
            },
            component: () => import('@/view/operation-center/app-template/app-link.vue')
          },
        ]
      }
    ]
  }
]
