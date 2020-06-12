const userInfoCN = {
  'user-manage': '用户中心',
  // 用户列表
  'user-list': '用户列表',
  userList: {
    methods:[
      {
        desc:"复制链接",
        value:1
      },
      {
        desc:"facebook",
        value:2
      },
      {
        desc:"twiter",
        value:3
      },
      {
        desc:"领英",
        value:5
      },
      {
        desc:"whatsApp",
        value:4
      }
    ],
    sources:[
      {
        desc:"小游戏",
        value:1
      },
      {
        desc:"抽奖",
        value:2
      },
      {
        desc:"邀请好友",
        value:3
      },
      {
        desc:"贷款详情页",
        value:4
      }
    ],
    userNo: "序号",
    edit:"编辑账户征信状态",
    fallTime:"落库时间",
    userName: "用户昵称",
    email: "邮箱账户",
    createTime: "注册日期",
    modifyTime: "更新时间",
    status: "账户状态",
    userInfo:'查看用户详情',
    naomal: "正常",
    shield: "屏蔽",
    closing: "封号",
    action: "操作",
    showMore: "查看详情",
    error: "错误：",
    inputPlaceHolder: "请输入内容...",
    search: "搜索",
    reset: "重置",
    userId: "用户ID",
    phoneNumber: "手机号",
    countryPrefix:"国际区号",
    identityCard:"身份证KTP",
    companyName:"公司名称",
    registerTime: "注册日期",
    listType: "名单类型",
    listAttribution: "名单归属",
    blackType: "黑名单",
    whiteType: "白名单",
    proIna: "印尼产品",
    proMart: "贷超渠道",
    laidOut:"已放款-首借",
    finalReview:"终审拒件",
    remarks:"备注",
    overdue:"逾期" ,
    loanOverdue:"已放款-复借逾期",
    machineReview:"机审拒件",
    initialReview:"初审拒件",
    other:"其他",
    inputRemarks:"请输入备注",
    userLevel:'用户等级',
    membershipLevel:'会员等级',
    registrationSource:'平台推荐来源',
    invitationMethod:'邀请方式',
    inputSource:'请选择平台推荐来源',
    inputMethod:'请选择邀请方式',
    invitePeople:'邀请人',
    money:"赠送金额",
    packageName:'注册使用包',
    startTime:"开始时间",
    endTime:"结束时间",
    customerSource:"客户来源",
    import:"导入",
    importTitle:"导入黑名单",
    export:"导出",
    down:"下载模板",
    source:[
      {
        desc:"贷超",
        value:0
      },
      {
        desc:"管理员导入",
        value:1
      },
      {
        desc:"星河数据",
        value:2
      },
      {
        desc:"自建贷款产品",
        value:3
      }
    ],
    white:{
      account:"用户账户",
      prompt:"请选择征信状态",
      state:"征信状态",
      status:[
        {
          desc:"正常",
          value:0
        },
        {
          desc:"黑名单",
          value:1
        },
      ]
    },
    updateTime:"征信状态更新时间",
    state:[
      {
        desc:"正常",
        value:1
      },
      {
        desc:"屏蔽",
        value:2
      },
      {
        desc:"封号",
        value:1
      }
    ],
    prompt:{
      customerSource:"请输入客户来源",
      phoneNumber: "手机号",
      creditStatus:"请选择征信状态"
    }
  },
  // 用户详情
  'user-detail': '用户详情',
  userDetail:{
    basicInfo:'基本信息',
    createTime: "注册日期",
    userId: "用户ID",
    phoneNumber: "手机号",
    timeStart:"开始时间",
    timeEnd:"结束时间",
    billList:"账单列表",
    userLevel:'用户等级',
    membershipLevel:'会员等级',
    walletBalance:'钱包余额',
    state:[
      {
        desc:"未出账",
        value:1
      },
      {
        desc:"待还款",
        value:2
      },
      {
        desc:"逾期",
        value:3
      },
      {
        desc:"已结清",
        value:4
      },
    ],
    billLists:{
      accountType:[
        {
          desc:"现金",
          value:1
        },
        {
          desc:"银行卡",
          value:2
        },
        {
          desc:"信用卡",
          value:3
        },
        {
          desc:"其他平台",
          value:4
        },
      ],
      status:[
        {
          desc:"未出账",
          value:-1
        },
        {
          desc:"待还款",
          value:0
        },
        {
          desc:"已还清",
          value:1
        },
        {
          desc:"部分还款",
          value:2
        },
        {
          desc:"逾期未出账",
          value:3
        },
        {
          desc:"逾期已出账",
          value:4
        },
      ],
      id:"账单ID",
      accountName: "资金账户名称",
      type:"账单类型",
      state:"账单状态",
      time:"出账时间",
      repaymentTime:"还款时间",
      amountDue:"应还金额",
      account:"最近一笔还款账户",
      repaidAmount:"已还款金额",
      prompt:{
        type:"请选择账单类型",
        state:"请选择账单状态",
        accountName: "请输入资金账户名称",
      }
    },
    expensesRecord:"消费记录",
    expensesRecords:{
      time:"记账时间",
      type:"记账类型",
      state:"记账状态",
      id:"记账ID",
      phoneNumber: "手机号",
      theme:"记账主题",
      amount:"金额",
      account:"周转账户",
      types:[
        {
          desc:"支出",
          value:1
        },
        {
          desc:"收入",
          value:0
        },
      ],
      status:[
        {
          desc:"正常",
          value:0
        },
        {
          desc:"删除",
          value:1
        },
      ],
      prompt:{
        type:"请选择记账类型",
        state:"请选择记账状态",
      }
    },
    fundAccount:"资金账户",
    fundAccounts:{
      id:"账户ID",
      createTime:"创建时间",
      type:"账户类型",
      name:"账户名称",
      number:"账户号码",
      totalAmount:"总额度",
      availableCredit:"可用额度",
      billingDate:"出账日期",
      repaymentDate:"还款日期",
      state:"账户状态",
      prompt:{
        type:"请选择账户类型",
      },
      status:[
        {
          desc:"正在使用",
          value:0
        },
        {
          desc:"已作废",
          value:1
        }
      ],
      types:[
        {
          desc:"现金",
          value:1
        },
        {
          desc:"银行卡",
          value:2
        },
        {
          desc:"信用卡",
          value:3
        },
        {
          desc:"其他平台",
          value:4
        },
      ],
    },
    conversion:"产品转化行为记录",
    conversions:{
      time:"下载时间",
      name:"产品名称",
      registrationTime:"注册时间",
      applicationTime:"申请时间",
      LoanTime:"放款时间",
      schedule:"消费进度",
      schedules:[
        {
          desc:"下载",
          value:1
        },
        {
          desc:"注册",
          value:2
        },
        {
          desc:"申请",
          value:3
        },
        {
          desc:"放款",
          value:4
        }
      ],
      prompt:{
        schedule:"请选择消费进度",
      }
    },
    invitationRecord:"邀请记录",
    invitationRecords:{
      lockTime:"锁定时间",
      invitees:"被邀请人",
      userAccount:"被邀请人用户账户",
      registration:"成功注册时间",
      redEnvelope:"获赠红包",
      prompt:{
        invitees:"请输入被邀请人",
      }
    },
  },
  'white-list': '黑白名单管理',
}

