const msgCenterCN = {
  // 消息中心
  'msg-center': '消息中心',
  push: {
    edit:"推送详情",
    releaseDate: '发布日期',
    timeStart:"开始日期",
    timeEnd:"结束日期",
    state: '发布状态',
    status:[
      {
        desc:"未发布",
        value:0
      },
      {
        desc:"已发布",
        value:1
      }
    ],
    theme: '主题',
    id: '信息ID',
    createTime: '创建日期',
    type:"推送类型",
    types:[
      {
        desc:"个性化推送",
        value:1
      },
      {
        desc:"统一模板推送",
        value:2
      }
    ],
    content:"推送内容",
    operator:"操作人",
    updateTime:"更新时间",
    pushObject:"推送对象",
    pushObjects:[
      {
        desc:"自定义推送对象",
        value:1
      },
      {
        desc:"全部用户",
        value:2
      },
      {
        desc:"老用户",
        value:3
      },
      {
        desc:"新用户",
        value:4
      }
    ],
    inPushObject:"导入自定义对象",
    inObContent:"导入推送对象及内容",
    prompt:{
      tabId:"用户id",
      inputInPushObject:"请导入自定义对象",
      inObContent:"请导入推送对象及内容",
      tabContent:"推送内容",
      inPushObject:"导入文件为excel表，字段个推用户ID、推送内容，例：",
      releaseDate: '请选择发布日期',
      state: '请选择信息状态',
      theme: '请输入主题',
      type:"请选择推送类型",
      content:"请输入推送内容",
      pushObject:"请选择推送对象",
    }
  },
  feedback:{
    edit:"意见反馈",
    submitDate:"提交日期",
    timeStart:"开始日期",
    timeEnd:"结束日期",
    state:"处理状态",
    status:[
      {
        desc:"未处理",
        value:0
      },
      {
        desc:"处理中",
        value:1
      },
      {
        desc:"已处理",
        value:2
      }
    ],
    userAccount:"用户账户",
    topic:"反馈主题",
    content:"反馈内容",
    version:"提交时版本号",
    remarks:"备注",
    img:"图片",
    processResult:"处理结果",
    prompt:{
      state:"请选择处理状态",
      userAccount:"请输入用户账户",
      topic:"请输入反馈主题",
      content:"请输入反馈内容",
      version:"提交时版本号",
      remarks:"请输入备注",
      processResult:"请选择处理结果",
    }
  }
};

const msgCenterBR = {
  // 消息中心
  'msg-center': 'Pusat Pesan',
  push: {
    edit:"Push details",
    releaseDate: 'Tanggal rilis',
    timeStart:"Tanggal mulai",
    timeEnd:"Tanggal selesai",
    state: 'Status Terbit',
    status:[
      {
        desc:"Tidak diterbitkan",
        value:0
      },
      {
        desc:"sudah Diterbitkan",
        value:1
      }
    ],
    theme: 'tema',
    id: 'ID Pesan',
    createTime: 'Tanggal pembuatan',
    type:"je nis Push",
    types:[
      {
        desc:"Push yg di personalisasikan",
        value:1
      },
      {
        desc:"Push templete terpadu",
        value:2
      }
    ],
    content:"konten push",
    operator:"Operator",
    updateTime:"Perbarui waktu",
    pushObject:"Push object",
    pushObjects:[
      {
        desc:"Custom push object",
        value:1
      },
      {
        desc:"Semua pengguna",
        value:2
      },
      {
        desc:"Pengguna lama",
        value:3
      },
      {
        desc:"Pengguna baru",
        value:4
      }
    ],
    inPushObject:"Impor objek khusus",
    inObContent:"Impor objek dan konten push",
    prompt:{
      tabId:"ID pengguna",
      inputInPushObject:"Harap isi objek impor kustom",
      inObContent:"Harap isi impor objek dan konten push",
      tabContent:"konten push",
      inPushObject:"File impor adalah tabel excel, dan ID pengguna dan isi push　misalnya",
      releaseDate: 'Silakan pilih tanggal terbit',
      state: 'Silakan pilih status terbit',
      theme: 'Silakan masukkan subjek',
      type:"Silakan pilih jenis push",
      content:"Silakan masukkan konten push",
      pushObject:"Silakan pilih target push",
    }
  },
  feedback:{
    edit:"Umpan balik",
    submitDate:"Tanggal pengiriman",
    timeStart:"Tanggal mulai",
    timeEnd:"Tanggal selesai",
    state:"Status pemrosesan",
    status:[
      {
        desc:"belum diproses",
        value:0
      },
      {
        desc:"dalam proses",
        value:1
      },
      {
        desc:"sudah diproses",
        value:2
      }
    ],
    userAccount:"Akun pengguna",
    topic:"Topik umpan balik",
    content:"Konten umpan balik",
    version:"Nomor versi saat pengiriman",
    remarks:"Catatan",
    img:"Gambar",
    processResult:"Memproses hasil",
    prompt:{
      state:"Silakan pilih status pemrosesan",
      userAccount:"Silakan masukkan akun pengguna",
      topic:"Silakan masukkan subjek umpan balik",
      content:"Silakan masukkan konten umpan balik",
      version:"Nomor versi saat pengiriman",
      remarks:"Silakan masukkan komentar",
      processResult:"Silakan pilih hasil pemrosesan",
    }
  }
};

export {
  msgCenterCN,
  msgCenterBR
}
