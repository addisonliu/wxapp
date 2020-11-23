// pages/healthSearch/healthSearch.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    empno:'',
    date:'',
    todayauth:'',
    tomorrowauth:'',
    todaydesc:'',
    tomorrowdesc:'',
    health:'',
    healthdesc:'',
    check:'',
    special:'',
    action:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getBaseData() {
    let that = this;
    util.request(api.HealthSearch, { empno: app.globalData.userInfo, site: app.globalData.site })
      //util.request(api.OutBase, { empno: 'K17058197', site: 'wks' })
      .then(function (res) {
        if (res.result == "success") {
          var date = util.formatDate(new Date());
          var healthdescribe ='';
          if (res.health=="A"){
            healthdescribe = "已隔离";
          }
          else if (res.health == "B") {
            healthdescribe = "发热就医";
          }
          else if (res.health == "C") {
            healthdescribe = "医学观察";
          }
          else if (res.health == "D") {
            healthdescribe = "发热隔离";
          }
          else if (res.health == "E") {
            healthdescribe = "正常";
          }
          else if (res.health == "N") {
            healthdescribe = "未填写";
          }
          that.setData({
            empno: app.globalData.userInfo,
            date:date,
            todayauth: res.todayauth,
            tomorrowauth: res.tomorrowauth,
            health: res.health,
            healthdesc: healthdescribe,
            check: res.check,
            action: res.action,
            special: res.special,
            todaydesc: res.todaydesc,
            tomorrowdesc: res.tomorrowdesc,
            hidden:true
          })
          wx.hideLoading();
        }
        else {
          wx.hideLoading();
          wx.showToast({
            image: '../../../static/image/err.png',
            title: 'ERROR',
          })
        }
        console.log(that.data);
      });
  },
  onLoad: function (options) {
    if (app.globalData.userInfo == "") {
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
    else {
      if (app.globalData.site != 'WKS') {
        wx.showModal({
          title: '提示',
          content: app.globalData.site + '暂不支持此功能.',
          success: function (res) {
            console.log(res)
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/homepage/index',
              })
            }
          }
        });
      }
      else{
        wx.showLoading({
          title: '加载中...',
          success: function () {
          }
        });
        this.getBaseData();
      }
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