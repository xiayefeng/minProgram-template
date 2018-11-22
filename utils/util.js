const _toString = Object.prototype.toString

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatDate(time, sign = '/') {
  if (typeof time !== 'number' || time < 0) {
    return time
  }
  var date = new Date(time)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join(sign)
}


function showToast({
  text,
  icon = "success",
  duration = 1500,
  mask = true
} = {}) {
  if (typeof text !== 'string') {
    text = String(text)
    text = text.slice(0, 50)
  }
  wx.showToast({
    duration,
    mask,
    icon: text.length > 7 ? 'none' : icon,
    title: text,
  })
}

function showModal({
  content,
  title = '提示',
  showCancel = true,
  cancelText = '取消',
  cancelColor = '#000',
  confirmText = '确定',
  confirmColor = '#3cc51f'
} = {}, callback) {
  wx.showModal({
    title,
    content,
    showCancel,
    cancelText,
    cancelColor,
    confirmText,
    confirmColor,
    success: callback || function(res) {
      console.log(res.confirm)
      console.log(res.cancel)
    }
  })
}


function isEmptyObj(obj) {
  if (!isPlainObject(obj)) {
    throw new Error('传入的参数必须为对象')
  }
  return Object.keys(obj).length === 0
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

function extend(target) {
  let sources = Array.prototype.slice.call(arguments, 1)

  for (let i = 0; i < sources.length; i += 1) {
    let source = sources[i]
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (isPlainObject(source[key])) {
          if (target[key]) {
            extend(target[key], source[key])
          } else {
            Object.assign(target, source)
          }
        } else {
          target[key] = source[key]
        }
      }
    }
  }
  return target
}

function objToParamsStr(obj) {
  if (!isPlainObject(obj)) {
    throw new Error('传入的参数必须为对象')
  } else if (isEmptyObj(obj)) {
    return ''
  }
  const arr = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(`${key}=${value}`)
    }
  }
  return arr.join('&')
}

module.exports = {
  formatTime,
  formatDate,
  showToast,
  showModal,
  isEmptyObj,
  isPlainObject,
  extend,
  objToParamsStr
}