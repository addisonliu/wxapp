var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mypublish: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      success: function () {
        wx.hideLoading();
      }
    });
    let that = this;
    // EmpNo:app.globalData.userInfo
    util.request(api.minePublish, {EmpNo: 'K20085910'}).then(function (res) {
      if (res.result == "success") {
        console.log(res.data.details)
        that.setData({
          mypublish: res.data.details
        })
      } else {
        wx.hideLoading()
      }
    })
    console.log(11111)

  },

  //编辑我发布的
  editPublish: function (e) {

  },
  //删除我发布的
  ondeleteTap: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.goodsid)
    wx.showModal({
      title: '提示',
      content: '确定删除此发布吗?',
      success: function (res) {
        var time = util.formatTimes(new Date());
        console.log(time)
        if (res.confirm) {
          util.request(api.deletePublished, {
            // EmpNo: app.globalData.userInfo,
            EmpNo: 'K20085910',
            GoodsID: e.currentTarget.dataset.goodsid
          }).then(function (res) {
            if (res.result == "success") {
              wx.showToast({
                title: '删除成功',
              })
              let newArr = []
              that.data.mypublish.map((item) => {
                if (item.GoodsID !== e.currentTarget.dataset.goodsid) {
                  newArr.push(item);
                }
                return newArr;
              })
              // console.log(newArr)
              that.setData({
                mypublish: newArr
              })
            } else {
              wx.showToast({
                title: '删除失败',
              })
            }
          })
        } else
        if (res.cancel) {
          return false;
        }
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