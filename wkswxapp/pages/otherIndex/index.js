// pages/otherIndex/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    title:''
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

  },

  NotSupported: function () {
    wx.showModal({
      title: '错误信息',
      content: '暂不支持此操作',
      showCancel: false
    });
  },
  test(){
    this.handleWarning()
  },
  handleWarning: function (content,type) {
    this.handleShow('该功能暂时无法使用')
  },
  handleShow: function (title){
    this.setData({
      show:true,
      title
    })
  },
  handleHidden:function(e){
    this.setData({
      show: false
    })
  }
})