// pages/address/address.js
const app = getApp()
const util = app.appInfo.util
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageStatus: 0,
    list: [],
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.type) this.setData({
      type: options.type
    })
    util.readyLoad('address', {
      map: 'xxx'
    }, res => {
      if (res.ec == 200) {
        that.setData({
          list: res.data
        })
      }
      if (res.ec == 400) that.setData({
        list: []
      })
      that.setData({
        pageStatus: 1
      })
      console.log(res)
    })
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
    let that = this
    util.getReady('address', res => {
      console.log(res)
      if(res.ec  == 200) that.setData({
        list: res.data
      })
    })
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
    let that = this
    if (this.data.type) this.onLoad({ type: that.data.type})
    else this.onLoad({})
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  addressAdd (){
    app.hrefTo('/pages/addressAdd/addressAdd')
  },
  addressEdit (e){
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    item = JSON.stringify(item)
    item = encodeURIComponent(item)
    app.hrefTo('/pages/addressEdit/addressEdit?item=' + item + '&index=' + index)
  },
  // 选择默认地址
  bindAddress (e){
    let that = this
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    let id = list[index].id
    if(this.data.type){
      let type = this.data.type
      let pages = getCurrentPages()
      let perPage = pages[pages.length - 2]
      // list[index].address = list[index].mapAddress + list[index].inputAddress
      if(type == 1) perPage.setData({
        addressStart: list[index]
      })
      if (type == 2) perPage.setData({
        addressEnd: list[index]
      })
      wx.navigateBack({
        delta: 1
      })
    }else{
      for (var i of list) i.default = 0
      list[index].default = 1
      this.setData({
        list: list
      })
      wx.request({
        url: app.url,
        data: {
          map: 'xxx',
          id: id
        },
        success: res => {
          console.log(res, id)
          if (res.data.ec == 200) app.setStorage('address', { data: list, ec: 200 }, 'address ---> 修改默认地址', () => { })
          else app.warning(that, '修改失败')
        }
      })
    }
  }
})