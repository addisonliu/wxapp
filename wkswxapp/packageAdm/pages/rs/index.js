// pages/rs/rs.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LastRsList: [],
    RsList: [],
    currentTab: 0,
    winHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      success: function () {

      }
    });
    this.getlistDatat();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight 
        });
      }
    });
  },
  getlistDatat() {
    let that = this;
    util.request(api.RsDetail, { empno: app.globalData.userInfo, site: app.globalData.site }).then(function (res) {
    // util.request(api.RsDetail, { empno: 'K19089608', site:'WKS'}).then(function (res) {
      if (res.result == "success") {
        that.setData({
          RsList: that.data.RsList.concat(res.DetailList),
        });
        // console.log(that.data.RsList);
      } 
      if (res.lastresult == "success") {
        that.setData({
          LastRsList: that.data.LastRsList.concat(res.LastDetailList),
        });
        // console.log(that.data.LastRsList);
      } 
      else if (res.lastresult == "none") {
        wx.hideLoading();
        wx.showModal({
          title: '已结薪',
          content: '无记录',
          showCancel: false
        });
      }
      wx.hideLoading();
    });
  },
  /**
     * 滑动切换tab
     */

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
    //console.log(e.detail.current);
    if (that.data.LastRsList.length == 0 && e.detail.current == 0) {
      wx.showModal({
        title: '已结薪',
        content: '无记录',
        showCancel: false
      });
    }
    else if (that.data.RsList.length == 0 && e.detail.current == 1) {
      wx.showModal({
        title: '未结薪',
        content: '无记录',
        showCancel: false
      });
    }
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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