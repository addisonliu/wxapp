// pages/Locker/changelock.js
var banklocker = require("../../../../utils/banklocker.js");
var util = require('../../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark:''
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

  },

    //键盘事件输入密码
    getDPassword(e) {
      this.setData({
        dpassword: e.detail.value
      })
    },

    submit(){
      if(app.globalData.userInfo){
          if(this.data.dpassword===app.globalData.IDNO){
            banklocker.lock.updatePassword();
            wx.navigateTo({
              url: '/packageHr/pages/bankcard/locker/index'
            });

          }
          else{
            this.setData({
              remark: '您输入的身份证号码不正确！'  
            })
          }
          
      }
      else{
        //需要登录后才可以操作
        wx.showModal({
          title: '',
          content: '请先登入',
          success: function (res) {
            if (res.confirm) {
              wx.removeStorageSync("userInfo");
              wx.removeStorageSync("token");

              wx.navigateTo({
                url: '/pages/login/login'
              });
            }
          }
        });
      }
    }

})