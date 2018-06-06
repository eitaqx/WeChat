// pages/addressEdit/addressEdit.js
const app = getApp();
const util = app.appInfo.util;
Page({
  data: {
    address: ''
  },
  onLoad: function (options) {
    let that = this
    this.setData({
      index: options.index
    })
    util.getReady('address', res => {
      console.log(res)
      let index = that.data.index
      if (res.ec == 200) that.setData({
        list: res.data,
        address: res.data[index]
      })
      else app.warning(that, '获取地址失败')
    })
  },
  delAddress (){
    let that = this
    wx.showModal({
      title: '提示',
      content: '您将删除该地址',
      success: res => {
        if(res.confirm){
          let index = this.data.index
          let list = this.data.list
          wx.request({
            url: app.url,
            data: {
              map: 'xxx',
              id: list[index].id
            },
            success: e => {
              console.log(e)
              if(e.data.ec == 200){
                list.splice(index, 1)
                let addData = {
                  data: list,
                  ec: 200
                }
                app.setStorage('address', addData, 'pages/addressEdit/addressEdit.js -----> 83', () => {
                  wx.navigateBack({
                    delta: 1
                  })
                })
              }
              else app.warning(that, '删除失败')
            }
          })

        }else{
          console.log('放弃删除该地址')
        }
      }
    })
  },
  addressChange() {
    var that = this;
    wx.chooseLocation({
      success: res => {
        console.log(res)
        that.setData({
          'address.mapAddress': res.address
        })
      }
    })
  },
  nameChange(e) {
    this.setData({
      'address.name': e.detail.value
    })
  },
  mobileChange(e){
    var val = e.detail
    this.setData({
      'address.mobile': val
    })
  },
  detailChange(e){
    let val = e.detail.value
    this.setData({
      'address.inputAddress': val
    })
  },
  saveAddress(){
    let that = this
    let list = that.data.list
    let index = that.data.index
    let a = that.data.address
    console.log(a)
    var reg = /^[1][3-9][0-9]{9}$/
    console.log(reg.test(a.mobile))
    if (a.name) {
      if (reg.test(a.mobile)) {
        if (a.mapAddress) {
          if (a.inputAddress) {
            list[index] = a
            console.log(list)
            this.setData({
              list: list
            })
            // that.setStorage()
            let address = a
            address.map = 'xxx'
            wx.request({
              url: app.url,
              data: address,
              success: res => {
                console.log(res)
                if (res.data.ec == 200) {
                  let addData = {
                    data: list,
                    ec: 200
                  }
                  app.setStorage('address', addData, 'addressEdit.js --> 修改地址成功', () => {
                    wx.navigateBack({
                      delta: 1,
                    })
                  })
                }
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
  }
})