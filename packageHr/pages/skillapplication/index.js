// packageHr/pages/skillapplication/skillapplication.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  bindViewUp: function () {
    wx.navigateTo({
      url: '/packageHr/pages/dlup/up',
    })
  },

  bindViewFour: function () {
    wx.navigateTo({
      url: '/packageHr/pages/dlfour/four',
    })
  },

  bindViewEleven: function () {
    wx.navigateTo({
      url: '/packageHr/pages/dleleven/eleven',
    })
  },
  bindViewTwelve: function () {
    wx.navigateTo({
      url: '/packageHr/pages/dltwelve/twelve',
    })
  },
  bindViewThirteen: function () {
    wx.navigateTo({
      url: '/packageHr/pages/dlthirteen/thirteen',
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})