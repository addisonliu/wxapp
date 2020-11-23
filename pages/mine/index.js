var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mineMessage: [],
    avatarUrl: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
    title: '加载中...',
    success: function () {
    }
    });
    that.getuserInfo();
  },
  getuserInfo() {
    let that = this;
    util.request(api.MineMessage, {
      accountID: app.globalData.userInfo,
      site: getApp().globalData.site
    }).then(function(res) {
      if (res.result == "success") {
        var mineMessage = [];
        let objuser = res.data;
        for (let i in objuser) {
          mineMessage.push(objuser[i])
        }
        that.setData({
          mineMessage: mineMessage
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
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // var page = getCurrentPages().pop();
    // if (page == undefined || page == null) return;
    // page.onLoad();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getuserInfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**登出 */
  logout() {
    wx.setStorageSync("empno", "");
    wx.setStorageSync("password", "");
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})