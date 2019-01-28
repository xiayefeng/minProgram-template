Component({
  externalClasses: ['ali-icon'],   // 组件使用时接收的外部样式类名

  properties: {
    fontClass: String, // class名

    fontSize: {         // 字体大小
      type: [String, Number],
      value: 32
    },
    dw: {           // 字体大小单位
      type: String,
      value: 'rpx'
    },
    color: {      // 字体颜色
      type: String,
      value: '#666'
    }
  },
  data: {
    
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
    },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
  }
})