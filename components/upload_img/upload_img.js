const util = require('../../utils/util')

Component({
  properties: {
    imageList: {     // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      // value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    url: {  // 图片上传的 url
      type: String,
      observer: function (newVal, oldVal) {
      }
    },

    isCheckBig: {
      type: Boolean,
      value: true  // 是否限制图片大小， 默认限制
    },
    limitSize: {
      type: Number,
      value: 10  // 限制图片大小, 默认最大10M
    },
    limitNum: {
      type: Number,
      value: 3   // 限制上传图片数量， 默认最多3张
    },
    options: {
      type: Object,
      value: {
        btnTitle: '上传凭证',  // btn 文字
        showLimit: true       // 是否限制图片大小
      }
    },
    formData: {
      type: Object,
      value: {}
    },

  },
  data: {
    newImgArr: []
  }, // 私有数据，可用于模板渲染
  methods: {
    previewImage(e) {
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: this.data.imageList
      })
    },

    chooseImage() {
      let arr = this.data.imageList
      if (arr.length === this.data.limitNum) {
        util.showToast({
          text: `最多上传${this.data.limitNum}张图片！`
        })
        return
      }
      // console.log('选择图片')
      wx.chooseImage({
        count: this.data.limitNum, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: (res) => {
          // console.log(res)

          let arr2 = res.tempFilePaths
          let arr3 = res.tempFiles
          if (arr.length + arr2.length > this.data.limitNum) {
            util.showToast({
              text: `最多上传${this.data.limitNum}张图片！`
            })
          } else {
            if (this.data.isCheckBig) {
              let isBig = false
              arr3.map((item, idx) => {
                if (item.size / 1024 > this.data.limitSize * 1024) {
                  isBig = true
                  arr2.splice(idx, 1)
                }
              })
              if (isBig) {
                util.showToast({
                  text: `图片大小不能超过${this.data.limitSize}M！`
                })
              }
            }
            this.upLoadImg(arr2)
            arr = arr.concat(arr2)
            /*this.setData({
              imageList: arr
            })*/
            this.triggerEvent('change-img', arr)
          }
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    },

    upLoadImg(arr) {
      for (let i = 0, len = arr.length; i < len; i++) {
        wx.uploadFile({
          url: this.data.url,
          filePath: arr[i],
          name: 'file',
          // header: {}, // 设置请求的 header
          formData: this.data.formData, // HTTP 请求中其他额外的 form data
          success: (res) => {
            // console.log(res)
            const obj = JSON.parse(res.data)
            const arr2 = this.data.newImgArr
            if (obj.code === 0) {
              arr2.push({
                img: obj.data,
                id: arr[i]
              })
              this.setData({
                newImgArr: arr2
              })
            }

            // success
          },
          fail: (err) => {
            console.log(err)
            let arr = this.data.imageList
            arr.splice(i, 1)
            this.triggerEvent('change-img', arr)
            // fail
          },
          complete: () => {
            // complete
            if (i === arr.length - 1) {
              this.filterImg()
            }
          }
        })
      }
    },

    delImg(e) {
      const src = e.currentTarget.dataset.id
      let arr = this.data.imageList
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === src) {
          arr.splice(i, 1)
          break
        }
      }
      this.triggerEvent('change-img', arr)
      this.filterImg()
    },

    filterImg() {
      const arr1 = this.data.imageList
      const arr2 = this.data.newImgArr
      const arr3 = []
      arr2.map(item2 => {
        if (arr1.includes(item2.id)) {
          arr3.push(item2.img)
        }
      })
      this.triggerEvent('get-img', arr3)
    },
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
    },
    moved: function () {
    },
    detached: function () {
    },
  },
})