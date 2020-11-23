// pages/changepwd/index.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empno: '',
    dpassword: '', //默认密码
    npassword: '',//新密码
    mpassword: '',//确认密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ empno: app.globalData.userInfo });
    //console.log(this.data.empno)

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
  getNPassword(e) {
    this.setData({
      npassword: e.detail.value
    })
  },
  getMPassword(e) {
    this.setData({
      mpassword: e.detail.value
    })
  },
  submit(){
    if ( this.data.dpassword && this.data.npassword && this.data.mpassword) {
      wx.showLoading({
        title:  '请求中',
      }) 
      wx.request({
        url: api.Password,
        method: 'POST',
        data: {
          EmpNo: this.data.empno,
          DPassword: this.data.dpassword,
          NPassword: this.data.npassword,
          MPassword: this.data.mpassword,
        },
        dataType: 'json',
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {

          if (res.data.Code == 1) {

            // wx.setStorage({
            //   key: 'token',
            //   data: res.data.Token,
            // })
            
            wx.hideLoading();
            wx.redirectTo({
              url: '/pages/login/login',
            })
            wx.showToast({
              title: '重新登入',
            })
          } else if (res.data.Code == 0) {
            wx.hideLoading()
            wx.showToast({
              title: res.data.Message,
              image: '../../static/image/err.png'
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: res.data.Message,
              icon: "none"
            })
          }
        },
      })

    } else {
      wx.hideLoading()
      wx.showToast({
        image: '../../static/image/err.png',
        title: '请填写完整！',
      })
    }
  }
})