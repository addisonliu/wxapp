// pages/applicationSearch/index.js
var api = require("../../../config/api.js");
var { $Message } = require('../../../components/base/index.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    title:'',
    visible:false,
    phoneNumber:''
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showMessage: function (content,type){
    $Message({
      content,
      type
    })
  },
  back:function (){
    wx.redirectTo({
      url: '/pages/otherIndex/index',
    })
  },
  checkPhone: function (e){
    let chkPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!chkPhone.test(e.detail.value)){
      this.showMessage('手机号码格式不正确','warning');
      return
    }
    this.setData({
      [e.currentTarget.id]:e.detail.value
    })
  },
  handleClick: function (){
    if(!this.data.phoneNumber)
    {
      return
    }
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });
    this.getInformation(this.data.phoneNumber)
  },
  getInformation: function (telephone){
    wx.request({
      url: api.HistoryApplication,
      data: { telephone, site:app.globalData.site },
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            list: [...res.data.data]
          })
        }
        wx.hideLoading();
      },
      fail: (res) => {
        this.showMessage(res.data.message, 'error')
        wx.hideLoading();
      },
    })
  }

})