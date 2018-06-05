//app.js
App({
  url: null,
  appInfo: {
    appId: '',
    url: '',
    suid: '',
    util: require('/utils/util.js'),
    sTime: '2018-06-05',
    eTime: '2018-06-05',
  },
  onLaunch: function () {
    let that = this
    // wx.setEnableDebug({
    //   enableDebug: true,
    // })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // this.verifySession()
    this.debug()
  },

  globalData: {
    userInfo: null,
    userStatus: 0,
    article: '',
    shareId: null
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
    if (arguments.length > 0) console.log("%c \n " + newData + "————————  郑州天点科技  ————————\n ", "color: #FF5EA9;")
    console.log("%c  Le vent se lève, il faut tenter de vivre.  ———————— 保罗·瓦勒里 (Eitaqx@163.com) ", "background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:16px;")
    console.log('%c \n' +

      '                         __                                      __              \n' +
      '                       / . .\\      --- > 哼~                   /. . \\               \n' +
      '                       \\  - \/                                  \\ -  \/                \n' +
      '                       <|  |>                呵呵~  <---      —|  |>                 \n' +
      '                       /    \\                                  /    \\                  \n' +
      '————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————'

      , 'color: #D33AC8;')
  }
})