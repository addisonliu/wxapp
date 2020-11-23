var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postID:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postID= options.id;
    let that = this;
    that.data.postID = postID;
    util.request(api.goodsDetalis, {
      GoodsID:postID,
    }).then(function (res) {
      if (res.result == "success") {
        var goodsdetails = res.data.details;
        var goodsmessage = [goodsdetails.shift(1)]
        that.setData({
          goodsdetails: goodsmessage,
          goodsimgs:goodsdetails
        })
      } else {
        wx.hideLoading()
      }
    })
  },
  // 私信功能
  onprivateletterTap:function(){
    util.request(api.sendMessage, {
      Empno:app.globalData.userInfo,
      GoodsID:that.data.postID,      
    }).then(function (res) {
      if (res.result == "success") {

      }else{

      }
    })
  },

//收藏功能
  collectGoods:function(){
    var that = this;
    var time = util.formatTimes(new Date());
    var info= {
      CollectedTime:time,
      CollectedEmpNo:'K20085910',
      GoodsID:that.data.postID
    }
    util.requests(api.insertCollect,info,"POST").then(function (res) {
      if (res.result == "success") {
        wx.showToast({
          title: '收藏成功',
        })
        wx.navigateTo({
          url: "/packageLife/pages/idleitems/mycollection/index"
        });
      }else{
        wx.showToast({
          title: '收藏失败 网络错误',
        });
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