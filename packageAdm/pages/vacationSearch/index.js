var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vacationTime: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });
    this.getlistDatat();
  },
  getlistDatat() {
    let that = this;
    util.request(api.VacationSearch, {
      emplid: app.globalData.userInfo
    }).then(function (res) {
      if (res.result == "success") {
        that.setData({
          vacationTime: res.data.details
        });
        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showModal({
          content: '暂无信息',
          showCancel: false
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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
    this.getlistDatat();
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