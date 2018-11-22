const isDev = 1 // 1:开发环境 2:测试环境  0: 生产环境

function request(url, data = {}, method = "GET") {

  return new Promise(function (resolve, reject) {
    if (/[a-z]/g.test(method)) {
      method = method.toUpperCase()
    }
    wx.showNavigationBarLoading()
    wx.request({
      url: url,
      data: data,
      method: method,
      header: method == 'GET' ? {
        'Content-Type': 'application/json'
      } : {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.statusCode == 200) {

          if (res.data) {
            if (res.data.code == 0 || res.data.code == 1000) {
              resolve(res.data);
            } else if (res.data.code == 1013) {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false
              })
            } else {
              throwError(res.data, reject)
            }
          } else {
            throwError(res.data, reject)
          }
        } else {
          reject({
            msg: '网络错误，请稍后重试',
            code: res.statusCode
          })
        }
      },
      fail: function (err) {
        reject(err)
        console.log('request failed')
      },
      complete() {
        wx.hideNavigationBarLoading()
      }
    })
  })
}

function throwError(res, reject) {
  if (res.msg) {
    reject({
      msg: res.msg,
      code: res.code
    })
  } else if (res.data && res.data.errorMsg) {
    reject({
      msg: res.data.errorMsg,
      code: res.code
    })
  } else {
    reject({
      msg: '服务器错误，请稍后重试',
      code: res.code
    })
  }
}

module.exports = {
  isDev,
  request,

}