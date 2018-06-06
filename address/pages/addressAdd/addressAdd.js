// pages/addressAdd/addressAdd.js
const app = getApp();
const util = app.appInfo.util
var QQMapWX = app.appInfo.qqmap;
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  nameChange (e){
    this.setData({
      'address.name': e.detail.value
    })
  },
  mobileChange (e){
    this.setData({
      'address.mobile': e.detail.value
    })
  },
  addressChange() {
    var that = this;
    wx.chooseLocation({
      success: res => {
        console.log(res)
        that.setData({
          'address.mapAddress': res.address,
          'address.lng': res.longitude,
          'address.lat': res.latitude
        })
      }
    })
  },
  detailChange (e){
    this.setData({
      'address.inputAddress': e.detail.value
    })
  },
  submit (){
    var that = this
    var a = that.data.address
    var reg = /^[1][3-9][0-9]{9}$/
    if(a.name){
      if(reg.test(a.mobile)){
        if (a.mapAddress){
          if (a.inputAddress){
            util.getReady('address', res => {
              console.log(res)
              let address = that.data.address
              if (res.ec == 200) {
                that.saveAddress(address, e => {
                  if (e.ec == 200) {
                    address.id = e.data.id
                    address.address = address.mapAddress + address.inputAddress
                    res.data = res.data.concat(address)
                    app.setStorage('address', res, 'addressAdd ---> 保存地址缓存成功', () => {
                      app.warning(that, '保存地址成功')
                      wx.navigateBack({
                        delta: 1
                      })
                    })
                  }
                })
              }
              else{
                address.default = 1
                that.saveAddress(address, e => {
                  console.log(e)
                  if(e.ec == 200){
                    address.id = e.data.id
                    address.address = address.mapAddress + address.inputAddress
                    let addData = {
                      data: [address],
                      ec: 200
                    }
                    app.setStorage('address', addData, 'addressAdd.js ---> 保存地址缓存成功', () => {
                      app.warning(that, '保存地址成功')
                      wx.navigateBack({
                        delta: 1
                      })
                    })
                  }
                })
              }
            })
          }
          else app.warning(that, '详细地址不能为空')
        }
        else app.warning(that, '收货地址不能为空')
      }
      else app.warning(that, '请输入正确手机号')
    }
    else app.warning(that, '姓名不能为空')
  },
  getStorage(){
    let that = this
    wx.getStorage({
      key: 'address',
      success: function(res) {
        console.log(res)
        let address = that.data.address
        address.id = 1
        address.address = address.mapAddress + address.inputAddress
        res.data.unshift(address)
        app.setStorage('address', res.data, 'addressAdd.js ---> 保存地址缓存成功', () => {
          app.warning(that, '保存地址成功')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        })
      },
      fail: err => {
        let address = that.data.address
        // address.id = 1
        address.default = 1
        address.map = 'xxx'
        console.log(address)
        that.saveAddress(address)
        address.address = address.mapAddress + address.inputAddress
        app.setStorage('address', [address], 'addressAdd.js ---> 保存地址缓存成功', () => {
          app.warning(that, '保存地址成功')
          wx.navigateBack({
            delta: 1
          })
        })
      }
    })
  },
  saveAddress(d, fn){
    console.log(d)
    d.map = 'xxx'
    wx.request({
      url: app.url,
      data: d,
      success: res => {
        console.log(res)
        fn(res.data)
      }
    })
  }
})