Component({
  behaviors: [],
  properties: {
    tips: {
      type: String,
      value: '',
      observer(newVal, oldVal, changedPath) {
        if(newVal){
          this.showTips()
        }
      }
    },
    time: {
      type: Number,
      value: 1.5e3,
      observer(newVal, oldVal, changedPath) {
        console.log(newVal, oldVal)
      }
    },
    showToast: {
      type: [Boolean, Number],
      value: true,
      observer(newVal, oldVal, changedPath) {
      }
    }
  },
  data: {
    showToast: true,
    tips: '',
    time: 1.5e3
  },
  lifetimes: {
    created() {

    },
    attached() {

    },
    ready() {

    },
    moved() {

    },
    detached() {

    }
  },
  methods: {
    showTips() {
      this.setData({
        showToast: false,
        tips: this.data.tips
      })
      const t = this.data.time
      setTimeout(() => {
        let obj = {
          showToast: true,
          tips: ''
        }
        this.setData({
          showToast: true,
          tips: ''
        })
        this.triggerEvent('init-data', obj)
      }, t)
    }
  },
  pageLifetimes: {
    show() {

    }
  }
})