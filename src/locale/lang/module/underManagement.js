const underManagementCN = {
//下架管理
  //自定义谷歌监测链接
  monitoringLink:{
    add:'新增谷歌监测链接',
    createTime:'创建时间',
    linkType:'链接类型',
    id:'ID',
    linkTypes:[
      {
        desc:'BANNER-谷歌链接',
        value:0
      },
      {
        desc:'贷款列表-谷歌链接',
        value:1
      },
      {
        desc:'自定义-谷歌链接',
        value:2
      }
    ],
    name:'产品名称',
    packageName:'包名',
    state:'链接状态',
    prompt:{
      name:'请输入产品名称',
      packageName:'请输入包名',
      linkType:'请选择链接类型',
    },
    status:[
      {
        desc:'隐藏',
        value:0
      },
      {
        desc:'显示',
        value:1
      }
    ]
  },
  dismissalNotice:{
    title:"下架通知",
    id:'对应ID',
    monitoringTime:'下架监测时间',
    linkType:'链接类型',
    linkTypes:[
      {
        desc:'BANNER-谷歌链接',
        value:0
      },
      {
        desc:'贷款列表-谷歌链接',
        value:1
      },
      {
        desc:'自定义-谷歌链接',
        value:2
      }
    ],
    name:'产品名称',
    packageName:'下架包名',
    state:'链接状态',
    status:[
      {
        desc:'隐藏',
        value:0
      },
      {
        desc:'显示',
        value:1
      }
    ],
    prompt:{
      linkType:'请选择链接类型',
      name:'请输入产品名称',
      packageName:'请输入下架包名',
    },
    performingOperations:'执行操作',
    email:'下架通知邮箱',
    add:'新增通知邮箱',
    edit:'编辑通知邮箱',
    mailbox:{
      id:'ID',
      recipient:'收件人',
      recipientEmail:'收件人邮箱',
      name:'收件人名称',
      createTime: '创建时间',
      state:'状态',
      prompt:{
        name:'请输入收件人名称',
        recipient:'请输入收件人',
        recipientEmail:'请输入收件人邮箱',
      },
      status:[
        {
          desc:'失效',
          value:0
        },
        {
          desc:'激活',
          value:1
        }
      ],
    }
  }
};


const underManagementBR = {
//自定义谷歌监测链接
  monitoringLink:{
    add:'tambah Link monitor baru Google',
    createTime:'Waktu pembuatan',
    linkType:'Jenis tautan',
    id:'ID',
    linkTypes:[
      {
        desc:'BANNER-Google Link',
        value:0
      },
      {
        desc:'Daftar Pinjaman-Google Link',
        value:1
      },
      {
        desc:'Custom-google link',
        value:2
      }
    ],
    name:'Nama produk',
    packageName:'Nama Apk',
    state:'Status link',
    prompt:{
      name:'Silakan masukkan nama produk',
      packageName:'Silakan masukkan nama apk',
      linkType:'Silakan pilih jenis tautan',
    },
    status:[
      {
        desc:'Sembunyikan',
        value:0
      },
      {
        desc:'tampilkan',
        value:1
      }
    ]
  },
  dismissalNotice:{
    title:"Pemberitahuan penarikan",
    id:'ID yang sesuai',
    monitoringTime:'waktu pemantauan di rak',
    linkType:'Jenis tautan',
    linkTypes:[
      {
        desc:'BANNER-Google Link',
        value:0
      },
      {
        desc:'Daftar Pinjaman-Google Link',
        value:1
      },
      {
        desc:'Custom-google link',
        value:2
      }
    ],
    name:'nama produk',
    packageName:'nama apk yg dihapus',
    state:'status tautan',
    status:[
      {
        desc:'sembunyikan',
        value:0
      },
      {
        desc:'tampilkan',
        value:1
      }
    ],
    prompt:{
      linkType:'Silakan pilih jenis tautan',
      name:'Silakan masukkan nama produk',
      packageName:'Silakan masukkan nama apk yg ditarik',
    },
    performingOperations:'malakukan operasi',
    email:'Email Pemberitahuan Penarikan',
    add:'Tambahkan email pemberitahuan',
    edit:'edit email pemberitahuan',
    mailbox:{
      id:'ID',
      recipient:'penerima',
      recipientEmail:'email penerima',
      name:'nama penerima',
      createTime: 'waktu pembuatan',
      state:'status',
      prompt:{
        name:'silakan masukan nama penerima',
        recipient:'Silakan masukkan penerima',
        recipientEmail:'Silakan masukkan email penerima',
      },
      status:[
        {
          desc:'gagal',
          value:0
        },
        {
          desc:'aktifkan',
          value:1
        }
      ],
    }
  }
};
export {
  underManagementCN,
  underManagementBR
}
