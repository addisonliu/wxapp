// pages/unnormal/unnormal.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UnnormalDetail: [],
    height: '',
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlistDatat();
    var that = this;
    wx.showLoading({
      title: '加载中...',
      success: function () {

      }
    });
  },
  getlistDatat() {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        that.setData({ height: res.height - 0 });
      },
    });
    util.request(api.UnnormalDetail, { empno: app.globalData.userInfo,site:app.globalData.site }).then(function (res) {
      // util.request(api.UnnormalDetail, { empno: '' }).then(function (res) {
      if (res.result == "success") {
        that.setData({
          UnnormalDetail: that.data.UnnormalDetail.concat(res.DetailList), flag: true
        });
        wx.hideLoading();
      } else {
        wx.hideLoading();
        that.setData({ flag: false });
        wx.showModal({
          content: '暂无迟到早退记录',
          showCancel: false
        });
      }
    });
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