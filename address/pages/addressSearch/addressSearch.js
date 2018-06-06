// pages/addressSearch/addressSearch.js
const app = getApp()
var QQMapWX = app.appInfo.qqmap;
var qqmapsdk = new QQMapWX({
  key: app.appInfo.mapkey
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setTitle('地址')
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

  searchList (n){
    let that = this
    qqmapsdk.getSuggestion({
      keyword: n,
      success: res => {
        console.log(res)
        that.setData({
          list: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  bindInput (e){
    let val = e.detail.value
    this.searchList(val)
  },
  bindConfirm(e){
    let val = e.detail.value
    this.searchList(val)
  },
  address (e){
    let item = e.currentTarget.dataset.item
    console.log(item)
    let pages = getCurrentPages()
    let prePages = pages[pages.length - 2]
    let list = prePages.data.list
    let map = prePages.data.map
    map.longitude = item.location.lng
    map.latitude = item.location.lat
    for(let i of list) i.select = 0
    prePages.setData({
      address: item,
      list: list,
      map: map,
      position: {
        longitude: item.location.lng,
        latitude: item.location.lat
      }
    })
    // prePages.getAddressList()
    wx.navigateBack({
      delta: 1
    })
  }
})