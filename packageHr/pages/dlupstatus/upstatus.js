// packageHr/pages/upstatus/upstatus.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  upArr:[],
  },

  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: 'pages/skillapplication/up/up',
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getBaseData();
      var that = this;
  },
 getBaseData(){
  var that = this;
   util.request(api.skill,{EmpNo: app.globalData.userInfo,}).then(function(res){
    // util.request(api.upstatus,{EmpNo: "K20078458",}).then(function(res){
     console.log(res.data);
     if(res.result == "success"){
       that.setData({
        upArr:that.data.upArr.concat(res.data.details[0].DLSkillList)
       })
       console.log(that.data.upArr);
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