const userInfoBR = {
  'user-manage': 'Pusat Pengguna',
  // 用户列表
  'user-list': 'Daftar pengguna',
  userList: {
    methods:[
      {
        desc:"Salin tautan",
        value:1
      },
      {
        desc:"facebook",
        value:2
      },
      {
        desc:"twiter",
        value:3
      },
      {
        desc:"LinkedIn",
        value:5
      },
      {
        desc:"whatsApp",
        value:4
      }
    ],
    sources:[
      {
        desc:"Game ",
        value:1
      },
      {
        desc:"undian",
        value:2
      },
      {
        desc:"Undang teman",
        value:3
      },
      {
        desc:"Halaman Rincian Pinjaman",
        value:4
      }
    ],
    userNo: "nomor seri",
    edit:"Edit status akun kredit",
    fallTime:"waktu pembuatan",
    userName: "Nama pengguna",
    email: "akun Email ",
    createTime: "Tanggal pendaftaran",
    modifyTime: "Perbarui waktu",
    status: "Status akun",
    userInfo:'Lihat detail pengguna',
    naomal: "normal",
    shield: " block",
    closing: "ditutup",
    action: " tindakan",
    showMore: "Lihat detail",
    error: "salah：",
    inputPlaceHolder: "Silakan masukkan konten...",
    search: "cari",
    reset: "setel ulang",
    userId: "ID Pengguna",
    phoneNumber: "no telepon",
    countryPrefix:"Kode area internasional",
    identityCard:"KTP",
    companyName:"nama perusahaan",
    registerTime: "Tanggal pendaftaran",
    listType: "Jenis daftar",
    listAttribution: "Daftar atribusi",
    blackType: "Daftar hitam",
    whiteType: "Daftar putih",
    proIna: "Produk indonesia",
    proMart: "saluran Pinjaman",
    laidOut:"sudah dicairkan - Pinjaman pertama",
    finalReview:"case yg ditolak di akhir ulasan",
    remarks:"catatan",
    overdue:"keterlambatan" ,
    loanOverdue:"sudah dicairkan – Pinjaman ulang yg terlambat",
    machineReview:"Penolakan Ulasan mesin",
    initialReview:" penolakan pada ulasan awal",
    other:"lainnya",
    inputRemarks:"silakan masukan catatan",
    userLevel:'Tingkat pengguna',
    membershipLevel:'Tingkat anggota',
    registrationSource:'Sumber rekomendasi platform',
    invitationMethod:'Metode undangan',
    inputSource:'Silakan pilih sumber rekomendasi platform',
    inputMethod:'Silakan pilih metode undangan',
    invitePeople:'Mengundang orang',
    money:"Jumlah bonus",
    packageName:'Daftar untuk menggunakan apk',
    startTime:"waktu mulai",
    endTime:"waktu selesai",
    customerSource:"Sumber Pelanggan",
    import:"Impor",
    importTitle:"Impor daftar hitam",
    export:"Ekspor",
    down:"Unduh template",
    source:[
      {
        desc:"Pinjaman ",
        value:0
      },
      {
        desc:"impor Administrator",
        value:1
      },
      {
        desc:"data Xinghe",
        value:2
      },
      {
        desc:"Produk pinjaman mandiri",
        value:3
      }
    ],
    white:{
      account:"Akun pengguna",
      prompt:"Silakan pilih status kredit",
      state:"Status Kredit",
      status:[
        {
          desc:"normal",
          value:0
        },
        {
          desc:"daftar hitam",
          value:1
        },
      ]
    },
    updateTime:"Waktu Pembaruan Status Kredit",
    state:[
      {
        desc:"normal",
        value:1
      },
      {
        desc:"block",
        value:2
      },
      {
        desc:"ditutup",
        value:1
      }
    ],
    prompt:{
      customerSource:"Silakan masukkan sumber pelanggan",
      phoneNumber: "nomor telepon",
      creditStatus:"Silakan pilih status kredit"
    }
  },
  // 用户详情
  'user-detail': 'Detail pengguna',
  userDetail:{
    basicInfo:'Informasi dasar',
    createTime: "Tanggal pendaftaran",
    userId: "ID pengguna",
    phoneNumber: "nomor telepon",
    timeStart:"waktu mulai",
    timeEnd:" waktu selesai",
    billList:"Daftar tagihan",
    userLevel:'Tingkat pengguna',
    membershipLevel:'Tingkat anggota',
    walletBalance:'Saldo dompet',
    state:[
      {
        desc:"tagihan belum keluar",
        value:1
      },
      {
        desc:"menunggu pelunasan",
        value:2
      },
      {
        desc:"keterlambatan",
        value:3
      },
      {
        desc:"sudah lunas",
        value:4
      },
    ],
    billLists:{
      accountType:[
        {
          desc:"Uang tunai",
          value:1
        },
        {
          desc:"kartu bank",
          value:2
        },
        {
          desc:"Kartu kredit",
          value:3
        },
        {
          desc:"Platform lainnya",
          value:4
        },
      ],
      status:[
        {
          desc:"tagihan belum keluar",
          value:-1
        },
        {
          desc:"menunggu pelunasan",
          value:0
        },
        {
          desc:"sudah lunas",
          value:1
        },
        {
          desc:"Pembayaran sebagian",
          value:2
        },
        {
          desc:"keterlambatan tagihan belum keluar",
          value:3
        },
        {
          desc:"keterlambatan tagihan sudah keluar",
          value:4
        },
      ],
      id:"ID Tagihan",
      accountName: "Nama akun dana",
      type:"Jenis tagihan",
      state:"status tagihan",
      time:"Waktu penagihan",
      repaymentTime:"waktu pelunasan",
      amountDue:"Jumlah yg harus dibayar",
      account:"akun pembayaran terakhir",
      repaidAmount:"jumlah yg dilunasi",
      prompt:{
        type:"Silakan pilih jenis tagihan",
        state:"Silakan pilih status penagihan",
        accountName: "Silakan masukkan nama akun",
      }
    },
    expensesRecord:"Catatan konsumsi",
    expensesRecords:{
      time:"Waktu pembukuan",
      type:"jenis pembukuan",
      state:"status pembukuan",
      id:"ID pembukuan",
      phoneNumber: "nomor telepon",
      theme:"Tema pembukuan",
      amount:"Jumlah",
      account:"Akun bergulir",
      types:[
        {
          desc:"pengeluaran",
          value:1
        },
        {
          desc:"pemasukan",
          value:0
        },
      ],
      status:[
        {
          desc:"normal",
          value:0
        },
        {
          desc:" hapus",
          value:1
        },
      ],
      prompt:{
        type:"Silakan pilih jenis pembukuan",
        state:"silikan pilih status pembukuan",
      }
    },
    fundAccount:"akun dana",
    fundAccounts:{
      id:"ID akun",
      createTime:"waktu pembuatan",
      type:"jenis akun",
      name:"nama akun",
      number:"nomor akun",
      totalAmount:"jumlah total",
      availableCredit:"Kredit yang tersedia",
      billingDate:"Tanggal penagihan",
      repaymentDate:"Tanggal pembayaran",
      state:"status akun",
      prompt:{
        type:"Silakan pilih jenis akun",
      },
      status:[
        {
          desc:"Sedang digunakan",
          value:0
        },
        {
          desc:"tidak terpakai lagi",
          value:1
        }
      ],
      types:[
        {
          desc:"dana tunai",
          value:1
        },
        {
          desc:"kartu bank",
          value:2
        },
        {
          desc:"kredit",
          value:3
        },
        {
          desc:"platform lainnya",
          value:4
        },
      ],
    },
    conversion:"Catatan Perilaku Konversi Produk",
    conversions:{
      time:"Waktu pengunduhan",
      name:"nama produk",
      registrationTime:"waktu pendaftaran",
      applicationTime:"waktu pengajuan aplikasi",
      LoanTime:"waktu pencairan dana",
      schedule:"kemajuan konsumsi",
      schedules:[
        {
          desc:"unduh",
          value:1
        },
        {
          desc:"daftar",
          value:2
        },
        {
          desc:"pengajuan",
          value:3
        },
        {
          desc:"pencairan dana",
          value:4
        }
      ],
      prompt:{
        schedule:"Silakan pilih kemajuan konsumsi",
      }
    },
    invitationRecord:"Catatan undangan",
    invitationRecords:{
      lockTime:"waktu kunci",
      invitees:"Yang diundang",
      userAccount:"Akun Pengguna yang Diundang",
      registration:"Waktu registrasi yang berhasil",
      redEnvelope:"mendapat angpao",
      prompt:{
        invitees:"silakan Masukkan undangan Anda",
      }
    },
  },
  'white-list': 'Manajemen daftar hitam dan daftar putih',
}

export {
  userInfoCN,
  userInfoBR
}
