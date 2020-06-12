const operationCN = {
  common:{
    add:'新增',
    search:'搜索',
    reset:'重置',
    operating:'操作',
    edit:'编辑',
    moveUp:'上移',
    export:'导出',
    moveDown:'下移',
    delete:'删除',
    cancel:'取消',
    submit:'确定',
    moveUpSuccess:'上移成功',
    moveUpMessage:'已是第一个',
    moveDownSuccess:'下移成功',
    moveDownMessage:'已是最后一个',
    editSuccess:'编辑成功',
    deleteSuccess:'删除成功',
    addSuccess:"新增成功",
    imgSuccess:"图片上传成功",
    copySuccess:"复制成功",
    message:"请输入每一项",
    img:"图片",
    info:"查看推送详情",
    errorDate:"请选择正确的时间",
    timeStart:"开始时间",
    timeEnd:"结束时间",
    signOut:"退出登录",
    login:"登录",
    loginPlease:"欢迎登录",
    password: '请输入密码',
    passwordTip: '密码不能为空',
    username: '请输入用户名',
    usernameTip: '用户名不能为空',
  },

  'operation-center': '运营中心',
  //个人中心
  userInfo:{
    password:"修改密码",
    usrInfo:"个人信息",
    old:"输入旧密码",
    inputOld:"请输入旧密码",
    new:"输入新密码",
    inputNew:"请输入新密码",
    repeatNew:"重复输入新密码",
    inputRepeatNew:"请重复输入新密码",
    error:"两次密码输入不一致",
    name: "真实姓名",
    inputName: "请输入真实姓名",
    department: "所属部门",
    inputDepartment: "请输入所属部门",
    post: "岗位",
    inputPost: "请输入岗位",
    permission: "角色权限",
    inputPermission: "请输入角色权限",
    phone: "手机号",
    inputPhone: "请输入手机号",
    mailbox: "邮箱",
    inputMailbox: "请输入邮箱",
  },
  //产品配置
  product:{
    add:"新增贷款产品",
    draft:"贷款产品草稿管理",
    saveDraft:"保存为草稿",
    release:"发布",
    urlType:[
      {
        desc:'AppsFlyer推广链接',
        value:0
      },
      {
        desc:'Adjust推广链接',
        value:1
      }
    ],
    comment:"管理评论",
    feedback:[
      "开启反馈模块","关闭反馈模块"
    ],
    // feedbackOff:"关闭反馈模块",
    // feedbackON:"开启反馈模块",
    bestSize:"建议尺寸120px * 120px",
    selectWhat:[
      {
        desc:'公司',
        value:'company'
      },
      {
        desc:'产品',
        value:'productName'
      }
    ],
    monetaryUnit:[
      {
        desc:'RP',
        value:0
      },
    ],
    activeStatus:[
      {
        desc:'未上架',
        value:0
      },
      {
        desc:'上架中',
        value:1
      },
      {
        desc:'已下架',
        value:2
      }
    ],
    displayState:[
      {
        desc:'显示',
        value:1
      },
      {
        desc:'隐藏',
        value:0
      }
    ],
    linkType:[
      {
        desc:'apk下载',
        value:0
      },
      {
        desc:'H5下载',
        value:1
      },
      {
        desc:'google下载',
        value:2
      },
      {
        desc:'AppsFlyer推广链接',
        value:3
      },
      {
        desc:'Adjust推广链接',
        value:4
      }
    ],
    unit:[
      {
        desc:'天',
        value:0
      },
      {
        desc:'周',
        value:1
      },
      {
        desc:'月',
        value:2
      },
      {
        desc:'年',
        value:3
      }
    ],
    processDays:[
      {
        desc:'秒',
        value:0
      },
      {
        desc:'分',
        value:1
      },
      {
        desc:'时',
        value:2
      },
      {
        desc:'天',
        value:3
      },
      {
        desc:'周',
        value:4
      },
      {
        desc:'月',
        value:5
      }
    ],
    interestRate:[
      {
        desc:'>',
        value:0
      },
      {
        desc:'<',
        value:1
      },
      {
        desc:'==',
        value:2
      },
      {
        desc:'>=',
        value:3
      },
      {
        desc:'<=',
        value:4
      },
      {
        desc:'约',
        value:5
      },
      {
        desc:'低',
        value:6
      },
      {
        desc:'最低',
        value:7
      }
    ],
    rate:[
      {
        desc:'日利率',
        value:0
      },
      {
        desc:'月利率',
        value:1
      },
      {
        desc:'年利率',
        value:2
      }
    ],
    tabData:{
      id:'ID',
      name:'APP名称',
      firm:'所属公司',
      icon:'icon',
      max:'最高可借额度',
      loanDays:'借款期限',
      interestRate:'利率',
      processDays:'放款时长',
      arrivalTime:'到账时间',
      dateAdded:"谷歌上架日期",
      linkType:'链接类型',
      get:'下载跳转链接',
      thirdPartyUrl:"三方链接",
      thirdPartyUrlType:"三方链接类型",
      borrowingRequirements:'借款要求',
      borrowingProcess:"借款流程",
      shelfPeriod:'上架期限',
      shelfTime:'上架时间段',
      sort:'排序',
      createTime:'创建时间',
      operator:'操作人',
      updateTime:'更新时间',
      displayState:'显示状态',
      activeStatus:'活动状态',
      ShelfTime:'上架时间',
      ObtainedTime:'下架时间',

      whether:'新品',
      ksp:'KSP',
      staging:'分期',
      time:'新品过期时间',

      slogan:'宣传语',
      status:'上架状态',
      feature:"产品优势",
      claim:"要求",
      process:"借款流程",

      description:"下载描述",
      application:"申请描述",
      reviewProcess:"审核流程",
      lendingProcess:"放款流程",
      repaymentProcess:"还款流程",

      info:"填写信息",
      repayment:"放还款项",

    },
    prompt:{
      sort:'请选择排序',
      whether:'请选择是否新品',
      time:'请输入新品过期时间',
      name:'请输入产品名称',
      status:'请选择状态',
      linkType:'请选择链接类型',
      thirdPartyUrl:"请输入三方链接",
      thirdPartyUrlType:"请选择三方链接类型",
      serialNumber:'请选择序号',
      icon:'请上传icon',
      firm:'请输入所属公司',
      max:'请输入最大贷款金额',
      processDays:'请输入放款时长',
      interestRate:'请输入利率',
      interestRateType:'请选择符号标识',
      dailyInterestRate:'请输入最低日利率',
      slogan:'请输入宣传语',
      get:'请输入下载跳转链接',
      claim:"请输入要求",
      loanDaysMin:'请输入贷款最小期限',
      loanDaysMax:'请输入贷款最大期限',
      process:"借款流程",
      description:"请输入下载描述",
      application:"请输入申请描述",
      reviewProcess:"请输入审核流程",
      lendingProcess:"请输入放款流程",
      repaymentProcess:"请输入还款流程",
      feature:"请输入产品优势",
      dateAdded:"请输入谷歌上架日期",
      displayState:'请选择显示状态',
      activeStatus:'请选择活动状态',
      unit:'请选择单位',
      loanPeriodUnit:'请选择单位',
      monetaryUnit:'请选择货币单位',
      loanProductRequires:"借款要求",
      shelfTime:'请输入上架时间段',
      timeStart:'开始时间',
      timeEnd:'结束时间',
      timeBetween:'请选择上架时间范围',
    },
    status:[
      {
        desc:'已上架',
        value:1
      },
      {
        desc:'已下架',
        value:0
      }
    ],
    state:[
      {
        desc:'是',
        value:1
      },
      {
        desc:'否',
        value:0
      }
    ],
    modal:{
      add:'新增产品',
      edit:'编辑产品',
    }
  },
  //产品草稿
  productDraft:{
    urlType:[
      {
        desc:'AppsFlyer推广链接',
        value:0
      },
      {
        desc:'Adjust推广链接',
        value:1
      }
    ],
    productName:"产品名称",
    firmName:"公司名称",
    prompt:{
      productName:'请输入产品名称',
      firmName:'请输入所属公司',
      sort:'请选择排序',
      whether:'请选择是否新品',
      time:'请输入新品过期时间',
      status:'请选择状态',
      linkType:'请选择链接类型',
      thirdPartyUrl:"请输入三方链接",
      thirdPartyUrlType:"请选择三方链接类型",
      serialNumber:'请选择序号',
      icon:'请上传icon',
      max:'请输入最大贷款金额',
      processDays:'请输入放款时长',
      interestRate:'请输入日利率',
      interestRateType:'请选择符号标识',
      dailyInterestRate:'请输入最低日利率',
      slogan:'请输入宣传语',
      get:'请输入下载跳转链接',
      claim:"请输入要求",
      loanDaysMin:'请输入贷款最小期限',
      loanDaysMax:'请输入贷款最大期限',
      process:"借款流程",
      description:"请输入下载描述",
      application:"请输入申请描述",
      reviewProcess:"请输入审核流程",
      lendingProcess:"请输入放款流程",
      repaymentProcess:"请输入还款流程",
      feature:"请输入产品优势",
      dateAdded:"请输入谷歌上架日期",
      displayState:'请选择显示状态',
      activeStatus:'请选择活动状态',
      unit:'请选择单位',
      loanPeriodUnit:'请选择单位',
      loanProductRequires:"借款要求",
      shelfTime:'请输入上架时间段',
      timeStart:'开始时间',
      timeEnd:'结束时间'
    },
    tabData:{
      saveTime:"保存时间",
      appName:"APP名称",
      firm:"所属公司",
      icon:'ICON',
      max:'最高可借额度',
      loanDays:'借款期限',
      interestRate:'利率',
      processDays:'放款时长',
      arrivalTime:'到账时间',
      get:'跳转链接',
      thirdPartyUrl:"三方链接",
      thirdPartyUrlType:"三方链接类型",
      shelfPeriod:'上架期限',
      shelfTime:'上架时间段',
      sort:'排序',
      createTime:'创建时间',
      displayState:'显示状态',
      activeStatus:'活动状态'
    },
    activeStatus:[
      {
        desc:'未上架',
        value:0
      },
      {
        desc:'上架中',
        value:1
      },
      {
        desc:'已下架',
        value:2
      }
    ],
    displayState:[
      {
        desc:'显示',
        value:1
      },
      {
        desc:'隐藏',
        value:0
      }
    ],
    linkType:[
      {
        desc:'apk下载',
        value:0
      },
      {
        desc:'H5下载',
        value:1
      },
      {
        desc:'google下载',
        value:2
      },
      {
        desc:'AppsFlyer推广链接',
        value:3
      },
      {
        desc:'Adjust推广链接',
        value:4
      }
    ],
    unit:[
      {
        desc:'天',
        value:0
      },
      {
        desc:'周',
        value:1
      },
      {
        desc:'月',
        value:2
      },
      {
        desc:'年',
        value:3
      }
    ],
    processDays:[
      {
        desc:'秒',
        value:0
      },
      {
        desc:'分',
        value:1
      },
      {
        desc:'时',
        value:2
      },
      {
        desc:'天',
        value:3
      },
      {
        desc:'周',
        value:4
      }
    ],
    interestRate:[
      {
        desc:'>',
        value:0
      },
      {
        desc:'<',
        value:1
      },
      {
        desc:'==',
        value:2
      },
      {
        desc:'>=',
        value:3
      },
      {
        desc:'<=',
        value:4
      }
    ],
  },
  //评论
  commentManagement:{
    add:"新增评论",
    hide:"隐藏",
    show:"显示",
    edit:"编辑",
    status:[
      {
        desc:"显示",
        value:1
      },
      {
        desc:"隐藏",
        value:0
      }
    ],
    creator:[
      {
        desc:"用户",
        value:0
      },
      {
        desc:"管理员",
        value:1
      }
    ],
    tableData:{
      selectAll:"全选",
      commentTime:"评论时间",
      commentState:"评论状态",
      hide:"隐藏勾选项",
      show:"显示勾选项",
      hideAll:"隐藏全部",
      showAll:"显示全部",
      creator:"创建人",
      account:"用户账户",
      comments:"评论内容",
      virtualAccount:"虚拟账号",
      virtualAvatar:"虚拟头像",
      virtualComments:"虚拟评论内容"
    },
    prompt:{
      commentState:"请选择评论状态",
      creator:"请选择创建人",
      account:"请输入用户账户",
      comments:"请输入评论内容",
      timeStart:'开始时间',
      timeEnd:'结束时间',
      virtualAccount:"请输入虚拟账号",
      virtualAvatar:"请上传虚拟头像",
      virtualComments:"请输入虚拟评论内容",
      tip:"账号长度不能小于4"
    },
  },
  //banner配置
  banner:{
    urlType:[
      {
        desc:'AppsFlyer推广链接',
        value:0
      },
      {
        desc:'Adjust推广链接',
        value:1
      }
    ],
    add:"新增banner",
    draft:"banner草稿管理",
    saveDraft:"保存为草稿",
    release:"发布",
    selectWhat:[
      {
        desc:'公司',
        value:'company'
      },
      {
        desc:'banner',
        value:'bannerSource'
      }
    ],
    activeStatus:[
      {
        desc:'全部',
        value:''
      },
      {
        desc:'未上架',
        value:0
      },
      {
        desc:'上架中',
        value:1
      },
      {
        desc:'已下架',
        value:2
      }
    ],
    linkType:[
      {
        desc:'apk下载',
        value:0
      },
      {
        desc:'H5下载',
        value:1
      },
      {
        desc:'google下载',
        value:2
      },
      {
        desc:'AppsFlyer推广链接',
        value:3
      },
      {
        desc:'Adjust推广链接',
        value:4
      }
    ],
    displayState:[
      {
        desc:'全部',
        value:''
      },
      {
        desc:'显示',
        value:1
      },
      {
        desc:'隐藏',
        value:0
      }
    ],
    tabData:{
      id:'ID',
      name:'banner名称',
      description:'banner描述',
      banner:'banner图',
      linkType:'链接类型',
      link:'跳转链接',
      thirdPartyUrl:"三方链接",
      thirdPartyUrlType:"三方链接类型",
      upTime:'上架时间',
      downTime:'下架时间',
      firm:'所属公司',
      shelfPeriod:'上架时间',
      shelfTime:'上架时间段',
      sort:'排序',
      createTime:'创建时间',
      operator:'操作人',
      updateTime:'更新时间',
      displayState:'显示状态',
      activeStatus:'活动状态',
    },
    prompt:{
      name:'请输入banner名称',
      phoneNumber:'请输入手机号',
      status:'请选择状态',
      linkType:'请选择链接类型',
      serialNumber:'请选择序号',
      shelfTime:'请输入上架时间段',
      source:'请输入来源',
      firm:'请输入所属公司',
      sort:'请选择排序',
      banner:'请上传banner图',
      description:'请输入描述',
      link:'请输入跳转链接',
      thirdPartyUrl:"请输入三方链接",
      thirdPartyUrlType:"请选择三方链接类型",
      displayState:'请选择显示状态',
      activeStatus:'请选择活动状态',
      timeStart:'开始时间',
      timeEnd:'结束时间',
      upTime:'请选择上架时间区间',
      downTime:'请选择下架时间区间',
      bestSize:'建议尺寸720px * 320px',
      timeBetween:'请选择上架时间范围',
    },
    status:[
      {
        desc:'已上架',
        value:1
      },
      {
        desc:'已下架',
        value:0
      }
    ],
    modal:{
      add:'新增banner',
      edit:'编辑banner',
    }
  },
  bannerDraft:{
    urlType:[
      {
        desc:'AppsFlyer推广链接',
        value:0
      },
      {
        desc:'Adjust推广链接',
        value:1
      }
    ],
    add:"新增banner",
    draft:"banner草稿管理",
    saveDraft:"保存为草稿",
    release:"发布",
    activeStatus:[
      {
        desc:'未上架',
        value:0
      },
      {
        desc:'上架中',
        value:1
      },
      {
        desc:'已下架',
        value:2
      }
    ],
    linkType:[
      {
        desc:'apk下载',
        value:0
      },
      {
        desc:'H5下载',
        value:1
      },
      {
        desc:'google下载',
        value:2
      },
      {
        desc:'AppsFlyer推广链接',
        value:3
      },
      {
        desc:'Adjust推广链接',
        value:4
      }
    ],
    displayState:[
      {
        desc:'显示',
        value:1
      },
      {
        desc:'隐藏',
        value:0
      }
    ],
    tabData:{
      id:'ID',
      name:'banner名称',
      description:'描述',
      banner:'banner图',
      linkType:'链接类型',
      link:'跳转链接',
      thirdPartyUrl:"三方链接",
      thirdPartyUrlType:"三方链接类型",
      firm:'所属公司',
      firmName:'公司名称',
      shelfPeriod:'上架期限',
      shelfTime:'上架时间段',
      sort:'排序',
      saveTime:'保存时间',
      operator:'操作人',
      updateTime:'更新时间',
      displayState:'显示状态',
      activeStatus:'活动状态',
    },
    prompt:{
      firmName:'请输入公司名称',
      name:'请输入banner名称',
      phoneNumber:'请输入手机号',
      status:'请选择状态',
      linkType:'请选择链接类型',
      serialNumber:'请选择序号',
      source:'请输入来源',
      firm:'请输入所属公司',
      sort:'请选择排序',
      banner:'请上传banner图',
      description:'请输入描述',
      link:'请输入跳转链接',
      thirdPartyUrl:"请输入三方链接",
      thirdPartyUrlType:"请选择三方链接类型",
      displayState:'请选择显示状态',
      activeStatus:'请选择活动状态',
      timeStart:'开始时间',
      timeEnd:'结束时间'
    },
    status:[
      {
        desc:'已上架',
        value:1
      },
      {
        desc:'已下架',
        value:0
      }
    ],
    modal:{
      add:'新增banner',
      edit:'编辑banner',
    }
  },
  //渠道管理
  channel:{
    copyLong:'复制长链接',
    copyShort:'复制短链接',
    tabData:{
      firmName:'所属公司',
      createTime:'创建时间',
      channelId:'渠道ID',
      packageName:'推广包名',
      channelName:'渠道名称',
      long:'推广长链',
      short:'短链',
      loanIp:'申请服务器IP',
      status:'合作状态',
      modifyTime:'最后操作时间'
    },
    prompt:{
      channelId:'请输入渠道号',
      status:'请选择合作状态',
      firmName:'请输入所属公司',
      packageName:'请选择推广包名',
      channelName:'请输入渠道名称',
      registerIp:'请输入注册成功IP',
      applyIp:'请输入申请成功IP',
      loanIp:'请输入放款成功IP',
      long:'请输入推广长链',
      short:'请输入短链'
    },
    status:[
      {
        desc:'合作中',
        value:1
      },
      {
        desc:'未合作',
        value:0
      }
    ],
    modal:{
      add:'新增渠道',
      edit:'编辑渠道',
      downLoad:'下载SDK'
    }
  },

  // 短信模板
  smsTemplate:{
    state:[
      {
        desc:'激活',
        value:1
      },
      {
        desc:'停用',
        value:0
      }
    ],
    types:[
      {
        desc:'登陆',
        value:0
      },
      {
        desc:'注册',
        value:1
      },
      {
        desc:'修改密码',
        value:2
      },
      {
        desc:'账单',
        value:3
      },
      {
        desc:'贷款产品',
        value:4
      }
    ],
    id:"ID",
    theme:"消息主题",
    inputTheme:"请输入消息主题",
    content:"消息内容",
    inputContent:"请输入消息内容",
    type:"消息类型",
    inputType:"请选择类型",
    status:"状态",
    inputStatus:"请选择状态",
    edit:'配置短信模版',
  },
  //push模板
  pushTemplate:{
    state:[
      {
        desc:'激活',
        value: 'true'
      },
      {
        desc:'停用',
        value: 'false'
      }
    ],
    types:[
      {
        desc:'登陆',
        value:0
      },
      {
        desc:'注册',
        value:1
      },
      {
        desc:'修改密码',
        value:2
      },
      {
        desc:'账单',
        value:3
      },
      {
        desc:'记账',
        value:4
      },
      {
        desc:'贷款产品',
        value:5
      }
    ],
    id:"ID",
    theme:"PUSH推送主题",
    inputTheme:"请输入PUSH推送主题",
    content:"内容",
    inputContent:"请输入内容",
    type:"类型",
    inputType:"请选择类型",
    status:"状态",
    inputStatus:"请选择状态",
    edit:'配置PUSH模版',
  },
  //联系方式
  contactInfo:{
    state:[
      {
        desc:'激活',
        value:1
      },
      {
        desc:'停用',
        value:0
      }
    ],
    id:"ID",
    contact:"联系方式",
    inputContact:"请输入联系方式",
    url:"下载地址",
    inputUrl:"请输入下载地址",
    email:"email",
    inputEmail:"请输入email",

    type:"类型",
    status:"状态",
    inputStatus:"请选择状态",
    edit:'配置联系方式',
  },
  messagePush: {
    id: '序号',
    takeEffectTime: '生效时间',
    selectTime: '请选择生效时间',
    searchDate: '请选择日期',
    sendChannel: '发送渠道',
    selectChannel: '请选择发送渠道',
    messageCenter: '消息中心',
    push: 'push推送',
    messageAndPush: '消息+push',
    messageType: '消息类型',
    selectType: '请选择消息类型',
    messageTitle: '消息标题',
    inputTitle: '请输入消息标题',
    messageText: '消息内容',
    inputText: '请输入消息内容',
    announcement: '公告',
    notice: '通知',
    sendTarget: '发送人群',
    selectTarget: '请选择发送人群',
    allPeople: '所有人',
    sendStaus: '发送状态',
    isSend: '已发送',
    waitSend: '等待发送',
    operator: '操作人',
    search: '搜索',
    reSet: '重置',
    addMessage: '新增消息',
    editMessage: '修改消息'
  },
  // 帮助中心管理
  helpCenter: {
    textFlag:[
      {
        desc:'账单',
        value:1
      },
      {
        desc:'记账',
        value:2
      },
      {
        desc:'贷款',
        value:3
      }
    ],
    isShow:[
      {
        desc:'显示',
        value:1
      },
      {
        desc:'隐藏',
        value:2
      }
    ],
    createTime:"创建日期",
    timeStart:"开始日期",
    timeEnd:"结束日期",
    type: '类型',
    inputType: '请选择类型',
    status:"状态",
    inputStatus:"请选择状态",
    problem:"问题",
    inputProblem:"请输入问题",
    id: 'ID',
    sort: '排序',
    answer: '答案',
    inputAnswer: '请输入答案',
    updater:"更新人",
    updateTime:"更新时间",
    editHelp:"编辑帮助",
    addHelp:"新增帮助"
  },
  //银行管理
  bankManagement:{
    name:"银行名称",
    inputName:"请输入银行名称",
    id:"ID",
    logo:"LOGO",
    sort:"排序",
    editHelp:"编辑银行",
    addHelp:"新增银行"
  },
  //账目类型
  accountType:{
    types:[
      {
        desc:'支出',
        value:1
      },
      {
        desc:'收入',
        value:0
      }
    ],
    loan:"借款",
    name:"账目名称",
    inputName:"请输入账目名称",
    type:"账目类型",
    inputType:"请选择账目类型",
    remarks:"备注",
    inputRemarks:"请输入备注",
    id:"ID",
    logo:"LOGO",
    logo1:"选中后的LOGO",
    sort:"排序",
    editHelp:"编辑账目类型",
    addHelp:"新增账目类型"
  },

  //抽奖活动配置
  sweepstakes:{
    sweepstakes:"抽奖活动配置",
    prizes:"当前活动使用奖品",
    eventDescription:"活动说明",
    viewWinningList:"查看中奖名单",
    editLottery:"编辑抽奖方式",
    managementLotteryPrizes:"管理抽奖奖品",
    editLotteryPrizes:"编辑活动奖品",
    start:"开始抽奖",
    position:"位置",
    id:"奖品ID",
    name:"奖品名称",
    image:"图片",
    viewImage:"查看图片",
    prizeDescription:"奖品说明",
    winningNotice:"中奖告知",
    probability:"中奖概率",
    totalAmount:"总量",
    used:"已用",
    margin:"余量",
    state:"奖品状态",
    status:[
      {
        desc:"有效",
        value:1
      },
      {
        desc:"无效",
        value:0
      },
    ],
    consumeType:[
      {
        desc:"赠送的抽奖次数",
        value:1
      },
      {
        desc:"积分抽奖",
        value:2
      }
    ],
    winningTime:"中奖时间",
    userAccount:"用户账户",
    inputUserAccount:"用户账户",
    prizeRemark:"奖品备注",
    winningPosition:"中奖位置",
    mode:"消费方式",
    prize:"位活动奖品",
    inputId:"请输入奖品ID",
    tip:"抽奖优先消耗抽奖次数",
    attachLottery:"附加抽奖方式",
    selectAttachLottery:"请选择附加抽奖方式",
    attachLotterys:[
      {
        desc:"不允许积分抽奖",
        value:0,
      },
      {
        desc:"允许积分抽奖",
        value:1,
      },
    ],
    consumption:"抽奖一次消费",
    tipConsumption:"请输入0-999999999999",
    inputConsumption:"请输入抽奖一次消费",
    maximum:"每天积分抽奖最高次数",
    inputMaximum:"请选择每天积分抽奖最高次数",
  },
  //抽奖奖品管理
  lotteryPrizes:{
    prompt:{
      id:"请输入奖品ID",
      name:"请输入奖品名称",
      remark:"请输入备注",
      state:"请选择奖品状态",
      image:"请上传图片",
      prizeDescription:"请输入奖品说明",
      winningNotice:"请输入中奖告知",
      probability:"请输入中奖概率",
      type:"请选择奖品类型",
      frequency:"请输入次数",
      prizesNumber:"请输入奖品个数",
      tip:"奖品个数不能少于已用数量",
      input:"请输入个数",
      integral:"请输入积分个数",
      gameCurrency:"请输入游戏币个数",
      redEnvelope:"请输入红包金额",
      unit:"请选择货币单位",
      types:{
        1:"抽奖机会",
        2:"红包",
        3:"游戏币",
        4:"积分",
      }
    },
    add:"新增抽奖奖品",
    edit:"编辑抽奖奖品",
    id:"奖品ID",
    name:"奖品名称",
    remark:"备注",
    image:"图片",
    viewImage:"查看图片",
    prizeDescription:"奖品说明",
    winningNotice:"中奖告知",
    probability:"中奖概率",
    totalAmount:"总量",
    used:"已用",
    margin:"余量",
    state:"奖品状态",
    currencyUnit:[
      {
        desc:"人民币",
        value:1
      },
      {
        desc:"越南币",
        value:2
      },
      {
        desc:"印尼币",
        value:3
      },
      {
        desc:"美元",
        value:4
      },
    ],
    status:[
      {
        desc:"有效",
        value:1
      },
      {
        desc:"无效",
        value:0
      },
    ],
    operator:"操作人",
    UpdateTime:"更新时间",
    type:"奖品类型",
    types:[
      {
        desc:"抽奖机会",
        value:1
      },
      {
        desc:"红包",
        value:2
      },
      {
        desc:"游戏币",
        value:3
      },
      {
        desc:"积分",
        value:4
      },
      {
        desc:"其他",
        value:5
      },
    ],
    again:"再来",
    frequency:"次",
    prizesNumber:"奖品个数",
    redEnvelope:"红包",
    gameCurrency:"游戏币",
    integral:"积分",
    Used:"已使用",
    number:"个"
  },
  //APP链接管理
  appLink:{
    id:"ID",
    theme:"链接主题",
    link:"链接",
    editLink:"编辑链接",
    state:"状态",
    status:[
      {
        desc:"失效",
        value:0
      },
      {
        desc:"激活",
        value:1
      }
    ],
    prompt:{
      theme:"请输入链接主题",
      link:"请输入链接"
    }
  },
  //版本更新
  versionUpdate:{
    id:"ID",
    add:"新增版本更新",
    version:"更新版本号",
    updateType:"更新类型",
    updateContent:"更新内容",
    google:"谷歌市场更新链接",
    server:"服务器更新链接",
    createTime:"创建时间",
    prompt:{
      version:"请输入更新版本号",
      updateType:"请选择更新类型",
      updateContent:"请输入更新内容",
      google:"请输入谷歌市场更新链接",
      server:"请输入服务器更新链接"
    },
    types:[
      {
        desc:'强制更新',
        value:1
      },
      {
        desc:'选择更新',
        value:2
      }
    ]
  }
};

