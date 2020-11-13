var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message: [],
    index: '',
    category: [],
    type: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面显示
    // wx.showLoading({
    //   title: '加载中...',
    //   success: function () {

    //   }
    // });
    this.getlistData();
  },
  changeType: function (e) {
    // console.log('picker携带值为' + e.detail.value)
    // console.log('picker携带值为' + this.data.category[e.detail.value].categoryName)
    this.setData({
      index: e.detail.value,
      type: this.data.category[e.detail.value].categoryName
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */

  getlistData() {
    let that = this;
    // empno: app.globalData.userInfo,site:app.globalData.site
    util.request(api.workLicense, {
      empno: app.globalData.userInfo,
      site: app.globalData.site
    }).then(function (res) {
      if (res.result == "success") {
        var message = [res.details];
        var category = res.category
        that.setData({
          message: message,
          category: category
        });
        wx.hideLoading();
      }
    });
  },
  submit: function (e) {
    let that = this;
    let index = that.data.index;
    let type = that.data.type;
    if (type !== '') {
      let info = {
        empno: that.data.message[0].empno,
        chName: that.data.message[0].chName,
        deptCode: that.data.message[0].deptCode,
        appCategoryID: that.data.category[index].categoryID,
      }
      console.log(info)
      util.request(api.workSubmit, info, "POST")
        .then(function (res) {
          if (res.result == 'success' && res.code == 1) {
            wx.showToast({
              title: '提交成功',
            });
            wx.navigateTo({
              url: '/packageHr/pages/workSuccess/index',
            })
          } else if (res.result == 'success' && res.code == 1) {
            wx.showToast({
              title: '提交重复',
            })
          } else {
            wx.showToast({
              icon: "none",
              title: '提交失败',
            })
          }
        });
    } else {
      wx.showToast({
        icon: "none",
        title: '请选择补办类型',
      })
    }
  },
  onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    // 增加下拉刷新数据的功能
    var self = this;
    this.getlistData();
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