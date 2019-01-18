Component({
  externalClasses: ['my-class'],
  properties: {
    showAction: { // 是否显示 action
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false,
      observer: function(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    position: {
      type: String,
      value: 'bottom'
    },
    actionTitle: {  // action 标题
      type: String,
      value: ''
    },
    hasCloseBtn: {  // 是否有关闭按钮
      type: Boolean,
      value: true
    }
  },
  data: {
    hasTitle: true
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log(this.data.position)
      if(this.data.position === 'top') {
        this.setData({
          hasTitle: false
        })
      }
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