const operationBR = {
  common:{
    add:'Tambah',
    search:'Cari',
    reset:'Setel ulang',
    operating:'Opengoperasian',
    edit:'Edit',
    moveUp:'Bergerak ke atas',
    export:'Ekspor',
    moveDown:'turun',
    delete:'hapus',
    cancel:'batal',
    submit:'sumbit',
    moveUpSuccess:'Bergerak ke atas dengan sukses',
    moveUpMessage:'Sudah di posisi pertama',
    moveDownSuccess:'Bergerak ke bawah dengan sukses',
    moveDownMessage:'Sudah di　posisi terakhir',
    editSuccess:'Berhasil diedit',
    deleteSuccess:'Berhasil dihapus',
    addSuccess:"Berhasil ditambahkan",
    imgSuccess:"Gambar berhasil diunggah",
    copySuccess:"Salin berhasil",
    message:"Silakan masukkan setiap item",
    img:"gambar",
    info:"Lihat detail push",
    errorDate:"Silakan pilih waktu yang tepat",
    timeStart:"waktu mulai",
    timeEnd:"waktu selesai",
    signOut:"Logout",
    login:"Login",
    loginPlease:"Selamat datang login",
    password: 'Silakan masukan kata sandi',
    passwordTip: 'kata sandi tidak boleh kosong',
    username: 'Silakan masukkan nama pengguna',
    usernameTip: 'Nama pengguna tidak boleh kosong',
  },

  'operation-center': 'Pusat Operasi',
  //个人中心
  userInfo:{
    password:"Ubah kata sandi",
    usrInfo:"Informasi pribadi",
    old:"Masukkan kata sandi lama",
    inputOld:"Silakan masukkan kata sandi lama",
    new:"Masukkan kata sandi baru",
    inputNew:"Silakan masukkan kata sandi baru",
    repeatNew:"Ulangi kata sandi baru",
    inputRepeatNew:"Silakan Ulangi kata sandi baru",
    error:"dua kali Kata sandi yang dimasukkan tidak sama",
    name: "Nama asli",
    inputName: "Silakan masukkan nama asli Anda",
    department: "Departemen",
    inputDepartment: "Masukkan departemen",
    post: "pekerjaan",
    inputPost: "Silakan masukkan pekerjaan",
    permission: "perIzinan",
    inputPermission: "Silakan masukkan perizinan",
    phone: "nomor telepon",
    inputPhone: "Silakan masukkan nomor telepon Anda",
    mailbox: "email",
    inputMailbox: "Silakan masukkan email",
  },
  //产品配置
  product:{
    add:"Produk pinjaman baru",
    draft:"Draft manajemen produk pinjaman",
    saveDraft:"Simpan sebagai Draft",
    release:"Terbitkan",
    urlType:[
      {
        desc:'Tautan promosi AppsFlyer',
        value:0
      },
      {
        desc:'Tautan promosi Adjust',
        value:1
      }
    ],
    comment:"Ulasan manajemen",
    feedback:[
      "Aktifkan modul umpan balik "," Tutup modul umpan balik"
    ],
    // feedbackOff:"关闭反馈模块",
    // feedbackON:"开启反馈模块",
    bestSize:"Ukuran yang disarankan 120px * 120px",
    selectWhat:[
      {
        desc:'perusahaan',
        value:'company'
      },
      {
        desc:'produk',
        value:'productName'
      }
    ],
    monetaryUnit:[
      {
        desc:'RP',
        value:0
      },
    ],
    activeStatus:[
      {
        desc:'belum ditaruh di rak',
        value:0
      },
      {
        desc:'di rak',
        value:1
      },
      {
        desc:'diturunkan dari rak',
        value:2
      }
    ],
    displayState:[
      {
        desc:'Tampilkan',
        value:1
      },
      {
        desc:'Sembunyikan',
        value:0
      }
    ],
    linkType:[
      {
        desc:'unduh di Google',
        value:0
      },
      {
        desc:'unduh apk',
        value:1
      },{
        desc:'unduh H5',
        value:2
      },
      {
        desc:'Tautan promosi AppsFlyer',
        value:3
      },
      {
        desc:'Tautan promosi Adjust',
        value:4
      }
    ],
    unit:[
      {
        desc:'Hari',
        value:0
      },
      {
        desc:'Minggu',
        value:1
      },
      {
        desc:'Bulan',
        value:2
      },
      {
        desc:'Tahun',
        value:3
      }
    ],
    processDays:[
      {
        desc:'Detik',
        value:0
      },
      {
        desc:'Menit',
        value:1
      },
      {
        desc:'jam',
        value:2
      },
      {
        desc:'hari',
        value:3
      },
      {
        desc:'minggu',
        value:4
      },
      {
        desc:'bulan',
        value:5
      }
    ],
    interestRate:[
      {
        desc:'>',
        value:0
      },
      {
        desc:'<',
        value:1
      },
      {
        desc:'==',
        value:2
      },
      {
        desc:'>=',
        value:3
      },
      {
        desc:'<=',
        value:4
      },
      {
        desc:'sekitar',
        value:5
      },
      {
        desc:'Rendah',
        value:6
      },
      {
        desc:'paling rendah',
        value:7
      }
    ],
    rate:[
      {
        desc:'Suku bunga harian',
        value:0
      },
      {
        desc:'Suku bunga bulanan',
        value:1
      },
      {
        desc:'Suku bunga tahunan',
        value:2
      }
    ],
    tabData:{
      id:'ID',
      name:'Nama APP',
      firm:'perusahaan yang dimiliki',
      icon:'Ikon',
      max:'Jumlah pinjaman maksimum',
      loanDays:'Jangka waktu pinjaman',
      interestRate:'Suku bunga',
      processDays:'Durasi pencairan',
      arrivalTime:'waktu terima pencairan',
      dateAdded:"Tanggal Peluncuran di Google",
      linkType:'Jenis tautan',
      thirdPartyUrl:"Tautan tripartit",
      thirdPartyUrlType:"Jenis tautan tiga pihak",
      get:'unduh hoplinks',
      borrowingRequirements:'Persyaratan pinjaman',
      borrowingProcess:"Proses peminjaman",
      shelfPeriod:'Batas waktu ditambahkan',
      shelfTime:'Menambahkan periode waktu',
      sort:'Sortir',
      createTime:'Waktu pembuatan',
      operator:'Operator',
      updateTime:'Perbarui waktu',
      displayState:'Tampilkan status',
      activeStatus:'Keadaan aktif',
      ShelfTime:'waktu ditaruh di rak',
      ObtainedTime:'waktu diturunkan dari rak',

      whether:'Produk baru',
      ksp:'KSP',
      staging:'pencicilan',
      time:'Waktu kedaluwarsa produk baru',

      slogan:'Slogan',
      status:'Status diterbitkan',
      feature:"Keunggulan produk",
      claim:"request",
      process:"Proses peminjaman",

      description:"Unduh deskripsi",
      application:"Deskripsi aplikasi",
      reviewProcess:"Proses peninjauan",
      lendingProcess:"Proses Pencairan dana",
      repaymentProcess:"Proses pembayaran",

      info:"Isi informasi",
      repayment:"Pelunasan",

    },
    prompt:{
      sort:'Silakan pilih',
      whether:'Silakan pilih apakah　produk ini baru',
      time:'Silakan masukkan waktu kedaluwarsa produk baru',
      name:'Silakan masukkan nama produk',
      status:'Silakan pilih status',
      linkType:'Silakan pilih jenis tautan',
      thirdPartyUrl:"Silakan masuk Tautan tripartit",
      thirdPartyUrlType:"Silakan masuk Jenis tautan tiga pihak",
      serialNumber:'Silakan pilih nomor seri',
      icon:'Harap unggah ikon',
      firm:'Silakan masukkan perusahaan Anda',
      max:'Silakan masukkan jumlah pinjaman maksimum',
      processDays:'Masukkan waktu pencairan',
      interestRate:'Silakan masukkan suku bunga',
      interestRateType:'Silakan pilih Jenis Suku Bunga',
      dailyInterestRate:'Silakan masukkan tarif harian terendah',
      slogan:'Silakan masukkan slogan',
      get:'Silakan masukkan tautan unduhan',
      claim:"Silakan masukkan permintaan",
      loanDaysMin:'Silakan masukkan periode pinjaman minimum',
      loanDaysMax:'Silakan masukkan jangka waktu pinjaman maksimum',
      process:"Proses Pinjaman",
      description:"Silakan masukkan deskripsi unduhan",
      application:"Silakan masukkan deskripsi aplikasi",
      reviewProcess:"Silakan masukkan proses peninjauan",
      lendingProcess:"Silakan masukkan proses pencairan dana",
      repaymentProcess:"Silakan masukkan proses pembayaran",
      feature:"Silakan masukkan keunggulan produk",
      dateAdded:"Silakan masukkan tanggal Silakan cantuman Google",
      displayState:'Silakan pilih status tampilan',
      activeStatus:'Silakan pilih status aktif',
      unit:'Silakan pilih satu unit',
      loanPeriodUnit:'Silakan pilih satu unit',
      monetaryUnit:'Silakan pilih unit mata uang',
      loanProductRequires:"Persyaratan Pinjaman",
      shelfTime:'Silakan masukkan periode waktu terbit',
      timeStart:'waktu mulai',
      timeEnd:'waktu selesai',
      timeBetween:'Silakan pilih jangka waktu di rak',
    },
    status:[
      {
        desc:'di rak',
        value:1
      },
      {
        desc:'diturunkan dari rak',
        value:0
      }
    ],
    state:[
      {
        desc:'iya',
        value:1
      },
      {
        desc:'tidak',
        value:0
      }
    ],
    modal:{
      add:'Produk baru',
      edit:'Edit produk',
    }
  },
  //产品草稿
  productDraft:{
    urlType:[
      {
        desc:'Tautan promosi AppsFlyer',
        value:0
      },
      {
        desc:'Tautan promosi Adjust',
        value:1
      }
    ],
    productName:"Nama Produk",
    firmName:"Nama Perusahaan",
    prompt:{
      productName:'Silakan masukkan nama produk',
      firmName:'Silakan masukkan perusahaan Anda',
      sort:'Silakan pilih untuk menyortir',
      whether:'Silakan pilih apakah ini produk baru',
      time:'Silakan masukkan waktu kedaluwarsa produk baru',
      status:'Silakan pilih status',
      linkType:'Silakan pilih jenis tautan',
      thirdPartyUrl:"Silakan masuk Tautan tripartit",
      thirdPartyUrlType:"Silakan masuk Jenis tautan tiga pihak",
      serialNumber:'Silakan pilih nomor seri',
      icon:'Tolong unggah ikon',
      max:'Silakan masukkan jumlah pinjaman maksimum',
      processDays:'Silakan masukkan waktu Durasi pencairan dana',
      interestRate:'Silakan masukkan suku bunga harian',
      interestRateType:'Silakan pilih Jenis Suku Bunga',
      dailyInterestRate:'Silakan masukkan tarif harian terendah',
      slogan:'Silakan masukkan slogan',
      get:'Silakan masukkan hoplinks unduhan',
      claim:"Silakan masukkan permintaan",
      loanDaysMin:'Silakan masukkan periode pinjaman minimum',
      loanDaysMax:'Silakan masukkan jangka waktu pinjaman maksimum',
      process:"Proses Pinjaman",
      description:"Silakan masukkan deskripsi unduhan",
      application:"Silakan masukkan deskripsi aplikasi",
      reviewProcess:"Silakan masukkan proses review",
      lendingProcess:"Silakan masukkan proses pencairan dana",
      repaymentProcess:"Silakan masukkan proses pembayaran",
      feature:"Silakan masukkan keunggulan produk",
      dateAdded:"Silakan masukkan tanggal di rak Google",
      displayState:'Silakan pilih status tampilan',
      activeStatus:'Silakan pilih status aktif',
      unit:'Silakan pilih satu unit',
      loanPeriodUnit:'Silakan pilih satu unit',
      loanProductRequires:"Persyaratan Pinjaman",
      shelfTime:'Silakan masukkan periode waktu di rak',
      timeStart:'waktu mulai',
      timeEnd:' waktu selesai'
    },
    tabData:{
      thirdPartyUrl:"Tautan tripartit",
      thirdPartyUrlType:"Jenis tautan tiga pihak",
      saveTime:"waktu menyimpan",
      appName:"Nama APP",
      firm:"perusahaan yg dimiliki",
      icon:'ikon',
      max:'Jumlah maksimum yang bisa dipinjam',
      loanDays:'Periode Pinjaman',
      interestRate:'Suku Bunga',
      processDays:'waktu pencairan',
      arrivalTime:'waktu terima transferan',
      get:'hoplinks',
      shelfPeriod:'batas waktu di rak',
      shelfTime:'waktu periode di rak',
      sort:'sortir',
      createTime:'Waktu pembuatan',
      displayState:'Tampilkan status',
      activeStatus:'Keadaan aktif'
    },
    activeStatus:[
      {
        desc:'belum ada di rak',
        value:0
      },
      {
        desc:'di rak',
        value:1
      },
      {
        desc:'diturunkan dari rak',
        value:2
      }
    ],
    displayState:[
      {
        desc:'Tampilkan',
        value:1
      },
      {
        desc:'Sembunyikan',
        value:0
      }
    ],
    linkType:[
      {
        desc:'unduh Google',
        value:0
      },
      {
        desc:'unduh apk',
        value:1
      },
      {
        desc:'Tautan promosi AppsFlyer',
        value:3
      },
      {
        desc:'Tautan promosi Adjust',
        value:4
      }
    ],
    unit:[
      {
        desc:'hari',
        value:0
      },
      {
        desc:'minggu',
        value:1
      },
      {
        desc:'bulan',
        value:2
      },
      {
        desc:'tahun',
        value:3
      }
    ],
    processDays:[
      {
        desc:'detik',
        value:0
      },
      {
        desc:'menit',
        value:1
      },
      {
        desc:'jam',
        value:2
      },
      {
        desc:'hari',
        value:3
      },
      {
        desc:'minggu',
        value:4
      }
    ],
    interestRate:[
      {
        desc:'>',
        value:0
      },
      {
        desc:'<',
        value:1
      },
      {
        desc:'==',
        value:2
      },
      {
        desc:'>=',
        value:3
      },
      {
        desc:'<=',
        value:4
      }
    ],
  },
  //评论
  commentManagement:{
    add:"Tambahkan komentar",
    hide:"Sembunyikan",
    show:"Tampilkan",
    edit:"edit",
    status:[
      {
        desc:"Tampilkan",
        value:1
      },
      {
        desc:"sembunyikan",
        value:0
      }
    ],
    creator:[
      {
        desc:"Pengguna",
        value:0
      },
      {
        desc:"administrator",
        value:1
      }
    ],
    tableData:{
      selectAll:"Pilih Semua",
      commentTime:"Waktu komentar",
      commentState:"Status komentar",
      hide:"Sembunyikan opsi centang",
      show:"Tampilkan opsi centang",
      hideAll:"Sembunyikan semua",
      showAll:"Tunjukkan semua",
      creator:"kreator",
      account:"Akun pengguna",
      comments:"Isi konmentar",
      virtualAccount:"Virtual Account",
      virtualAvatar:"Avatar virtual",
      virtualComments:"isi komentar Virtual"
    },
    prompt:{
      commentState:"Silakan pilih status komentar",
      creator:"Silakan pilih pembuatnya",
      account:"Silakan masukkan akun pengguna",
      comments:"Silakan masukkan komentar",
      timeStart:'waktu mulai',
      timeEnd:'waktu selesai',
      virtualAccount:"silakan masukan Virtual Account",
      virtualAvatar:" silakan masukan Avatar virtual",
      virtualComments:"Silakan masukkan komentar virtual",
      tip:"Panjang akun tidak boleh kurang dari 4"
    },
  },
  //banner配置
  banner:{
    urlType:[
      {
        desc:'Tautan promosi AppsFlyer',
        value:0
      },
      {
        desc:'Tautan promosi Adjust',
        value:1
      }
    ],
    add:"Tambahkan banner",
    draft:"manajemen konsep banner",
    saveDraft:"Simpan sebagai konsep",
    release:"Terbitkan",
    selectWhat:[
      {
        desc:'perusahaan',
        value:'company'
      },
      {
        desc:'banner',
        value:'bannerSource'
      }
    ],
    activeStatus:[
      {
        desc:'Semua',
        value:''
      },
      {
        desc:'belum ada di rak',
        value:0
      },
      {
        desc:'di rak',
        value:1
      },
      {
        desc:'di turunkan dari rak',
        value:2
      }
    ],
    linkType:[
      {
        desc:'unduk apk',
        value:0
      },
      {
        desc:'unduh H5',
        value:1
      },
      {
        desc:'Unduh google',
        value:2
      },
      {
        desc:'Tautan promosi AppsFlyer',
        value:3
      },
      {
        desc:'Tautan promosi Adjust',
        value:4
      }
    ],
    displayState:[
      {
        desc:'semua',
        value:''
      },
      {
        desc:'tampilkan',
        value:1
      },
      {
        desc:'sembunyikan',
        value:0
      }
    ],
    tabData:{
      id:'ID',
      name:'nama banner',
      description:'deskripsi banner ',
      banner:'gambar banner',
      linkType:'Jenis tautan',
      link:'hoplinks',
      thirdPartyUrl:"Tautan tripartit",
      thirdPartyUrlType:"Jenis tautan tiga pihak",
      upTime:'waktu di rak',
      downTime:'waktu diturunkan dari rak',
      firm:'perusahaan yg di miliki',
      shelfPeriod:'waktu di rak',
      shelfTime:'waktu periode di rak',
      sort:'sortir ',
      createTime:'Waktu pembuatan',
      operator:'operator',
      updateTime:'Perbarui waktu',
      displayState:'Tampilkan status',
      activeStatus:'keadaan aktif',
    },
    prompt:{
      name:'Silakan masukkan nama banner',
      phoneNumber:'Silakan masukkan nomor telepon Anda',
      status:'Silakan pilih status',
      linkType:'Silakan pilih jenis tautan',
      serialNumber:'Silakan pilih nomor seri',
      shelfTime:'Silakan masukkan periode waktu di rak',
      source:'Silakan masukkan periode daftar',
      firm:'Silakan masukkan perusahaan Anda',
      sort:'Silakan pilih sortir',
      banner:'Harap unggah banner',
      description:'Silakan masukkan deskripsi',
      link:' Silakan masukkan hoplinks',
      thirdPartyUrl:"Silakan masuk Tautan tripartit",
      thirdPartyUrlType:"Silakan masuk Jenis tautan tiga pihak",
      displayState:' Silakan pilih status tampilan',
      activeStatus:'Silakan pilih status aktivitas',
      timeStart:'waktu mulai ',
      timeEnd:'waktu selesai',
      upTime:'Silakan pilih zona waktu di rak',
      downTime:'Silakan pilih jangka waktu untuk turun dari rak',
      bestSize:'Ukuran yang disarankan 720px * 320px',
      timeBetween:'Silakan pilih jangka waktu di rak',
    },
    status:[
      {
        desc:'di rak',
        value:1
      },
      {
        desc:'diturunkan dari rak',
        value:0
      }
    ],
    modal:{
      add:'Tambahkan banner',
      edit:'edit banner',
    }
  },
  bannerDraft:{
    urlType:[
      {
        desc:'Tautan promosi AppsFlyer',
        value:0
      },
      {
        desc:'Tautan promosi Adjust',
        value:1
      }
    ],
    add:"Tambahkan banner",
    draft:"manajemen konsep banner",
    saveDraft:"Simpan sebagai konsep",
    release:"terbitkan",
    activeStatus:[
      {
        desc:'belum ada di rak',
        value:0
      },
      {
        desc:'di dalam rak',
        value:1
      },
      {
        desc:'diturunkan dari rak',
        value:2
      }
    ],
    linkType:[
      {
        desc:'unduh apk',
        value:0
      },
      {
        desc:'unduh H5',
        value:1
      },
      {
        desc:'Unduh google',
        value:2
      },
      {
        desc:'Tautan promosi AppsFlyer',
        value:3
      },
      {
        desc:'Tautan promosi Adjust',
        value:4
      }
    ],
    displayState:[
      {
        desc:'tampilkan',
        value:1
      },
      {
        desc:'sembunyikan',
        value:0
      }
    ],
    tabData:{
      id:'ID',
      name:'nama banner',
      description:'deskripsi',
      banner:'gambar banner',
      linkType:'Jenis tautan',
      link:'hopslink',
      thirdPartyUrl:"Tautan tripartit",
      thirdPartyUrlType:"Jenis tautan tiga pihak",
      firm:'perushaan yg dimiliki',
      firmName:'nama perusahaan',
      shelfPeriod:'batas waktu di rak',
      shelfTime:'waktu periode di rak',
      sort:'sortir ',
      saveTime:'waktu menyimpan ',
      operator:'Operator',
      updateTime:'Perbarui waktu',
      displayState:'Tampilkan status',
      activeStatus:'Keadaan aktif',
    },
    prompt:{
      firmName:'Silakan masukkan nama perusahaan',
      name:'Silakan masukkan nama banner',
      phoneNumber:'Silakan masukkan nomor telepon Anda',
      status:' Silakan pilih status',
      linkType:'Silakan pilih jenis tautan',
      serialNumber:'Silakan pilih nomor seri',
      source:'Silakan masukkan sumber',
      firm:'Silakan masukkan perusahaan Anda',
      sort:'Silakan pilih sortir',
      banner:'Harap unggah banner',
      description:'Silakan masukkan deskripsi',
      link:'silakan Masukkan hoplinks',
      thirdPartyUrl:"Silakan masuk Tautan tripartit",
      thirdPartyUrlType:"Silakan masuk Jenis tautan tiga pihak",
      displayState:'Silakan pilih status tampilan',
      activeStatus:'Silakan pilih status aktivitas',
      timeStart:'waktu mulai',
      timeEnd:'waktu selesai'
    },
    status:[
      {
        desc:'di rak',
        value:1
      },
      {
        desc:'di turunkan dari rak',
        value:0
      }
    ],
    modal:{
      add:'tambahkan banner',
      edit:'edir banner',
    }
  },
  //渠道管理
  channel:{
    copyLong:'Salin tautan panjang',
    copyShort:'Salin tautan pendek',
    tabData:{
      firmName:'perusahaan yg dimiliki',
      createTime:'Waktu pembuatan',
      channelId:' ID Saluran ',
      packageName:'Nama paket promosi',
      channelName:'Nama saluran',
      long:'Promosikan tautan panjang',
      short:'tautan pendek',
      loanIp:'IP server aplikasi',
      status:'Status kerjasama',
      modifyTime:'Waktu operasi terakhir'
    },
    prompt:{
      channelId:'Silakan masukkan nomor saluran',
      status:'Silakan pilih status kerjasama',
      firmName:'Silakan masukkan perusahaan Anda',
      packageName:'Silakan pilih nama paket promosi',
      channelName:'Silakan masukkan nama saluran',
      registerIp:'Silakan masukkan IP yg berhasil terdaftar',
      applyIp:'Silakan masukkan IP pengajuan aplikasi yang berhasil',
      loanIp:'Silakan masukkan IP pencairan dana yang berhasil',
      long:'Silakan masukkan promosi tautan panjang',
      short:'Silakan masukkan promosi tautan pendek'
    },
    status:[
      {
        desc:'dalam kerja sama',
        value:1
      },
      {
        desc:'belum kerjasama',
        value:0
      }
    ],
    modal:{
      add:'belum kerjasama',
      edit:'Mengedit saluran',
      downLoad:'Unduh SDK'
    }
  },

  // 短信模板
  smsTemplate:{
    state:[
      {
        desc:'Aktifkan',
        value:1
      },
      {
        desc:'Dinonaktifkan',
        value:0
      }
    ],
    types:[
      {
        desc:'Login',
        value:0
      },
      {
        desc:'mendaftar',
        value:1
      },
      {
        desc:'Ubah kata sandi',
        value:2
      },
      {
        desc:'tagihan',
        value:3
      },
      {
        desc:'Produk Pinjaman',
        value:4
      }
    ],
    id:"ID",
    theme:"Subjek pesan",
    inputTheme:" silakan masukan subjek pesan",
    content:"Isi pesan",
    inputContent:"Silakan masukkan isi pesan",
    type:"Jenis pesan",
    inputType:"Silakan pilih jenis",
    status:"Status",
    inputStatus:"Silakan pilih status",
    edit:'Konfigurasikan templat SMS',
  },
  //push模板
  pushTemplate:{
    state:[
      {
        desc:'aktifkan',
        value: 'true'
      },
      {
        desc:'Dinonaktifkan',
        value: 'false'
      }
    ],
    types:[
      {
        desc:'Login',
        value:0
      },
      {
        desc:'mendaftar',
        value:1
      },
      {
        desc:'ubah kanta sandi',
        value:2
      },
      {
        desc:'tagihan',
        value:3
      },
      {
        desc:'Pembukuan',
        value:4
      },
      {
        desc:'Produk Pinjaman',
        value:5
      }
    ],
    id:"ID",
    theme:"Subjek PUSH",
    inputTheme:"Silakan masukan Subjek PUSH",
    content:"isi",
    inputContent:"silakan masukan isi",
    type:"Jenis",
    inputType:"Silakan pilih jenis",
    status:"status",
    inputStatus:"Silakan pilih status",
    edit:'Silakan pilih status',
  },
  //联系方式
  contactInfo:{
    state:[
      {
        desc:'aktifkan',
        value:1
      },
      {
        desc:'Dinonaktifkan',
        value:0
      }
    ],
    id:"ID",
    contact:"informasi kontak",
    inputContact:"silakan masukan informasi kontak",
    url:"unduh alamat",
    inputUrl:"Silakan masukkan alamat unduhan",
    email:"email",
    inputEmail:"silakan masukan email",

    type:"jenis",
    status:"status",
    inputStatus:"Silakan pilih status",
    edit:'Konfigurasikan kontak',
  },
  messagePush: {
    id: 'Nomor seri',
    takeEffectTime: 'waktu efektif',
    selectTime: 'Silakan pilih waktu yang efektif',
    searchDate: 'Silakan pilih tanggal',
    sendChannel: 'Kirim saluran',
    selectChannel: 'Silakan pilih saluran pengiriman',
    messageCenter: 'Pusat Pesan',
    push: 'PUSH Dorong',
    messageAndPush: 'Pesan + push',
    messageType: 'Jenis pesan',
    selectType: 'Silakan pilih jenis pesan',
    messageTitle: 'Judul pesan',
    inputTitle: 'Silakan masukkan judul pesan',
    messageText: 'isi pesan',
    inputText: 'Silakan masukkan isi pesan',
    announcement: 'Pengumuman',
    notice: 'Pemberitahuan',
    sendTarget: 'Kirim ke orang banyak ',
    selectTarget: 'Silakan pilih ke orang banyak',
    allPeople: 'Semuanya',
    sendStaus: ' Kirim status',
    isSend: 'Terkirim',
    waitSend: 'Menunggu untuk dikirim',
    operator: 'operator',
    search: 'Cari',
    reSet: 'Setel ulang',
    addMessage: 'Pesan baru',
    editMessage: 'Ubah pesan'
  },
  // 帮助中心管理
  helpCenter: {
    textFlag:[
      {
        desc:'tagihan',
        value:1
      },
      {
        desc:' Pembukuan',
        value:2
      },
      {
        desc:'Pinjaman',
        value:3
      }
    ],
    isShow:[
      {
        desc:'Tampilkan',
        value:1
      },
      {
        desc:'Sembunyikan',
        value:2
      }
    ],
    createTime:"Tanggal pembuatan",
    timeStart:"waktu mulai",
    timeEnd:"waktu selesai",
    type: 'jenis',
    inputType: 'Silakan pilih jenis',
    status:"status",
    inputStatus:"Silakan pilih status",
    problem:"Masalah",
    inputProblem:"Silakan masukkan pertanyaan",
    id: 'ID',
    sort: 'sortir',
    answer: 'Jawaban',
    inputAnswer: 'Silakan masukkan jawaban',
    updater:"updeter",
    updateTime:"updeter",
    editHelp:"Edit bantuan",
    addHelp:"Tambahkan bantuan"
  },
  //银行管理
  bankManagement:{
    name:"Nama bank",
    inputName:"Silakan masukkan nama bank",
    id:"ID",
    logo:"LOGO",
    sort:"sortir",
    editHelp:"Edit Bank",
    addHelp:"Tambahkan bank"
  },
  //账目类型
  accountType:{
    types:[
      {
        desc:'Pengeluaran',
        value:1
      },
      {
        desc:'Penghasilan',
        value:0
      }
    ],
    loan:"pinjaman",
    name:"Nama akun",
    inputName:"Silakan masukkan nama akun",
    type:"Jenis akun",
    inputType:"Silakan pilih jenis akun",
    remarks:"catatan",
    inputRemarks:"Silakan masukkan komentar",
    id:"ID",
    logo:"LOGO",
    logo1:"LOGO yang dipilih",
    sort:" sortir",
    editHelp:"Edit jenis akun",
    addHelp:"Jenis Akun Baru"
  },

  //抽奖活动配置
  sweepstakes:{
    sweepstakes:"Konfigurasi undian",
    prizes:"Hadiah untuk acara terkini",
    eventDescription:"Deskripsi aktivitas",
    viewWinningList:"Lihat daftar pemenang",
    editLottery:"Edit undian",
    managementLotteryPrizes:"manajemen hadiah undian",
    editLotteryPrizes:"Edit hadiah undian",
    start:"Mulai undian",
    position:"Lokasi",
    id:"ID Hadiah",
    name:"Nama hadiah",
    image:"gambar",
    viewImage:"Lihat gambar",
    prizeDescription:"Deskripsi hadiah",
    winningNotice:"Pemberitahuan kemenangan",
    probability:"Probabilitas menang",
    totalAmount:"jumlah total",
    used:"jsudah digunakan",
    margin:"margin",
    state:"Status hadiah",
    status:[
      {
        desc:" valid",
        value:1
      },
      {
        desc:" tidak valid",
        value:0
      },
    ],
    consumeType:[
      {
        desc:"Jumlah hadiah undian",
        value:1
      },
      {
        desc:"Undian poin",
        value:2
      }
    ],
    winningTime:"Waktu menang",
    userAccount:"Akun pengguna",
    inputUserAccount:"Akun pengguna",
    prizeRemark:"Keterangan Hadiah",
    winningPosition:"Posisi menang",
    mode:"Metode konsumsi",
    prize:"Hadiah acara",
    inputId:"Silakan masukkan ID hadiah",
    tip:"Undian menarik prioritas pada frekuansi undian",
    attachLottery:"Undian tambahan",
    selectAttachLottery:"Silakan pilih undian tambahan",
    attachLotterys:[
      {
        desc:"Pengundian poin tidak diizinkan",
        value:0,
      },
      {
        desc:"Pengundian poin diIzinkan",
        value:1,
      },
    ],
    consumption:"Undi sekali lagi",
    tipConsumption:"Silakan masukkan 0-999999999999",
    inputConsumption:"Silakan masukkan undian sekali lagi",
    maximum:"Jumlah maksimum poin undian per hari",
    inputMaximum:"Silakan pilih jumlah poin undian maksimum per hari",
  },
  //抽奖奖品管理
  lotteryPrizes:{
    prompt:{
      id:"Silakan masukkan ID hadiah",
      name:"Silakan masukkan nama hadiah",
      remark:"Silakan masukkan catatan",
      state:"Silakan pilih status hadiah",
      image:"Unggah gambar",
      prizeDescription:"Silakan masukkan deskripsi hadiah",
      winningNotice:"Silakan masukkan pemberitahuan yang menang",
      probability:"Silakan masukkan probabilitas menang",
      type:"Silakan pilih jenis hadiah",
      frequency:"Silakan masukkan nomor frekuansi",
      prizesNumber:"Silakan masukkan jumlah hadiah",
      tip:"Jumlah hadiah tidak boleh kurang dari jumlah yang digunakan",
      input:"Silakan masukkan nomor",
      integral:"Silakan masukkan jumlah poin",
      gameCurrency:"Silakan masukkan jumlah koin game",
      redEnvelope:"Silakan masukkan jumlah angpao",
      unit:"Silakan pilih mata uang",
      types:{
        1:"Peluang undian",
        2:"angpao",
        3:"uang game",
        4:"poin",
      }
    },
    add:"Nama hadiah",
    edit:"Edit Hadiah Undian",
    id:"ID Hadiah",
    name:"Nama hadiah",
    remark:"catatan",
    image:"gambar",
    viewImage:" lihat gambar",
    prizeDescription:"Deskripsi hadiah",
    winningNotice:"Pemberitahuan kemenangan",
    probability:"Probabilitas menang",
    totalAmount:"total jumlah",
    used:"sudah digunakan",
    margin:"margin",
    state:"Status hadiah",
    currencyUnit:[
      {
        desc:"RMB",
        value:1
      },
      {
        desc:"Uang Vietnam",
        value:2
      },
      {
        desc:"Rupiah",
        value:3
      },
      {
        desc:"USD",
        value:4
      },
    ],
    status:[
      {
        desc:"valid",
        value:1
      },
      {
        desc:"tidak valid",
        value:0
      },
    ],
    operator:"operator",
    UpdateTime:"Perbarui waktu",
    type:"Jenis hadiah",
    types:[
      {
        desc:"Peluang undian",
        value:1
      },
      {
        desc:"angpao",
        value:2
      },
      {
        desc:"RMB",
        value:3
      },
      {
        desc:"Poin",
        value:4
      },
      {
        desc:"lainnya",
        value:5
      },
    ],
    again:"",
    frequency:"kali lebih banyak",
    prizesNumber:"Jumlah hadiah",
    redEnvelope:"angpao",
    gameCurrency:"RMB",
    integral:"poin",
    Used:"",
    number:"yang sudah digunakan"
  },
  //APP链接管理
  appLink:{
    id:"ID",
    theme:"topik Tautkan",
    link:"Tautan",
    editLink:"edit link",
    state:"status",
    status:[
      {
        desc:"invalid",
        value:0
      },
      {
        desc:"aktifkan",
        value:1
      }
    ],
    prompt:{
      theme:"Silakan masukkan subjek tautan",
      link:"Silakan masukkan tautan"
    }
  },
  //版本更新
  versionUpdate:{
    id:"ID",
    add:"Pembaruan versi baru",
    version:"Perbarui nomor versi",
    updateType:"Jenis pembaruan",
    updateContent:"Perbarui Isi",
    google:"Link Perbaruan Google play",
    server:"Tautan pembaruan server",
    createTime:"Waktu pembuatan",
    prompt:{
      version:"Silakan masukkan nomor versi yang diperbarui",
      updateType:"Silakan pilih jenis pembaruan",
      updateContent:"Silakan masukkan isi pembaruan",
      google:"Silakan masukkan tautan Pembaruan Google play",
      server:"Silakan masukkan tautan pembaruan server"
    },
    types:[
      {
        desc:'memperbarui',
        value:1
      },
      {
        desc:'Pilih pembaruan',
        value:2
      }
    ]
  }
};

export {
  operationCN,
  operationBR
}

