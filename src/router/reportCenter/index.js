import Main from '@/components/main'
import parentView from '@/components/parent-view'
export default [
  {
    path: '/report-center',
    name: 'report-center',
    meta: {
      icon: 'stats',
      title: 'report-center'//报表中心
    },
    component: Main,
    children: [
      {
        path: '/platform-data',
        name: 'platform-data',
        meta: {
          icon: 'ios-document',
          title: 'platform-data',//平台数据
        },
        component:  parentView,
        children: [
          {
            path: 'user-data',
            name: 'user-data',
            meta: {
              icon: 'ios-document',
              title: 'user-data',//平台用户数据
            },
            component: () => import('@/view/report-center/platformData/userData.vue')
          },
          {
            path: 'buried-point',
            name: 'buried-point',
            meta: {
              icon: 'ios-document',
              title: 'buried-point',//平台产品埋点
            },
            component: () => import('@/view/report-center/platformData/buriedPoint.vue')
          },
          {
            path: 'accounting-data',
            name: 'accounting-data',
            meta: {
              icon: 'ios-document',
              title: 'accounting-data',//平台用户记账数据
            },
            component: () => import('@/view/report-center/platformData/accountingData.vue')
          },
          {
            path: 'userLevel',
            name: 'userLevel',
            meta: {
              icon: 'ios-document',
              title: 'userLevel',//用户等级
            },
            component: () => import('@/view/report-center/platformData/userLevel.vue')
          },
          {
            path: 'membershipLevel',
            name: 'membershipLevel',
            meta: {
              icon: 'ios-document',
              title: 'membershipLevel',//会员等级
            },
            component: () => import('@/view/report-center/platformData/membershipLevel.vue')
          }
        ]
      },

      {
        path: '/operational-data',
        name: 'operational-data',
        meta: {
          icon: 'ios-document',
          title: 'operational-data',//运营数据
        },
        component:  parentView,
        children: [
          {
            path: 'conversion',
            name: 'conversion',
            meta: {
              icon: 'ios-document',
              title: 'conversion',//AF渠道推广转化数据
            },
            component: () => import('@/view/report-center/operationalData/conversion.vue')
          },
          {
            path: 'sales',
            name: 'sales',
            meta: {
              icon: 'ios-document',
              title: 'sales',//贷款产品销售数据
            },
            component: () => import('@/view/report-center/operationalData/sales.vue')
          },
          {
            path: 'productDimension',
            name: 'productDimension',
            meta: {
              icon: 'ios-document',
              title: 'productDimension',//AF渠道推广转化数据-产品维度
            },
            component: () => import('@/view/report-center/operationalData/productDimension.vue')
          },
          {
            path: 'trackingData',
            name: 'trackingData',
            meta: {
              icon: 'ios-document',
              title: 'trackingData',//产品售后跟踪数据
            },
            component: () => import('@/view/report-center/operationalData/trackingData.vue')
          },
          {
            path: 'conversionData',
            name: 'conversionData',
            meta: {
              icon: 'ios-document',
              title: 'conversionData',//产品售后转化数据
            },
            component: () => import('@/view/report-center/operationalData/conversionData.vue')
          }
        ]
      },
      {
        path: '/activity-data',
        name: 'activity-data',
        meta: {
          icon: 'ios-document',
          title: 'activity-data',//活动数据
        },
        component:  parentView,
        children: [
          {
            path: 'inviteFriends',
            name: 'inviteFriends',
            meta: {
              icon: 'ios-document',
              title: 'inviteFriends',//邀请好友
            },
            component: () => import('@/view/report-center/activityData/inviteFriends.vue')
          },
          {
            path: 'inviteFriends-two',
            name: 'inviteFriends-two',
            meta: {
              icon: 'ios-document',
              title: 'inviteFriends-two',//邀请好友2
            },
            component: () => import('@/view/report-center/activityData/inviteFriendsTwo.vue')
          },
          {
            path: 'sweepstakes',
            name: 'sweepstakes',
            meta: {
              icon: 'ios-document',
              title: 'sweepstakes_title',//抽奖活动
            },
            component: () => import('@/view/report-center/activityData/sweepstakes.vue')
          },
          {
            path: 'activityHeatMap',
            name: 'activityHeatMap',
            meta: {
              icon: 'ios-document',
              title: 'activityHeatMap',//活动热度图
            },
            component: () => import('@/view/report-center/activityData/activityHeatMap.vue')
          },
          {
            path: 'gamesData',
            name: 'gamesData',
            meta: {
              icon: 'ios-document',
              title: 'gamesData',//小游戏
            },
            component: () => import('@/view/report-center/activityData/gamesData.vue')
          },
          {
            path: 'gamesHeatMap',
            name: 'gamesHeatMap',
            meta: {
              icon: 'ios-document',
              title: 'gamesHeatMap',//小游戏热度图
            },
            component: () => import('@/view/report-center/activityData/gamesHeatMap.vue')
          }
        ]
      }
    ]
  }
]
