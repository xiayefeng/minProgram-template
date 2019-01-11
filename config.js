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
      header: {'Content-Type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded'},
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res.data)
          /*if (res.data) {
            if (res.data.code == 0) {
              resolve(res.data);
            } else {
              throwError(res.data, reject)
            }
          } else {
            throwError(res, reject)
          }*/
        } else {
          reject({
            message: '网络错误，请稍后重试',
            code: res.statusCode
          })
        }
      },
      fail: function (err) {
        if (err.errMsg && !err.message) {
          err.message = err.errMsg
        }
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
      message: res.msg,
      code: res.code
    })
  } else if (res.data && res.data.errorMsg) {
    reject({
      message: res.data.errorMsg,
      code: res.code
    })
  } else {
    reject({
      message: '服务器错误，请稍后重试',
      code: res.code
    })
  }
}

module.exports = {
  isDev,
  request,

}