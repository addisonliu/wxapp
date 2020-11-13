// packageHr/pages/thirteen/thirteen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    disabled: true,
    codename: '我已阅读',
    choose: '',
    noticechoose: '',
  },
  readClick: function () {
    this.setData({   //关闭规则模块
      showModal: false
    });
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '/packageHr/pages/dlthirteenstatus/thirteenstatus',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '该功能暂未开放',
      icon:'none',
      duration:2000,
      success:function(){
        setTimeout(function(){
        wx.switchTab({
          url: '/pages/homepage/index',
        })
      },1500);
      }
    });
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