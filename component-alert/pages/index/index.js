//index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    layerStatus: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setTitle('弹窗组件')
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
  alertTip() {
    this.setData({
      layerStatus: 1,
      type: 1,
      noCancel: true
    })
  },
  alertInput() {
    this.setData({
      layerStatus: 1,
      type: 0,
      noCancel: true
    })
  },
  alertConfirm() {
    this.setData({
      layerStatus: 1,
      type: 1,
      noCancel: false
    })
  },
  cancel() {
    console.log('你点了取消按钮')
    this.setData({
      layerStatus: 0
    })
  },
  confirm() {
    let n = this.data.name
    let m = this.data.mobile
    console.log('你点了确定按钮', n, m)
    this.setData({
      layerStatus: 0
    })
  },
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  mobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  }
})
