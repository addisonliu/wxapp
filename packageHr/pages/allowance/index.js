// pages/allowance/allowance.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    resultA:'',
    resultC:'',
    DetailList:[],
    CleanDetailList:[],
    showDetail:false,
    index:0,
    special:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      //mask: true,
    });
    this.getlistDatat();
    var that = this;

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },  
  getlistDatat() {
    let that = this;
    util.request(api.AllowanceDetail, { empno: app.globalData.userInfo, site: app.globalData.site }).then(function (res) {
    //util.request(api.AllowanceDetail, { empno: 'K19028437', site: 'WKS' }).then(function (res) {
      console.log(res.DetailList)
      that.setData({
        resultA: res.resultA,
        DetailList: that.data.DetailList.concat(res.DetailList),
        resultC: res.resultC,
        CleanDetailList: that.data.CleanDetailList.concat(res.CleanDetailList),
      });
      wx.hideLoading();
      if (res.resultA == "none") {
        wx.hideLoading();
        that.setData({
          DetailList:[]
        });
        wx.showModal({
          title: '津贴明细',
          content: '暂无津贴明细',
          showCancel: false
        });
      }
      if (res.resultC == "none") {
        wx.hideLoading();
        that.setData({
          CleanDetailList: []
        });
      }
      else {
        wx.hideLoading();
      }
    });
  },
  ShowDetail:function(event){
    var i = event.target.dataset.key - 1;
    this.setData({
      index: event.target.dataset.key-1,
      showDetail:true,
      special: this.data.CleanDetailList[i].STATION_Post_DESC
    })
    console.log(this.data.index);
  },
  closeDetail: function () {
    this.setData({   //关闭规则模块
      showDetail: false
    });
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
    console.log(that.data);
    if (that.data.resultC == 'none' && e.detail.current == 1) {
      wx.showModal({
        title: '特殊岗位出勤',
        content: '暂无特殊岗位出勤',
        showCancel: false
      });
    }
    else if (that.data.resultA == 'none' && e.detail.current == 0)
    {
      wx.showModal({
        title: '津贴明细',
        content: '暂无津贴明细',
        showCancel: false
      });
    }
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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