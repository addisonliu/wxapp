// packageHr/pages/skill/skill.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Skillarr: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBaseData();
    var that = this;
  },
  getBaseData() {
    var that = this
    util.request(api.skill, {EmpNo: app.globalData.userInfo  }).then(function (res) {
      //  let Array = ["K0803607","K17027435","K19072519","K19073693", "K19110258","K20038167","K2003F496", "K20078448"]
      //  for(let i in Array ){
      //    console.log(app.globalData.userInfo);
      //  if (app.globalData.userInfo!==Array[i]){
      //    wx.switchTab
      //    ({
      //      url: '/pages/homepage/index',
      //    })

      //  }
      // }
      //  util.request(api.skill,{EmpNo:"K19072519"}).then(function(res){

      console.log(res.data);
      console.log(Array);
      if (res.result == "success") {
        that.setData({
          Skillarr: that.data.Skillarr.concat(res.data.details[0].DLSkillList)
        })
        console.log(that.data.Skillarr);
      }
    })
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