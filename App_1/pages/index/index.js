//index.js
//获取应用实例
var app = getApp()

Page({
  data: {},
  //事件处理函数
  toRun: function() {
    wx.navigateTo({
      url: '../run/run'
    })
  },
  toMusic: function() {
    wx.navigateTo({
      url: '../music/music'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
