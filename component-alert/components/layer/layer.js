// component/layer/layer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '提示'
    },
    cancleText: {
      type: String,
      value: '取消'
    },
    confirmText: {
      type: String,
      value: '确定'
    },
    noCancel: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cancel(){
      this.triggerEvent('cancel')
    },
    confirm(){
      this.triggerEvent('confirm')
    }
  }
})
