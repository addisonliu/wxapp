const util = require("../../../utils/util");
var api = require('../../../config/api.js');
var app = getApp();
// packageHr/pages/elevenstatus/elevenstatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Fourstatus:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBaseData();
    var that = this;
  },
getBaseData(){
  var that = this;
util.request(api.fourstatus,{EmpNo: app.globalData.userInfo, Site: app.globalData.site,}).then(function(res){
  // util.request(api.fourstatus,{EmpNo:'K20078448',Site:'WKS',}).then(function(res){
    console.log(res.data.details);
     if(res.result == "success"){
      // let i = new Set();
      // for (let x of res.data.details) {
      //   i.add(x.SkillLevel);
      // }
      // console.log(...i);
      that.setData({
        Fourstatus:that.data.Fourstatus.concat(res.data.details)
       })
       console.log(that.data.Fourstatus);
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
