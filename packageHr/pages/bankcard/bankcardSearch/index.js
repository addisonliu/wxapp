var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankDataBase:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      success: function () {}
    });
    that.getlistDatat();
  },

  //获取基础信息
  getlistDatat() {
    let that = this;
    // empno: app.globalData.userInfo, site: app.globalData.site 
    util.request(api.bankApplyData, { empno: app.globalData.userInfo, site: app.globalData.site}).then(function (res) {
      console.log(res)
    if (res.result == "successful" && res.code == '1') {
      console.log([res.details])
      that.setData({
        bankDataBase: that.data.bankDataBase.concat(res.details)
      });
       wx.hideLoading();
    }else if(res.result == "successful" && res.code == '2'){//新人数据
      console.log(res.details)
      that.setData({
        bankDataBase:that.data.bankDataBase.concat(res.details)
      });
      wx.showToast({
        title: '您尚无绑定银行卡，请上传银行卡',
        icon:'none',
        duration:1500,
        success:function(){
          setTimeout(function(){
          wx.navigateTo({
            url: '/packageHr/pages/bankcard/index/index',
          })
        },1500);
        }
      });
    }else{
      console.log('系统异常：'+ res.result)
      console.log(res.code)
      wx.showToast({
        title: '系统异常,请联系统管理员',
        icon:'none',
      })
    }
    }
    );
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