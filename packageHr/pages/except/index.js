// pages/except/except.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    except:[{
      id:1,
      name: "旷工明细",
      url:"/packageHr/pages/unatten/index"
    }, {
        id: 2,
        name: "上下班未刷卡明细",
        url: "/packageHr/pages/unbrush/index"
      }, {
        id: 3,
        name: "迟到早退明细",
        url: "/packageHr/pages/unnormal/index"
      }

    ]
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

  }
})