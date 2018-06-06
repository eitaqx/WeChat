// pages/addressTest/addressTest.js
const app = getApp()
const util = app.appInfo.util
var QQMapWX = app.appInfo.qqmap;
var qqmapsdk = new QQMapWX({
  key: app.appInfo.mapkey
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map: {
      longitude: 113.719124,
      latitude: 34.77506,
      showLocation: true,
      iconPath: '/icon/icon_position.png',
      width: 40,
      height: 40,
      scale: 16,
      controls: [{
        id: 'map',
        iconPath: '/icon/icon_position.png',
        position: { left: 12000, top: 12000, width: 40, height: 40},
        clickable: false
      }],
      // markers: [{
      //     id: 1,
      //     iconPath: "/icon/icon_add.png",
      //     latitude: 34.77506,
      //     longitude: 113.719124,
      //     width: 20,
      //     height: 20
      // }]
    },
    list: [
      { name: 'Eitaqx@163.com', address: '纵有疾风起，人生不言弃。', select: 1, lat: '34.775303', lng: '113.720085' }
    ],
    oftenList: [],
    active: 1,
    mapStatus: 1                  // 控制选择地址时 地图不加载附近列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.setTitle('地址')
    let list = this.data.list
    this.setData({
      address: list[0],
      type: options.type
    })
    this.getAddress()
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
      if (res.ec == 200) that.setData({
        oftenList: res.data
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  getAddress (){
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        console.log(res)
        let map = that.data.map
        map.longitude = res.longitude
        map.latitude = res.latitude
        that.getWidthHeight(e => {
          map.controls[0].position.top = e.height / 2 - 35
          map.controls[0].position.left = e.width / 2 - 20
          that.setData({
            map: map,
            position: {
              longitude: res.longitude,
              latitude: res.latitude
            }
          })
          that.getAddressList(1)
        })
      },
    })
  },
  getWidthHeight (fn){
    var query = wx.createSelectorQuery()
    query.select('#map').boundingClientRect()
    query.exec(res => {
      fn(res[0])
    })
  },
  getAddressList(s = 0){
    let that = this
    let position = that.data.position
    console.log(position)
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: position.latitude,
        longitude: position.longitude
      },
      get_poi: 1,
      poi_options: "page_size=20;page_index=1",
      success: function (e) {
        if(s){
          e.result.pois[0].select = 1
          that.setData({
            list: e.result.pois,
            address: e.result.pois[0]
          })
        }else{
          that.setData({
            list: e.result.pois
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  mapChange(e) {
    let that = this
    if (e.type == 'end'){
      that.mapCtx = wx.createMapContext('map')
      that.mapCtx.getCenterLocation({
        success: res => {
          console.log(res)
          that.setData({
            position: {
              latitude: res.latitude,
              longitude: res.longitude
            }
          })
          if (that.data.mapStatus) {           // 防止地图点击时 进行多次加载
            that.getAddressList(1)
          }else{
            that.data.mapStatus = 1
          }
        }
      })
    }
  },
  bindAddress (e) {
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    for(let i of list) i.select = 0
    list[index].select = 1
    console.log(list[index])
    let map = this.data.map
    map.latitude = list[index].location.lat 
    map.longitude = list[index].location.lng 
    this.setData({
      map: map,
      list: list,
      address: list[index],
      mapStatus: 0
    })
  },
  oftenAddress(e){
    let item = e.currentTarget.dataset.item
    let type = this.data.type
    let pages = getCurrentPages()
    let perPage = pages[pages.length - 2]
    if (type == 1) perPage.setData({
      addressStart: item
    })
    if (type == 2) perPage.setData({
      addressEnd: item
    })
    wx.navigateBack({
      delta: 1
    })
  },
  addressSearch (){
    app.hrefTo('/pages/addressSearch/addressSearch')
  },
  nearby() {
    this.setData({
      active: 1
    })
  },
  often() {
    let that = this
    this.setData({
      active: 2
    })
    if (!this.data.pageStatus) util.readyLoad('address', {
      map: 'xxxxx'
    }, e => {
      if(e.ec == 200) that.setData({
        oftenList: e.data,
        pageStatus: 1
      })
      else that.setData({
        pageStatus: 1
      })
    })
  },
  bindInput(e){
    let val = e.detail.value
    this.setData({
      detail: val
    })
  },
  submit(){
    let that = this
    let detail = that.data.detail || ''
    let address = that.data.address
    let a = {
      address: address.address + detail,
      lat: address.location.lat,
      lng: address.location.lng,
      mobile: ''
    }
    let type = this.data.type
    let pages = getCurrentPages()
    let perPage = pages[pages.length - 2]
    console.log(perPage.data.addressStart, a)
    if (type == 1) {
      a.mobile = perPage.data.addressStart.mobile || ''
      perPage.setData({
        addressStart: a
      })
    }
    if (type == 2) {
      a.mobile = perPage.data.addressEnd.mobile || ''
      perPage.setData({
        addressEnd: a
      })
    } 
    wx.navigateBack({
      delta: 1
    })
  },
  addressAdd(){
    app.hrefTo('/pages/addressAdd/addressAdd')
  },
  addressList(){
    app.hrefTo('/pages/address/address')
  }
})