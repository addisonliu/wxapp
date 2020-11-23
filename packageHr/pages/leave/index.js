// pages/leave/leave.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    LeaveList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面显示
    wx.showLoading({
      title: '加载中...',
      success: function () {

      }
    });
    this.getlistDatat();
  },


  /**
   * 页面上拉触底事件的处理函数
   */

  getlistDatat() {
    let that = this;
    util.request(api.LeaveDetail, { empno: app.globalData.userInfo, site: app.globalData.site }).then(function (res) {
      if (res.result == "success") {
        that.setData({
          LeaveList: that.data.LeaveList.concat(res.DetailList),
        });
        wx.hideLoading();
      } else   {
        wx.hideLoading();
        wx.showModal({
         // title: '请假查询',
          content: '暂无请假记录',
          showCancel: false
        });
      }
    });
  },
  onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    // 增加下拉刷新数据的功能
    var self = this;
    this.getlistDatat();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }





})