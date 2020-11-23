// pages/main/index.js

var banklocker = require("../../../../utils/banklocker.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '设置一个手势密码',
    title_deputy:'绘制解锁图案，请至少连接4个点',
    resetHidden: false,
    titleColor: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    banklocker.lock.init();
    this.initState();
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

  /**
   * 设置提示语与重置按钮
   */
  initState: function(){
      var resetHidden = banklocker.lock.resetHidden;
      var title = banklocker.lock.title;
      var titleColor = banklocker.lock.titleColor;
      var title_deputy = banklocker.lock.title_deputy;
      var forgetHidden=banklocker.lock.forgetHidden;

      this.setData({
          resetHidden: resetHidden,
          title: title,
          titleColor: titleColor,
          title_deputy:title_deputy,
          forgetHidden:forgetHidden,
      });
  },

  /**
   * touchstart事件绑定
   */
  touchS: function(e){
      banklocker.lock.bindtouchstart(e);
  },

  /**
   * touchmove事件绑定
   */
  touchM: function(e){
      banklocker.lock.bindtouchmove(e);
  },

    /**
     * touchend事件绑定
     */
    touchE: function(e){
        banklocker.lock.bindtouchend(e,this.lockSucc);
        this.initState();
    },

    /**
     * 解锁成功的回调函数
     */
    lockSucc: function(){
        console.log('解锁成功！');
    },

    /**
     * 重置
     */
    lockreset: function(){
        banklocker.lock.updatePassword();
        this.initState();
    },

    lockforget:function(){
        wx.navigateTo({
            url: '/packageHr/pages/bankcard/locker/changelock'
          });
    }

})