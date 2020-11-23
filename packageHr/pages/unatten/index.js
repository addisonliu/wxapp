// pages/except/except.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UnattenDetail:[],
    height:"",
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
        that.setData({ height:res.height-60});
      },
    });
    util.request(api.UnattenDetail, { empno: app.globalData.userInfo,site:app.globalData.site  }).then(function (res) {
    //util.request(api.UnattenDetail, { empno: 'K17077623' }).then(function (res) {
      if (res.result == "success") {
        that.setData({
          UnattenDetail: that.data.UnattenDetail.concat(res.DetailList),
        });
        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showModal({
          title: '旷工明细查询',
          content: '暂无旷工记录',
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