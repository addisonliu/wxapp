var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
// packageAdm/pages/shoecabinet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // showModal: false,
    shoeRegion: [],
    shoeClosetNo: [],
    // reasonArr:["柜门损坏","锁扣损坏"],
    // reason:[],
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
    util.request(api.shoe,{EmpNo: app.globalData.userInfo ,Site: app.globalData.site, }).then(function (res) {
    // util.request(api.shoe, {
    //   EmpNo: 'K20075305',
    //   Site: 'WKS',
    // }).then(function (res) {
      // console.log(res.data.details)
      if (res.result == "success") {
        console.log(res.data.details)
        that.setData({
          shoeRegion: res.data.details[0].Region,
          shoeClosetNo: res.data.details[0].ClosetNo
        })
        console.log(that.data.shoeRegion);
        console.log(that.data.shoeClosetNo);
      }
    })
  },
  //   readsubmit:function(){
  //   this.setData({   //关闭规则模块
  //     showModal: true,
  //     success:function(){
  //     }
  //   });
  //  },
  //  readalter: function() {
  //   wx.navigateTo({
  //     url: '/packageAdm/pages/shoecabinet/index',
  //   })
  // },
  // sendApplication : function() {
  //   wx.navigateTo({
  //     url: '/packageAdm/pages/shoesuccess/index',
  //   })
  // },
  //  bindPickerChange: function (e) {
  //    let that = this;
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value
  //   })
  //   console.log(that.data.reasonArr[this.data.index]);   
  //   that.setData({
  //     reason:that.data.reasonArr[this.data.index]
  //   })
  //   // console.log(that.data.reason);
  // },

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