const dataCN = {
// 平台数据
  platformData:{
    //平台用户数据
    userData:{
      register: '注册用户数',
      registerToday: '今日注册用户数',
      loginToday: '今日登录用户数',
      downToday: '今日有效下载用户数',
      tip:'*以上数据为D+1数据',
      registerWeek: '近七天注册用户数',
      registerMonth: '近30天注册用户数',
      appNewWeek: '近七天新设备APP启动数',
      appWeek: '近七天APP启动数',
    },
    //平台产品埋点
    buriedPoint:{
      timeStart:"开始时间",
      timeEnd:"结束时间",
      week:'最近一周',
      month:'最近一月',
      date:'统计日期',
      type:"用户类型",
      inputType:'请选择用户类型',
      userType:[
        {
          desc:'新用户',
          value: 1
        },
        {
          desc:'老用户',
          value: 2
        }
      ],
      export:'导出',
      view:'查看埋点',
      userNumber:'用户数',
      frequency:'次数',
      averageClick:'平均用户点击次数',
      data:[
        {
          desc:'点击登录页-Facebook三方登录按钮',
          averageCount:'facebookLoginClickAverageCount',
          clickCount:'facebookLoginClickClickCount',
          userCount:'facebookLoginClickUserCount',
          eventName:'facebook_login_click',
        },
        {
          desc:'Facebook三方登录成功',
          averageCount:'facebookLoginAverageCount',
          clickCount:'facebookLoginClickCount',
          userCount:'facebookLoginUserCount',
          eventName:'facebook_login_success',
        },
        {
          desc:'Facebook三方登录新增',
          averageCount:'finishFacebookRegisterAverageCount',
          clickCount:'finishFacebookRegisterClickCount',
          userCount:'finishFacebookRegisterUserCount',
          eventName:'facebookLoginAdd',
        },
        {
          desc:'点击登录页-Google三方登录按钮',
          averageCount:'googleLoginClickAverageCount',
          clickCount:'googleLoginClickClickCount',
          userCount:'googleLoginClickUserCount',
          eventName:'google_login_click',
        },
        {
          desc:'Google三方登录成功',
          averageCount:'googleLoginAverageCount',
          clickCount:'googleLoginClickCount',
          userCount:'googleLoginUserCount',
          eventName:'google_login_success',
        },
        {
          desc:'Google三方登录新增',
          averageCount:'finishGoogleRegisterAverageCount',
          clickCount:'finishGoogleRegisterClickCount',
          userCount:'finishGoogleRegisterUserCount',
          eventName:'googleLoginAdd',
        },
        {
          desc:'请求发送注册短信验证码',
          averageCount:'sendSmsAverageCount',
          clickCount:'sendSmsClickCount',
          userCount:'sendSmsUserCount',
          eventName:'sendMsg',
        },
        {
          desc:'注册短信验证码发送成功',
          averageCount:'sendSmsSuccessAverageCount',
          clickCount:'sendSmsSuccessClickCount',
          userCount:'sendSmsSuccessUserCount',
          eventName:'sendMsgSuccess',
        },

        {
          desc:'使用注册短信验证码完成注册',
          averageCount:'sendSmsRegisterAverageCount',
          clickCount:'sendSmsRegisterClickCount',
          userCount:'sendSmsRegisterUserCount',
          eventName:'sendMsgRegister',
        },
        {
          desc:'请求发送注册语音验证码',
          averageCount:'sendVoiceSmsAverageCount',
          clickCount:'sendVoiceSmsClickCount',
          userCount:'sendVoiceSmsUserCount',
          eventName:'sendVoiceMsg',
        },
        {
          desc:'注册语音验证码发送成功',
          averageCount:'sendVoiceSmsSuccessAverageCount',
          clickCount:'sendVoiceSmsSuccessClickCount',
          userCount:'sendVoiceSmsSuccessUserCount',
          eventName:'sendVoiceMsgSuccess',
        },
        {
          desc:'使用注册语音验证码完成注册',
          averageCount:'sendVoiceSmsRegisterAverageCount',
          clickCount:'sendVoiceSmsRegisterClickCount',
          userCount:'sendVoiceSmsRegisterUserCount',
          eventName:'sendVoiceMsgRegister',
        },
        {
          desc:'使用手机号完成登录',
          averageCount:'finishLoginAverageCount',
          clickCount:'finishLoginClickCount',
          userCount:'finishLoginUserCount',
          eventName:'phone_login_success',
        },
        {
          desc:'首页-消息中心进入',
          averageCount:'enterNewsAverageCount',
          clickCount:'enterNewsClickCount',
          userCount:'enterNewsUserCount',
          eventName:'msg_center_click',
        },{
          desc:'首页-贷款产品BANNER点击',
          averageCount:'clickBannerAverageCount',
          clickCount:'clickBannerClickCount',
          userCount:'clickBannerUserCount',
          eventName:'bannerClick',
        },
        {
          desc:'首页-贷款产品列表点击',
          averageCount:'clickLoanProductAverageCount',
          clickCount:'clickLoanProductClickCount',
          userCount:'clickLoanProductUserCount',
          eventName:'listClick',
        },
        {
          desc:'首页-贷款产品列表-下载按钮点击',
          averageCount:'listdownLoanProductAverageCount',
          clickCount:'listdownLoanProductClickCount',
          userCount:'listdownLoanProductUserCount',
          eventName:'list_download_click',
        },
        {
          desc:'贷款产品详情页-下载按钮点击',
          averageCount:'downLoanProductAverageCount',
          clickCount:'downLoanProductClickCount',
          userCount:'downLoanProductUserCount',
          eventName:'detailClick',
        },
        {
          desc:'记账-切换到消费记录',
          averageCount:'consumeHistoryAverageCount',
          clickCount:'consumeHistoryClickCount',
          userCount:'consumeHistoryUserCount',
          eventName:'swtich2consumer',
        },
        {
          desc:'记账-切换到贷款账单',
          averageCount:'loanBillAverageCount',
          clickCount:'loanBillClickCount',
          userCount:'loanBillUserCount',
          eventName:'swtich2loan',
        },{
          desc:'记账-新增记账图标点击',
          averageCount:'addLoanBillIconAverageCount',
          clickCount:'addLoanBillIconClickCount',
          userCount:'addLoanBillIconUserCount',
          eventName:'creditcard_add',
        },{
          desc:'记账-新增记账按钮点击',
          averageCount:'addLoanBillButtonAverageCount',
          clickCount:'addLoanBillButtonClickCount',
          userCount:'addLoanBillButtonUserCount',
          eventName:'tally_add_button',
        },
        {
          desc:'记账-新增记账完成',
          averageCount:'finishAddLoanBillButtonAverageCount',
          clickCount:'finishAddLoanBillButtonClickCount',
          userCount:'finishAddLoanBillButtonUserCount',
          eventName:'tally_submit',
        },
        {
          desc:'记账-删除记录',
          averageCount:'deleteBillAverageCount',
          clickCount:'deleteBillClickCount',
          userCount:'deleteBillUserCount',
          eventName:'tally_remove',
        },
        {
          desc:'记账-账单还款操作完成',
          averageCount:'repaymentAverageCount',
          clickCount:'repaymentClickCount',
          userCount:'repaymentUserCount',
          eventName:'repayment_finish',
        },
        {
          desc:'记账-账单正常结清',
          averageCount:'settleAverageCount',
          clickCount:'settleClickCount',
          userCount:'settleUserCount',
          eventName:'account_bill_settle',
        },{
          desc:'记账-账单异常结清按钮点击',
          averageCount:'abnormalSettleAverageCount',
          clickCount:'abnormalSettleClickCount',
          userCount:'abnormalSettleUserCount',
          eventName:'abnormal_settle',
        },{
          desc:'新增资金账户完成',
          averageCount:'addAccountAverageCount',
          clickCount:'addAccountClickCount',
          userCount:'addAccountUserCount',
          eventName:'add_account_ok',
        },{
          desc:'编辑资金账户',
          averageCount:'editAccountAverageCount',
          clickCount:'editAccountClickCount',
          userCount:'editAccountUserCount',
          eventName:'add_account_edit',
        },
        {
          desc:'删除资金账户',
          averageCount:'deleteAccountAverageCount',
          clickCount:'deleteAccountClickCount',
          userCount:'deleteAccountUserCount',
          eventName:'add_account_delete',
        },
        {
          desc:'记账-图形消费统计进入',
          averageCount:'consumeStatisticsAverageCount',
          clickCount:'consumeStatisticsClickCount',
          userCount:'consumeStatisticsUserCount',
          eventName:'comsume_graphic_click',
        },
        {
          desc:'弹窗-账单出账提醒关闭',
          averageCount:'closeBillRemindAverageCount',
          clickCount:'closeBillRemindClickCount',
          userCount:'closeBillRemindUserCount',
          eventName:'account_notice_cancel',
        },{
          desc:'设置-账单出账提醒关闭',
          averageCount:'closeSettingBillRemindAverageCount',
          clickCount:'closeSettingBillRemindClickCount',
          userCount:'closeSettingBillRemindUserCount',
          eventName:'account_notice_close',
        },
        {
          desc:'设置-账单出账提醒开启',
          averageCount:'openSettingBillRemindAverageCount',
          clickCount:'openSettingBillRemindClickCount',
          userCount:'openSettingBillRemindUserCount',
          eventName:'account_notice_open',
        },


        {
          desc:'弹窗-账单还款提醒关闭',
          averageCount:'closeRepaymentRemindAverageCount',
          clickCount:'closeRepaymentRemindClickCount',
          userCount:'closeRepaymentRemindUserCount',
          eventName:'repayment_notice_cancel',
        },
        {
          desc:'设置-账单还款提醒关闭',
          averageCount:'closeSettingRepaymentRemindAverageCount',
          clickCount:'closeSettingRepaymentRemindClickCount',
          userCount:'closeSettingRepaymentRemindUserCount',
          eventName:'repayment_notice_close',
        },
        {
          desc:'设置-账单还款提醒开启',
          averageCount:'openSettingRepaymentRemindAverageCount',
          clickCount:'openSettingRepaymentRemindClickCount',
          userCount:'openSettingRepaymentRemindUserCount',
          eventName:'repayment_notice_open',
        },
        {
          desc:'帮助中心进入',
          averageCount:'enterHelpCenterAverageCount',
          clickCount:'enterHelpCenterClickCount',
          userCount:'enterHelpCenterUserCount',
          eventName:'help_click',
        },
        {
          desc:'意见反馈提交',
          averageCount:'opinionAverageCount',
          clickCount:'opinionClickCount',
          userCount:'opinionUserCount',
          eventName:'submit_opinion',
        },
        {
          desc:'忘记密码方式修改密码成功',
          averageCount:'lostPasswordAverageCount',
          clickCount:'lostPasswordClickCount',
          userCount:'lostPasswordUserCount',
          eventName:'change_login_forgetpassword_ok',
        },
        {
          desc:'邀请好友-复制链接到剪切板',
          averageCount:'inviteAverageCount',
          clickCount:'inviteClickCount',
          userCount:'inviteUserCount',
          eventName:'clipboard_click',
        }
      ],
      registration:'完成注册',
      login:'完成登录',
      msgCenterEntry:'首页-消息中心进入',
      productBannerClick:'首页-贷款产品BANNER点击',
      productListClick:'首页-贷款产品列表点击',
      productDownload:'首页-贷款产品下载',
      switchExpensesRecord:'记账-切换到消费记录',
      switchLoanBill:'记账-切换到贷款账单',
      newAccountIconClick:'记账-新增记账图标点击',
      newAccountBtnClick:'记账-新增记账按钮点击',
      newAccountCarryOut:'记账-新增记账完成',
      accountEditRecord:'记账-编辑记录',
      accountDeleteRecord:'记账-删除记录',
      billRepayment:'记账-账单还款操作完成',
      billSettlementNormal:'记账-账单正常结清',
      billSettlementNoNormal:'记账-账单异常结清按钮点击',
      addFundAccount:'新增资金账户完成',
      editFundAccount:'编辑资金账户',
      deleteFundAccount:'删除资金账户',
      graphicsConsumptionEnter:'记账-图形消费统计进入',
      billPopUpsClose:'弹窗-账单出账提醒关闭',
      billSettingClose:'设置-账单出账提醒关闭',
      billSettingOpen:'设置-账单出账提醒开启',
      repaymentPopUpsClose:'弹窗-账单还款提醒关闭',
      repaymentSettingClose:'设置-账单还款提醒关闭',
      repaymentSettingOpen:'设置-账单还款提醒开启',
      helpCenter:'帮助中心进入',
      feedback:'意见反馈提交',
      editPassword:'修改密码成功',
      forgetPassword:'忘记密码方式修改密码成功',
      inviteFriends:'邀请好友-复制链接到剪切板',
    },
    //平台用户记账数据
    accountingData:{
      timeStart:"开始时间",
      timeEnd:"结束时间",
      date:'统计日期',
      week:'近七天',
      month:'近一个月',
      expenditureAccount:'支出记账使用情况',
      incomeAccount:'收入记账使用情况',
      userVirtualBill:'用户虚拟账单使用情况',
      userVirtualCredit:'用户虚拟信用观察',
      alreadyPosted:'已出账',
      repaymentNumber:'还款笔数',
      settleNumber:'结清笔数',
      repaymentWillingness:'还款意愿',
      settleWillingness:'结清意愿',
      normalRate:'正常结清率',
      overdueRate:'逾期结清率',
      grandTotal:'累计'
    },
    //用户等级
    userLevel:{
      date:'统计日期',
      level:'用户等级',
      reachPoints:'达到积分',
      userNumber:'成就用户数',
      yesterday:'昨天新晋',
      lastSevenDays:'最近7天新晋'
    },
    //会员等级
    membershipLevel:{
      date:'统计日期',
      level:'会员等级',
      userNumber:'成就用户数',
      yesterday:'昨天新晋',
      lastSevenDays:'最近7天新晋'
    }
  },
  //运营数据
  operationalData:{
    //AF渠道推广转化数据
    conversion:{
      conversion: 'AF渠道推广转化数据',
      grandTotal: '累计',
      sort:'一级排序',
      select:'请选择...',
      sorts:[
        {
          desc:'渠道ID',
          value:1
        },
        {
          desc:'按点击总数',
          value:2
        },
        {
          desc:'按独立用户总数',
          value:3
        },
        {
          desc:'按独立新用户数',
          value:4
        },
        {
          desc:'按单用户平均点击数',
          value:5
        },
        {
          desc:'按单新用户平均点击数',
          value:6
        },
        {
          desc:'按注册-点击转化率',
          value:7
        },
        {
          desc:'按新用户点击转化率',
          value:8
        },
        {
          desc:'按老用户点击转化率',
          value:9
        }
      ],
      data: '日期',
      marketingPlatform:'推广平台',
      timeStart:"开始时间",
      timeEnd:"结束时间",
      productId:'产品ID',
      inputProductId:'产品ID',
      productName:'产品名称',
      inputProductName:'请选择产品名称',
      companyName:'公司名称',
      inputCompanyName:'请输入公司名称',
      channelID:'渠道ID',
      inputChannelID:'请输入渠道ID',
      channelName:'渠道名称',
      inputChannelName:'请输入渠道名称',
      packageName:'包名',
      inputPackageName:'请选择包名',
      installationNumber:'安装数',
      registeredUsers:'注册用户数',
      downloadUsers:'点击下载用户数',
      clickDownloads:'点击下载次数',
      uninstalls:'卸载数',
      install_registered:'安装-注册用户数转化率',
      install_download:'安装-下载用户数转化率',
      install_download_click:'安装-下载点击次数转化率',

      clickLink:'first open',
      independent:'独立用户数',
      independentNew:'独立新用户数',
      independentNewUsers:'独立新用户占比',
      registrationUserNumber:'注册用户数',
      userConversionRate:'first open-独立新用户转化率',
      registrationConversionRate:'独立新用户-注册转化率',
      clickRegistration:'first open-注册转化率'
    },
    //贷款产品销售数据
    sales:{
      sales:'贷款产品销售数据',
      salesInfo:'贷款产品销售明细',
      grandTotal: '累计',
      number: '次数',
      register: '注册用户数',
      device: '设备数',
      clickDownloadBtn:'点击下载按钮',
      clickDownload:'点击下载次数',
      clickDownloadDevice:'点击下载设备数',
      clickUserDownload:'点击下载用户数',
      clickDownCount:'点击下载次数',
      clickDownUserCount:'点击下载用户数',
      UserDownload:'用户点击下载数',
      UserDownloadToday:'今日用户点击下载数',
      clickDownloadToday:'今日点击下载次数',
      userDownloadNumber:'下载独立用户数',
      userDownloadNumberToday:'今日下载独立用户数',
      application:'申请笔数',
      applicationToday:'今日申请笔数',
      userApplication:'申请用户数',
      userApplicationToday:'今日申请用户数',
      loan:'放款笔数',
      loanToday:'今日放款笔数',
      userLoan:'放款用户数',
      userLoanToday:'今日放款用户数',
      date:'统计日期',
      promotingMethod:'平台推广方式',
      select:'请选择...',
      timeStart:"开始时间",
      timeEnd:"结束时间",
      methods:[
        {
          desc:'BANNER',
          value: 0
        },
        {
          desc:'贷款列表',
          value: 1
        }
      ],
      productId:'产品ID',
      productName:'产品名称',
      companyName:'公司名称',
      inputProductId:'产品ID',
      inputProductName:'请输入产品名称',
      inputCompanyName:'请输入公司名称',
      dateTime:'日期',
      ranking:'排名',

      downloadPartyA:'下载甲方独立用户数',
      effectivePartyA:'下载甲方有效用户数',
      clickRegisterPartyA:'点击注册甲方用户数',
      registerPartyA:'注册甲方成功用户数',
      applicationPartyA:'申请甲方用户数',
      reviewPartyA:'甲方审核通过用户数',
      loanPartyA:'甲方放款成功用户数',

      downloadRate:'下载-注册转化率',
      registrationRate:'注册-申请转化率',
      applicationRate:'申请-放款转化率',
      downloadLoanRate:'下载-放款转化率',
      banner:'BANNER',
      loanList:'贷款列表',
      total:'总计',
      productQuantity:'产品数量',
      effectiveProductQuantity:'有效产品数量'
    },
    //AF渠道推广转化数据-产品维度
    productDimension:{
      details:"明细",
      total:"累计",
      data:"日期",
      marketingPlatform:"推广平台",
      channelID:"渠道ID",
      channelName:"渠道名称",
      inputChannelName:"请输入渠道名称",
      inputChannelID:"请输入渠道ID",
      select:'请选择...',
      productId:'产品ID',
      productName:'产品名称',
      promotingMethod:'平台推广方式',
      methods:[
        {
          desc:'BANNER',
          value: 0
        },
        {
          desc:'贷款列表',
          value: 1
        }
      ],
      userNumber:'点击下载用户数'
    },
    //产品售后跟踪数据
    trackingData:{
      edit:'编辑售后跟踪数据',
      data:"日期",
      promotingMethod:'平台推广方式',
      methods:[
        {
          desc:'BANNER',
          value: 0
        },
        {
          desc:'贷款列表',
          value: 1
        }
      ],
      select:'请选择...',
      productId:'产品ID',
      productName:'产品名称',
      inputProductId:'请输入产品ID',
      inputProductName:'请输入产品名称',
      downNumber:'实际下载数',
      updater:"更新人",
      updateTime:"更新时间",
      tip:'请输入0-1000000000000的整数'
    },
    //产品售后转化数据
    conversionData:{
      data:"日期",
      select:'请选择...',
      productId:'产品ID',
      productName:'产品名称',
      inputProductId:'请输入产品ID',
      inputProductName:'请输入产品名称',
      promotingMethod:'平台推广方式',
      methods:[
        {
          desc:'BANNER',
          value: 0
        },
        {
          desc:'贷款列表',
          value: 1
        }
      ],
      userNumber:'点击下载用户数',
      downNumber:'实际下载数',
      rate:'点击下载用户数-实际下载数转化率'
    }
  },
  dataCenter: {
    creditTotal: '历史信用卡账单用户数量',
    creditAdd: '当日信用卡账单用户新增数量',
    recordToTal: '历史记账用户数量',
    recordAdd: '当日记账用户新增数量',
    recordQueryToTal: '历史征信查询用户数量',
    recordQueryAdd: '当日征信查询新增数量',
    registerWeek: '近七天总注册数趋势',
    registerMonth: '近30天总注册数趋势',
    registerOneday: '当天注册数'
  },
  //活动数据
  activityData:{
    //邀请好友
    inviteFriends:{
      inviteFriends:"邀请好友",
      dateTime:'统计日期',
      buriedPoint:'活动埋点',
      inviteIconClick:'邀请好友-分享图标点击次数',
      inviteFriendsClick:'邀请好友-分享给好友点击次数',
      inviteIconClickPage:'邀请好友页-分享图标点击次数',
      inviteIconClickPackage:'邀请好友-抽奖赢红包点击次数',

      sweepstakesIconClick:'抽奖页-分享图标点击次数',
      sweepstakesFriendsClick:'抽奖页-分享给好友点击次数',

      faceBook:'Facebook成功分享次数',
      twitter:'推特成功分享次数',
      linkedIn:'领英成功分享次数',
      whatsApp:'WhatsApp成功分享次数',
      copyLink:'复制链接次数',

      pullNew:'拉新',
      shareIt:'参与分享用户数',
      inviteUserCount:'邀请人被锁定次数>0的用户数',
      shareItEffective:'有效分享用户数',
      invitedUserCount:'被锁定邀请人的用户数',
      effective:'有效拉新用户数',
      registered:'拉新注册新用户',

      redEnvelope:'拉新赠送老客红包',
      oldLotteryNumber:'拉新赠送老客抽奖次数',
      newLotteryNumber:'赠送新用户抽奖次数',
      edit:'编辑用户提现规则',
      amount:'提现最低额度',
      second:'第二额度',
      third:'第三额度',
      prompt:{
        amount:'请输入提现最低额度',
        second:'请输入第二额度',
        third:'请输入第三额度',
      }
    },
    //邀请好友2
    inviteFriendsTwo:{
      dateTime:'统计日期',
      export:"导出",
      shareIt:'参与分享有效用户数',
      shareRegister:'分享-注册用户数',
      clickDownloadButton:'点击下载按钮用户数',
      clickDownloadButtonFrequency:'点击下载按钮次数',
      sameDayRegistrationFee:'当日注册费用（RP）',
      total:"总计",
      game:"小游戏",
      lottery:"抽奖",
      loanDetailsPage:"贷款详情页",
      personalCenterInviteFriends:"个人中心-邀请好友"
    },
    //抽奖活动
    sweepstakes:{
      sweepstakes:'抽奖活动',
      dateTime:'截止日期',
      lotteryStatistics:'抽奖统计',
      eventPrizeGift:'活动奖品赠送',

      luckyDraw:'已抽奖成功总次数',
      lotteryUsers:'参与抽奖用户数',
      free:'免费抽奖总次数',
      paid:'有偿抽奖总次数',
      integral:'有偿抽奖消耗积分',

      remainingDraws:'剩余抽奖次数',
      unusedUsers:'抽奖次数未用完用户数',
      activityHeatMap:'活动热度图',

      integralTotal:'积分中奖总额',
      GameCurrency:'游戏币中奖总额',
      lotteryOpportunity:'抽奖机会中奖总次数',
      otherTypes:'其他类型中奖次数',
    },
    //抽奖活动热度图
    activityHeatMap:{
      dateTime:'统计日期',
      lotteryHeatMap:'抽奖热度图',
      week:'最近一周',
      month:'最近一个月',
      luckyDraw:'已抽奖成功总次数',
      free:'免费抽奖总次数',
      paid:'有偿抽奖总次数',
      integral:'有偿抽奖消耗积分',
      winningTrendChart:'中奖趋势图',

      integralTotal:'积分中奖总额',
      GameCurrency:'游戏币中奖总额',
      lotteryOpportunity:'抽奖机会中奖总次数',
      otherTypes:'其他类型中奖次数',
      data:[
        {
          desc:"已抽奖成功总次数",
          value:1
        },
        {
          desc:"免费抽奖总次数",
          value:2
        },
        {
          desc:"有偿抽奖总次数",
          value:3
        },{
          desc:"有偿抽奖消耗积分",
          value:4
        },
        {
          desc:"积分中奖总额",
          value:5
        },
        {
          desc:"游戏币中奖总额",
          value:6
        },{
          desc:"抽奖机会中奖总次数",
          value:7
        },
        {
          desc:"其他类型中奖次数",
          value:8
        }
      ]
    },
    //小游戏
    gamesData:{
      games:'小游戏',
      dateTime:'截止日期',
      gameHeatMap:'游戏热度图',
      gameStatistics:'游戏统计',
      gameNumber:'参与游戏总次数',
      gameUsers:'参与游戏用户数',
      free:'免费参与游戏总次数',
      paid:'有偿参与游戏总次数',
      integral:'有偿参与游戏消耗积分',
      unGameUsers:'未参与游戏用户数',

      gameBuriedPoint:'游戏埋点',

      clickBattleButton:'点击对战按钮次数',
      clickBattleUser:'点击对战用户数',

      battleShareNumber:'对战-邀请好友分享次数',
      battleShareUser:'对战-邀请好友分享用户数',
      cancelBattleShareNumber:'对战-取消邀请好友次数',
      cancelBattleShareUser:'对战-取消邀请好友用户数'
    },
    //游戏热度图
    gameHeatMap:{
      dateTime:'统计日期',
      gameHeatMap:'游戏热度图',
      week:'最近一周',
      month:'最近一个月',

      freeNumber:'免费参与游戏次数',
      freeUser:'免费参与游戏用户数',
      paidUser:'有偿参与游戏次数',
      paidNumber:'有偿参与游戏用户数',

      gameTrendChart:'游戏趋势图',

      clickBattleButton:'点击对战按钮次数',
      clickBattleUser:'点击对战用户数',

      battleShareNumber:'对战-邀请好友分享次数',
      battleShareUser:'对战-邀请好友分享用户数',
      cancelBattleShareNumber:'对战-取消邀请好友次数',
      cancelBattleShareUser:'对战-取消邀请好友用户数',
      heatMap:[
        {
          desc:"免费参与游戏次数",
          value:"gratisGameCount"
        },
        {
          desc:"免费参与游戏用户数",
          value:"gratisGameUserCount"
        },
        {
          desc:"有偿参与游戏次数",
          value:"paidGameCount"
        },
        {
          desc:"有偿参与游戏用户数",
          value:"paidGameUserCount"
        }
      ],
      trend:[
        {
          desc:"点击对战按钮次数",
          value:"fightClickCount"
        },
        {
          desc:"点击对战用户数",
          value:"fightClickUserCount"
        },
        {
          desc:"对战-邀请好友分享次数",
          value:"inviteCount"
        },
        {
          desc:"对战-邀请好友分享用户数",
          value:"inviteUserCount"
        },
        {
          desc:"对战-取消邀请好友次数",
          value:"cancelIviteCount"
        },
        {
          desc:"对战-取消邀请好友用户数",
          value:"cancelIviteUserCount"
        },
      ]
    }
  }
};
const dataBR = {
// 平台数据
  platformData:{
    //平台用户数据
    userData:{
      register: 'Pengguna terdaftar',
      registerToday: 'Pengguna yg terdaftar hari ini',
      loginToday: 'pengguna yg login hari ini',
      downToday: 'Unduhan aktif hari ini',
      tip:'*Data di atas adalah data D +1',
      registerWeek: 'Jumlah pengguna terdaftar dalam tujuh hari terakhir',
      registerMonth: 'Jumlah pengguna terdaftar dalam 30 hari terakhir',
      appNewWeek: 'Startup aplikasi perangkat baru dalam tujuh hari terakhir',
      appWeek: 'Startup APP dalam tujuh hari terakhir'
    },
    //平台产品埋点
    buriedPoint:{
      timeStart:"waktu mulai",
      timeEnd:"waktu selesai",
      week:'Minggu lalu',
      month:'Bulan lalu',
      date:'Tanggal statistik',
      type:"tipe pengguna",
      inputType:'Silakan pilih tipe pengguna',
      userType:[
        {
          desc:'Pengguna baru',
          value: 1
        },
        {
          desc:'Pengguna lama',
          value: 2
        }
      ],
      export:'Ekspor',
      view:'Lihat data prilaku pengguna',
      userNumber:'Jumlah pengguna',
      frequency:'frekuensi',
      averageClick:'Klik rata-rata pengguna',
      data:[
        {
          desc:'Klik Halaman Login-Tombol login pihak ketiga Facebook',
          averageCount:'facebookLoginClickAverageCount',
          clickCount:'facebookLoginClickClickCount',
          userCount:'facebookLoginClickUserCount',
          eventName:'facebook_login_click',
        },
        {
          desc:'Suskes Login Pihak ketiga Facebook',
          averageCount:'facebookLoginAverageCount',
          clickCount:'facebookLoginClickCount',
          userCount:'facebookLoginUserCount',
          eventName:'facebook_login_success',
        },
        {
          desc:'Tambahkan Login Pihak ketiga Facebook',
          averageCount:'finishFacebookRegisterAverageCount',
          clickCount:'finishFacebookRegisterClickCount',
          userCount:'finishFacebookRegisterUserCount',
          eventName:'facebookLoginAdd',
        },
        {
          desc:'Klik Halaman Login-Tombol login pihak ketiga Google',
          averageCount:'googleLoginClickAverageCount',
          clickCount:'googleLoginClickClickCount',
          userCount:'googleLoginClickUserCount',
          eventName:'google_login_click',
        },
        {
          desc:'Sukses Login Pihak ketiga Google',
          averageCount:'googleLoginAverageCount',
          clickCount:'googleLoginClickCount',
          userCount:'googleLoginUserCount',
          eventName:'google_login_success',
        },
        {
          desc:'Tambahkan Login Pihak ketiga Google',
          averageCount:'finishGoogleRegisterAverageCount',
          clickCount:'finishGoogleRegisterClickCount',
          userCount:'finishGoogleRegisterUserCount',
          eventName:'googleLoginAdd',
        },
        {
          desc:'Permintaan untuk mengirimkan kode pendaftaran verifikasi SMS ',
          averageCount:'sendSmsAverageCount',
          clickCount:'sendSmsClickCount',
          userCount:'sendSmsUserCount',
          eventName:'sendMsg',
        },
        {
          desc:'Kode verifikasi SMS berhasil terkirim',
          averageCount:'sendSmsSuccessAverageCount',
          clickCount:'sendSmsSuccessClickCount',
          userCount:'sendSmsSuccessUserCount',
          eventName:'sendMsgSuccess',
        },

        {
          desc:'Gunakan kode verifikasi SMS pendaftaran untuk menyelesaikan pendaftaran',
          averageCount:'sendSmsRegisterAverageCount',
          clickCount:'sendSmsRegisterClickCount',
          userCount:'sendSmsRegisterUserCount',
          eventName:'sendMsgRegister',
        },
        {
          desc:'Permintaan untuk mengirimkan kode pendaftaran verifikasi suara',
          averageCount:'sendVoiceSmsAverageCount',
          clickCount:'sendVoiceSmsClickCount',
          userCount:'sendVoiceSmsUserCount',
          eventName:'sendVoiceMsg',
        },
        {
          desc:'Kode Verifikasi Suara Berhasil Terkirim',
          averageCount:'sendVoiceSmsSuccessAverageCount',
          clickCount:'sendVoiceSmsSuccessClickCount',
          userCount:'sendVoiceSmsSuccessUserCount',
          eventName:'sendVoiceMsgSuccess',
        },
        {
          desc:'Gunakan kode verifikasi suara terdaftar untuk menyelesaikan pendaftaran',
          averageCount:'sendVoiceSmsRegisterAverageCount',
          clickCount:'sendVoiceSmsRegisterClickCount',
          userCount:'sendVoiceSmsRegisterUserCount',
          eventName:'sendVoiceMsgRegister',
        },
        {
          desc:'Gunakan nomor ponsel Anda untuk menyelesaikan login',
          averageCount:'finishLoginAverageCount',
          clickCount:'finishLoginClickCount',
          userCount:'finishLoginUserCount',
          eventName:'phone_login_success',
        },
        {
          desc:'Beranda-Entri Pusat Pesan',
          averageCount:'enterNewsAverageCount',
          clickCount:'enterNewsClickCount',
          userCount:'enterNewsUserCount',
          eventName:'msg_center_click',
        },{
          desc:'Beranda- klik Banner Produk Peminjaman',
          averageCount:'clickBannerAverageCount',
          clickCount:'clickBannerClickCount',
          userCount:'clickBannerUserCount',
          eventName:'bannerClick',
        },
        {
          desc:'Beranda-klik Daftar produk pinjaman',
          averageCount:'clickLoanProductAverageCount',
          clickCount:'clickLoanProductClickCount',
          userCount:'clickLoanProductUserCount',
          eventName:'listClick',
        },
        {
          desc:'Beranda-daftar produk pinjaman- klik Tombol unduh ',
          averageCount:'listdownLoanProductAverageCount',
          clickCount:'listdownLoanProductClickCount',
          userCount:'listdownLoanProductUserCount',
          eventName:'list_download_click',
        },
        {
          desc:'halaman detail produk pinjaman – klik Tombol unduh',
          averageCount:'downLoanProductAverageCount',
          clickCount:'downLoanProductClickCount',
          userCount:'downLoanProductUserCount',
          eventName:'detailClick',
        },
        {
          desc:'Pembukuan- Beralih ke riwayat konsumsi',
          averageCount:'consumeHistoryAverageCount',
          clickCount:'consumeHistoryClickCount',
          userCount:'consumeHistoryUserCount',
          eventName:'swtich2consumer',
        },
        {
          desc:'Pembukuan- Beralih ke tagihan pinjaman',
          averageCount:'loanBillAverageCount',
          clickCount:'loanBillClickCount',
          userCount:'loanBillUserCount',
          eventName:'swtich2loan',
        },{
          desc:'Pembukuan – Klik ikon pembukuan baru',
          averageCount:'addLoanBillIconAverageCount',
          clickCount:'addLoanBillIconClickCount',
          userCount:'addLoanBillIconUserCount',
          eventName:'creditcard_add',
        },{
          desc:'Pembukuan – Klik tombol pembukuan baru',
          averageCount:'addLoanBillButtonAverageCount',
          clickCount:'addLoanBillButtonClickCount',
          userCount:'addLoanBillButtonUserCount',
          eventName:'tally_add_button',
        },
        {
          desc:'Pembukuan-Pembukuan Baru selesai',
          averageCount:'finishAddLoanBillButtonAverageCount',
          clickCount:'finishAddLoanBillButtonClickCount',
          userCount:'finishAddLoanBillButtonUserCount',
          eventName:'tally_submit',
        },
        {
          desc:'Pembukuan-Hapus Catatan',
          averageCount:'deleteBillAverageCount',
          clickCount:'deleteBillClickCount',
          userCount:'deleteBillUserCount',
          eventName:'tally_remove',
        },
        {
          desc:'Pembukuan- Operasi pembayaran tagihan selesai',
          averageCount:'repaymentAverageCount',
          clickCount:'repaymentClickCount',
          userCount:'repaymentUserCount',
          eventName:'repayment_finish',
        },
        {
          desc:'Pembukuan- Tagihan diselesaikan secara normal',
          averageCount:'settleAverageCount',
          clickCount:'settleClickCount',
          userCount:'settleUserCount',
          eventName:'account_bill_settle',
        },{
          desc:'Pembukuan-Klik tombol penyelesaian tagihan yang tidak normal',
          averageCount:'abnormalSettleAverageCount',
          clickCount:'abnormalSettleClickCount',
          userCount:'abnormalSettleUserCount',
          eventName:'abnormal_settle',
        },{
          desc:'Akun dana baru selesai',
          averageCount:'addAccountAverageCount',
          clickCount:'addAccountClickCount',
          userCount:'addAccountUserCount',
          eventName:'add_account_ok',
        },{
          desc:'Edit akun dana',
          averageCount:'editAccountAverageCount',
          clickCount:'editAccountClickCount',
          userCount:'editAccountUserCount',
          eventName:'add_account_edit',
        },
        {
          desc:'Hapus Akun Pendanaan',
          averageCount:'deleteAccountAverageCount',
          clickCount:'deleteAccountClickCount',
          userCount:'deleteAccountUserCount',
          eventName:'add_account_delete',
        },
        {
          desc:'Pembukuan- Statistik konsumsi grafis masuk',
          averageCount:'consumeStatisticsAverageCount',
          clickCount:'consumeStatisticsClickCount',
          userCount:'consumeStatisticsUserCount',
          eventName:'comsume_graphic_click',
        },
        {
          desc:'Notifikasi-Pengingat tagihan tidak aktif',
          averageCount:'closeBillRemindAverageCount',
          clickCount:'closeBillRemindClickCount',
          userCount:'closeBillRemindUserCount',
          eventName:'account_notice_cancel',
        },{
          desc:'Pengaturan-Pengingat tagihan tidak aktif',
          averageCount:'closeSettingBillRemindAverageCount',
          clickCount:'closeSettingBillRemindClickCount',
          userCount:'closeSettingBillRemindUserCount',
          eventName:'account_notice_close',
        },
        {
          desc:'Pengaturan- Pengingat tagihan aktif',
          averageCount:'openSettingBillRemindAverageCount',
          clickCount:'openSettingBillRemindClickCount',
          userCount:'openSettingBillRemindUserCount',
          eventName:'account_notice_open',
        },


        {
          desc:'Notifikasi-Pengingat pembayaran tagihan tidak aktif',
          averageCount:'closeRepaymentRemindAverageCount',
          clickCount:'closeRepaymentRemindClickCount',
          userCount:'closeRepaymentRemindUserCount',
          eventName:'repayment_notice_cancel',
        },
        {
          desc:'Pengaturan- Pengingat pembayaran tagihan tidak aktif',
          averageCount:'closeSettingRepaymentRemindAverageCount',
          clickCount:'closeSettingRepaymentRemindClickCount',
          userCount:'closeSettingRepaymentRemindUserCount',
          eventName:'repayment_notice_close',
        },
        {
          desc:'Pengaturan- Pengingat pembayaran tagihan dihidupkan',
          averageCount:'openSettingRepaymentRemindAverageCount',
          clickCount:'openSettingRepaymentRemindClickCount',
          userCount:'openSettingRepaymentRemindUserCount',
          eventName:'repayment_notice_open',
        },
        {
          desc:'Entri Pusat Bantuan',
          averageCount:'enterHelpCenterAverageCount',
          clickCount:'enterHelpCenterClickCount',
          userCount:'enterHelpCenterUserCount',
          eventName:'help_click',
        },
        {
          desc:'Berikan umpan balik',
          averageCount:'opinionAverageCount',
          clickCount:'opinionClickCount',
          userCount:'opinionUserCount',
          eventName:'submit_opinion',
        },
        {
          desc:'Lupa metode untuk mengubah kata sandi yang berhasil',
          averageCount:'lostPasswordAverageCount',
          clickCount:'lostPasswordClickCount',
          userCount:'lostPasswordUserCount',
          eventName:'change_login_forgetpassword_ok',
        },
        {
          desc:'Undang Teman- Copy link ke clipboard',
          averageCount:'inviteAverageCount',
          clickCount:'inviteClickCount',
          userCount:'inviteUserCount',
          eventName:'clipboard_click',
        }
      ],
      registration:'Selesai pendaftaran',
      login:'Selesai Login',
      msgCenterEntry:'Beranda-Pusat Pesan masuk',
      productBannerClick:'Beranda-Klik Banner Produk Pinjaman',
      productListClick:'Beranda-Klik daftar produk pinjaman',
      productDownload:'Beranda-Unduh Produk Pinjaman',
      switchExpensesRecord:'Pembukuan-Beralih ke riwayat konsumsi',
      switchLoanBill:'Pembukuan- Beralih ke tagihan pinjaman',
      newAccountIconClick:'Pembukuan-klik ikon pembukuan baru',
      newAccountBtnClick:'Pembukuan-Klik tombol pembukuan baru',
      newAccountCarryOut:'Pembukuan-pembukuan baru selesai',
      accountEditRecord:'Pembukuan- Edit catatan',
      accountDeleteRecord:'Pembukuan-Hapus catatan',
      billRepayment:'Pembukuan-Operasi pembayaran tagihan selesai',
      billSettlementNormal:'Pembukuan-Tagihan diselesaikan secara normal',
      billSettlementNoNormal:'Pembukuan-Klik tombol penyelesaian tagihan yang tidak normal',
      addFundAccount:'Akun dana baru selesai',
      editFundAccount:'Edit akun dana',
      deleteFundAccount:'Hapus akun dana',
      graphicsConsumptionEnter:'Pembukuan-Statistik konsumsi grafis masuk',
      billPopUpsClose:'Notifikasi-Pengingat tagihan tidak aktif',
      billSettingClose:'Pengaturan-Pengingat tagihan tidak aktif',
      billSettingOpen:'Pengaturan-Pengingat tagihan aktif',
      repaymentPopUpsClose:'Notifikasi-Pengingat pembayaran tagihan tidak aktif',
      repaymentSettingClose:'Pengaturan-Pengingat pembayaran tagihan tidak aktif',
      repaymentSettingOpen:'Pengaturan- Pengingat pembayaran tagihan dihidupkan',
      helpCenter:'Entri Pusat Bantuan',
      feedback:'Kirim umpan balik',
      editPassword:'Kata sandi berhasil diubah',
      forgetPassword:'Lupa metode untuk mengubah kata sandi yang berhasil',
      inviteFriends:'Undang teman- Copy link ke',
    },
    //平台用户记账数据
    accountingData:{
      timeStart:"waktu mulai",
      timeEnd:"waktu selesai",
      date:'Tanggal statistik',
      week:'Tujuh hari terakhir',
      month:'sebulan terakhir',
      expenditureAccount:'pembukuan pengeluaran',
      incomeAccount:'Pembukuan Pemasukan',
      userVirtualBill:'Penggunaan penagihan virtual pengguna',
      userVirtualCredit:'Pengamatan kredit virtual pengguna',
      alreadyPosted:'tagihan sudah keluar',
      repaymentNumber:'Jumlah pembayaran',
      settleNumber:'Jumlah pelunasan',
      repaymentWillingness:'Kesediaan untuk membayar',
      settleWillingness:'Kesediaan untuk melunasi',
      normalRate:'Tingkat pelunasan normal',
      overdueRate:'Tingkat pelunasan yg terlambat',
      grandTotal:'Jumlah Total'
    },
    //用户等级
    userLevel:{
      date:'Tanggal statistik',
      level:'Tingkat pengguna',
      reachPoints:'Mencapai poin',
      userNumber:'Jumlah pengguna',
      yesterday:'kemarin',
      lastSevenDays:'7 hari terakhir'
    },
    //会员等级
    membershipLevel:{
      date:'Tanggal statistik',
      level:'Tingkat anggota',
      userNumber:'Jumlah pengguna',
      yesterday:'Kemarin',
      lastSevenDays:'7 hari terakhir'
    }
  },
  //运营数据
  operationalData:{
    //AF渠道推广转化数据
    conversion:{
      conversion: 'Data konversi promosi saluran platform',
      grandTotal: 'Jumlah Total',
      sort:'Urutan Pertama',
      select:'Silakan pilih...',
      sorts:[
        {
          desc:'Saluran ID',
          value:1
        },
        {
          desc:'Klik Total',
          value:2
        },
        {
          desc:'klik Jumlah total pengguna independen',
          value:3
        },
        {
          desc:'klik Jumlah pengguna baru yang independen',
          value:4
        },
        {
          desc:'Klik rata-rata pengguna',
          value:5
        },
        {
          desc:'klik pesanan Rata-rata pengguna baru',
          value:6
        },
        {
          desc:'klik Pendaftaran- Klik tingkat konversi',
          value:7
        },
        {
          desc:'klik Tingkat konversi pengguna baru',
          value:8
        },
        {
          desc:'klik Tingkat konversi pengguna lama',
          value:9
        }
      ],
      data: 'Tanggal',
      marketingPlatform:'Platform promosi',
      timeStart:"waktu mulai",
      timeEnd:"waktu selesai",
      productId:'ID Produk',
      inputProductId:'Silakan masukkan ID Produk',
      productName:'ID Produk',
      inputProductName:'Silakan masukkan nama produk',
      companyName:'Nama perusahaan',
      inputCompanyName:'Silakan masukkan nama perusahaan',
      channelID:'ID Saluran',
      channelName:'Nama saluran',
      inputChannelName:'Silakan masukkan nama saluran',
      packageName:'Nama apk',
      inputPackageName:'Silakan masukkan nama apk',
      installationNumber:'Jumlah yg Diinstal',
      registeredUsers:'Pengguna terdaftar',
      downloadUsers:'Klik untuk mengunduh pengguna',
      clickDownloads:'Klik unduhan',
      uninstalls:'Uninstall',
      install_registered:'install-Tingkat konversi pengguna terdaftar',
      install_download:'install-Unduh Tingkat Konversi Pengguna',
      install_download_click:'install- Unduh Klik Tingkat Konversi',

      clickLink:'first open',
      independent:'pengguna independen',
      independentNew:'pengguna baru independen',
      independentNewUsers:'Proporsi pengguna baru yang independen',
      registrationUserNumber:'Pengguna terdaftar',
      userConversionRate:'first open-Tingkat konversi pengguna baru yang independen',
      registrationConversionRate:'Pengguna baru independen- Tingkat Konversi Registrasi',
      clickRegistration:'first open-Tingkat Konversi Registrasi'
    },
    //贷款产品销售数据
    sales:{
      sales:'Data Penjualan Produk Pinjaman',
      salesInfo:'Detail Penjualan Produk Pinjaman',
      grandTotal: 'Jumlah Total',
      number: 'frekuensi',
      register: 'Pengguna terdaftar',
      device: 'Jumlah perangkat',
      clickDownloadBtn:'Klik tombol unduh',
      clickDownload:'Klik frekuensi unduhan',
      clickDownloadDevice:'Klik untuk mengunduh jumlah perangkat',
      clickUserDownload:'Klik untuk mengunduh jumlah pengguna',
      clickDownCount:'Klik jumlah frakuensi unduhan',
      clickDownUserCount:'Klik untuk mengunduh jumlah pengguna',
      UserDownload:'Jumlah unduhan pengguna',
      UserDownloadToday:'jumlah Unduhan pengguna Hari Ini',
      clickDownloadToday:'klik frekuensi Unduhan hari ini',
      userDownloadNumber:'Unduh Pengguna independen',
      userDownloadNumberToday:'unduhan pengguna independen hari ini',
      application:'Jumlah pengajuan',
      applicationToday:'Jumlah pengajuan hari ini',
      userApplication:'Jumlah pengajuan aplikasi pengguna',
      userApplicationToday:'Jumlah pengajuan aplikasi hari ini',
      loan:'Jumlah pencairan dana',
      loanToday:'Jumlah pencairan dana hari ini',
      userLoan:'Jumlah pencairan dana pengguna',
      userLoanToday:'Jumlah pencairan dana pengguna hari ini',
      date:'Tanggal statistik',
      promotingMethod:'Metode promosi platform',
      select:'Silakan pilih...',
      timeStart:"waktu mulai",
      timeEnd:"waktu selesai",
      methods:[
        {
          desc:'BANNER',
          value: 0
        },
        {
          desc:'Daftar pinjaman',
          value: 1
        }
      ],
      productId:'ID Produk',
      productName:'Nama produk',
      companyName:'Nama perusahaan',
      inputProductId:'ID Produk',
      inputProductName:'Silakan masukkan nama produk',
      inputCompanyName:'Silakan masukkan nama perusahaan',
      dateTime:'Tanggal',
      ranking:'Peringkat',

      downloadPartyA:'Unduh jumlah pengguna independen pihak pertama',
      effectivePartyA:'Unduh Jumlah pengguna pihak pertama yg aktif',
      clickRegisterPartyA:'klik untuk pengguna pihak pertama terdaftar',
      registerPartyA:'Jumlah pengguna pihak pertama yg sukses terdaftar',
      applicationPartyA:'Jumlah pengajuan pengguna pihak pertama',
      reviewPartyA:'Jumlah pengguna yang disetujui oleh Pihak pertama',
      loanPartyA:'Jumlah pengguna sukses pencairan Pihak pertama',

      downloadRate:'Unduh- Tingkat Konversi Registrasi',
      registrationRate:'Registrasi- Tingkat konversi aplikasi',
      applicationRate:'Pengajuan- Tingkat Konversi Pencairan',
      downloadLoanRate:'Unduh-Tingkat Konversi Pencairan',
      banner:'BANNER',
      loanList:'Daftar pinjaman',
      total:'Total',
      productQuantity:'Jumlah produk',
      effectiveProductQuantity:'Jumlah produk yang efektif'
    }
  },
  dataCenter: {
    creditTotal: 'Jumlah riwayat penagihan kartu kredit',
    creditAdd: 'Jumlah penagihan kartu kredit baru hari ini',
    recordToTal: 'Jumlah riwayat penagihan',
    recordAdd: 'Jumlah penagihan baru hari ini',
    recordQueryToTal: 'Jumlah riwayat penyelidikan kredit pengguna',
    recordQueryAdd: 'Jumlah Permintaan kredit baru pada hari ini',
    registerWeek: 'total pendaftaran dalam tujuh hari terakhir',
    registerMonth: 'total pendaftaran dalam 30 hari terakhir',
    registerOneday: 'registrasi Hari ini'
  },
  //活动数据
  activityData:{
    //邀请好友
    inviteFriends:{
      inviteFriends:"Undang teman",
      dateTime:'Tanggal statistik',
      buriedPoint:'Tandai Aktifitas',
      inviteIconClick:'undang teman-bagikan ikon klik',
      inviteFriendsClick:'undang teman- klik Berbagi ke',
      inviteIconClickPage:'undang teman- bagikan ikon klik',
      inviteIconClickPackage:'undang teman- klik amplop merah memenangkan Undian',

      sweepstakesIconClick:'Halaman undian-Bagikan ikon klik',
      sweepstakesFriendsClick:'Halaman undian- Klik berbagi dengan teman',

      faceBook:'berhasil dibagikan ke Facebook',
      twitter:'berhasil dibagikan ke twitter',
      linkedIn:'berhasil dibagikan ke linkedin',
      whatsApp:'berhasil dibagikan ke whatsapp',
      copyLink:'Salin Tautan',

      pullNew:'Tarik baru',
      shareIt:'Jumlah pengguna yang berpartisipasi',
      inviteUserCount:'Frekuensi pengundang dikunci > 0 pengguna',
      shareItEffective:'Berbagi pengguna yang efektif',
      invitedUserCount:'Pengguna diblokir oleh undangan',
      effective:'Tarik pengguna pengguna baru yg efektif',
      registered:'Tarik pengguna baru terdaftar yang baru',

      redEnvelope:'Hadiah baru untuk pelanggan lama',
      oldLotteryNumber:'Tarik hadiah baru untuk pelanggan lama',
      newLotteryNumber:'Hadiah untuk pengguna baru',
      edit:'Edit aturan penarikan pengguna',
      amount:'Jumlah penarikan minimum',
      second:'jumlah kedua',
      third:'jumlah ketiga',
      prompt:{
        amount:'Silakan masukkan jumlah penarikan minimum',
        second:'Silakan masukkan jumlah kedua',
        third:'Silakan masukkan jumlah ketiga',
      }
    },
    //邀请好友2
    inviteFriendsTwo:{
      dateTime:'Tanggal statistik',
      export:"Ekspor",
      shareIt:'Jumlah pengguna aktif yang berpartisipasi dalam berbagi',
      shareRegister:'Bagikan- Pengguna yang Terdaftar',
      clickDownloadButton:'Jumlah pengguna yang mengklik tombol unduh',
      clickDownloadButtonFrequency:'frekuansi Klik tombol unduh',
      sameDayRegistrationFee:'(RP)Biaya pendaftaran hari ini',
      total:"total",
      game:"Game",
      lottery:"undian",
      loanDetailsPage:"halaman Detail pinjaman",
      personalCenterInviteFriends:"Pusat Pribadi-Undang Teman"
    },
    //抽奖活动
    sweepstakes:{
      sweepstakes:'Undian',
      dateTime:'Batas waktu',
      lotteryStatistics:'Statistik Undian',
      eventPrizeGift:'Hadiah kegiatan',

      luckyDraw:'Jumlah total undian yang berhasil',
      lotteryUsers:'Jumlah pengguna yang berpartisipasi dalam undian',
      free:'Total jumlah undian gratis',
      paid:'Jumlah total undian berbayar',
      integral:'Poin Konsumsi Undian Berbayar',

      remainingDraws:'Undian yang tersisa',
      unusedUsers:'jumlah　nomor undian yg belum digunakan',
      activityHeatMap:'kegiatan heatmaps',

      integralTotal:'total point yg dimenangkan',
      GameCurrency:'Total hadiah uang permainan',
      lotteryOpportunity:'Jumlah total peluang undian',
      otherTypes:'Jenis kemenangan lainnya',
    },
    //抽奖活动热度图
    activityHeatMap:{
      dateTime:'Tanggal statistik',
      lotteryHeatMap:'Undian heatmaps',
      week:'Minggu lalu',
      month:'Bulan lalu',
      luckyDraw:'Jumlah total undian yang berhasil',
      free:'Total jumlah undian gratis',
      paid:'Jumlah total undian berbayar',
      integral:'Poin Konsumsi Undian Berbayar',
      winningTrendChart:'Grafik tren kemenangan',

      integralTotal:'Total poin yang dimenangkan',
      GameCurrency:'Total hadiah uang permainan',
      lotteryOpportunity:'Jumlah total peluang undian',
      otherTypes:'Jenis kemenangan lainnya',
      data:[
        {
          desc:"Jumlah total undian yang berhasil",
          value:1
        },
        {
          desc:"Total jumlah undian gratis",
          value:2
        },
        {
          desc:"Jumlah total undian berbayar",
          value:3
        },{
          desc:"Poin Konsumsi Undian Berbayar",
          value:4
        },
        {
          desc:"Total poin yang dimenangkan",
          value:5
        },
        {
          desc:"Total hadiah uang permainan",
          value:6
        },{
          desc:"Jumlah total peluang undian",
          value:7
        },
        {
          desc:"Jenis kemenangan lainnya",
          value:8
        }
      ]
    },
    //小游戏
    gamesData:{
      games:'Game',
      dateTime:'Batas waktu',
      gameHeatMap:'Game Heat Map',
      gameStatistics:'Statistik Game',
      gameNumber:'Total jumlah game yang dimainkan',
      gameUsers:'Jumlah pengguna yang berpartisipasi dalam game',
      free:'Total jumlah game gratis',
      paid:'Jumlah total game berbayar',
      integral:'Poin berbayar untuk berpartisipasi dalam game',
      unGameUsers:'Jumlah pengguna yang belum berpartisipasi dalam game',

      gameBuriedPoint:'Catatan data game',

      clickBattleButton:'klik pada Jumlah tombol pertempuran',
      clickBattleUser:'Klik untuk bermain melawan　pengguna',

      battleShareNumber:'Pertempuran－Undang teman untuk',
      battleShareUser:'Pertempuran－Undang teman untuk membagikan pengguna',
      cancelBattleShareNumber:'Pertempuran－Jumlah teman yang membatalkan undangan',
      cancelBattleShareUser:'Pertempuran－Jumlah pengguna yang membatalkan　undangan teman'
    },
    //游戏热度图
    gameHeatMap:{
      dateTime:'Tanggal statistik',
      gameHeatMap:'Game Heat Map',
      week:'Minggu lalu',
      month:'Bulan lalu',

      freeNumber:'Jumlah permainan gratis',
      freeUser:'Jumlah pengguna pemain gratis',
      paidUser:'Game Berbayar',
      paidNumber:'Pengguna game berbayar',

      gameTrendChart:'Grafik Tren Game',

      clickBattleButton:'klik pada Jumlah tombol pertempuran',
      clickBattleUser:'Klik untuk bermain melawan pengguna',

      battleShareNumber:'Pertempuran-undang teman untuk berbagi',
      battleShareUser:'Pertempuran-undang teman untuk membagikan pengguna',
      cancelBattleShareNumber:'Pertempuran－ Jumlah teman yang membatalkan undangan',
      cancelBattleShareUser:'Pertempuran－Jumlah pengguna yang membatalkan undangan teman',
      heatMap:[
        {
          desc:"Jumlah permainan gratis",
          value:"gratisGameCount"
        },
        {
          desc:"Jumlah pengguna pemain gratis",
          value:"gratisGameUserCount"
        },
        {
          desc:"Game Berbayar",
          value:"paidGameCount"
        },
        {
          desc:"Pengguna game berbayar",
          value:"paidGameUserCount"
        }
      ],
      trend:[
        {
          desc:"klik pada Jumlah tombol pertempuran",
          value:"fightClickCount"
        },
        {
          desc:"Klik untuk bermain melawan pengguna",
          value:"fightClickUserCount"
        },
        {
          desc:"Pertempuran-undang teman untuk berbagi",
          value:"inviteCount"
        },
        {
          desc:"Pertempuran-undang teman untuk membagikan pengguna",
          value:"inviteUserCount"
        },
        {
          desc:"Pertempuran－ Jumlah teman yang membatalkan undangan",
          value:"cancelIviteCount"
        },
        {
          desc:"Pertempuran－Jumlah pengguna yang membatalkan undangan teman",
          value:"cancelIviteUserCount"
        },
      ]
    }
  }
};
export { dataCN, dataBR };
