
// 预先加载
const readyLoad = (n, d, fn, s = false) => {          //        n 缓存名字 d 参数 fn 执行函数 s 销毁缓存
  const app = getApp()
  if (s) wx.removeStorage({
    key: n,
    success: function (res) {
      console.log('销毁' + n + '缓存')
    },
    fail: function (res) {
      console.log('销毁' + n + '缓存失败', res)
     },
    complete: function (res) { },
  })
  wx.showLoading({
    title: '请稍后...',
  })
  wx.showNavigationBarLoading()
  wx.request({
    url: app.url,
    data: d,
    success: res => {
      app.setStorage(n, res.data, n + ' 缓存成功', e => {
        fn(e)
      })
    },
    fail: err => {
      console.log('加载失败', err)
    },
    complete: com => {
      wx.hideLoading()
      wx.hideNavigationBarLoading()
    }
  })
}
const getReady = (n, fn, s = false) => {                  // n 获取缓存名字 fn 执行的函数 s 是否销毁该缓存
  // wx.showLoading({
  //   title: '请稍后...'
  // })
  wx.showNavigationBarLoading()
  wx.getStorage({
    key: n,
    success: function(res) {
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      fn(res.data)
      if (s) wx.removeStorage({
        key: n,
        success: function (e) {
          console.log('已销毁 ' + n + ' 缓存')
        },
        fail: err => {
          console.log('销毁 ' + n +' 失败')
        }
      })
    },
    fail: err => {
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      err.err = 1
      fn(err)
      console.log(err, '获取 ' + n + ' 失败')
    }
  })
}
module.exports = {
  readyLoad: readyLoad,
  getReady: getReady
}
