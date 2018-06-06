//app.js
App({
  url: null,
  appInfo: {
    appId: '',
    url: '',
    suid: '',
    util: require('/utils/util.js'),
    qqmap: require('/utils/qqmap-wx-jssdk.min.js'),
    wxParse: require('/wxParse/wxParse.js'),
    mapkey: 'KTUBZ-UWEW6-ZLWSJ-M6E7X-HQD43-XQB7K', // 请使用自己的秘钥
    sTime: '2018-06-06',
    eTime: '2018-06-06',
    version: 'v 0.1.1',
    versionShow: 0,                   // 版本显示
    clearStorage: 0                   // 清空缓存，重新拉取信息
  },
  onLaunch: function () {
    let that = this
    // wx.setEnableDebug({
    //   enableDebug: true,
    // })
    if (that.appInfo.clearStorage) wx.clearStorage()
    that.url = that.appInfo.url + 'suid=' + that.appInfo.suid
    this.debug()
  },
  // 设置 标题
  setTitle(n) {
    wx.setNavigationBarTitle({
      title: n
    })
  },
  // 跳转 链接
  hrefTo(h) {
    wx.navigateTo({
      url: h
    })
  },
  // 跳转 链接
  switchTab(h) {
    wx.switchTab({
      url: h,
    })
  },
  // 警告框
  warning(that, text = '警告', time = 2000) {
    clearTimeout(timer)
    that.setData({
      warning: {
        isShow: 1,
        text: text
      }
    })
    let timer = null
    timer = setTimeout(() => {
      that.setData({
        warning: {
          isShow: 0,
          text: text
        }
      })
    }, time)
  },
  // 设置缓存
  setStorage(name, data, desc = '设置缓存', success) {
    wx.setStorage({
      key: name,
      data: data,
      success: res => {
        if (success) success(data)
        console.log(desc)
      },
      complete: com => {
        // console.log(desc)
      }
    })
  },
  // 版本号
  version(that) {
    let v = this.appInfo.version
    let vs = this.appInfo.versionShow
    that.setData({
      version: v,
      versionShow: vs
    })
  },
  // 高亮 调试
  debug() {
    var newData = ""
    for (var key of arguments) {
      newData = newData + JSON.stringify(key) + "\n \n ";
    }
    console.log("%c -------------------------------------------------------------------------------------------------------------", "color: red;")
    console.log("%c  Le vent se lève, il faut tenter de vivre.  ———————— 保罗·瓦勒里 (Eitaqx@163.com) ", "background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:16px;")
    console.log('%c \n' +

      '           __                                      __              \n' +
      '         / . .\\      --- > 哼~                   /. . \\               \n' +
      '         \\  - \/                                  \\ -  \/                \n' +
      '         <|  |>                呵呵~  <---      —|  |>                 \n' +
      '         /    \\                                  /    \\                  \n' +
      '————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————'

      , 'color: #D33AC8;')
  }
})