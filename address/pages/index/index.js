//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {
    app.setTitle('地址选择')
  },
  addressSelect() {
    app.hrefTo('/pages/addressTest/addressTest?type=1')
  },
  addressPlus() {
    app.hrefTo('/pages/address/address')
  }

})
