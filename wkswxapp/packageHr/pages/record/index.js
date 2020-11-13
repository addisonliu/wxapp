// pages/record/index.js
var util = require('../../../utils/record.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    RecordDetial: [], 
    RecordHistory: [],
    Record: [],
    recorddetail:[],
    newrecord:[],
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlistDatat();
    this.getlistdata();
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });

    // wx.getSystemInfo({
    //   success: function (res) {
    //     this.setData({
    //       winWidth: res.windowWidth,
    //       winHeight: res.windowHeight
    //     });
    //   }
    // });
  },
  getlistdata() {
    let that = this;
    util.request(api.today, { userNo: app.globalData.userInfo}).then(function (res) {
    //   util.request(api.today, { userNo: 'k20075305' }).then(function (res) {
    //  console.log(res.result);
      if (res.result == "success") {
        that.setData({
          RecordDetial: that.data.RecordDetial.concat(res.data.details),
        });
          wx.hideLoading();
      }
      else {
        wx.hideLoading();
        that.setData({
          RecordDetial: that.data.RecordDetial.concat({"userDate":"无记录","mode":""}),
        });
      }
    }
    );
  },
  getlistDatat() {
    let that = this;
    util.request(api.history, { userNo: app.globalData.userInfo, site: app.globalData.site}).then(function (res) {
    if (res.result == "success") {
      let i = new Set();
      for (let x of res.data.details) {
        i.add(x.yearAndMonth);
      }
      let array = [...i]
      let recorddetail = {}
      let newrecord = []
      array.map((item)=>{
        recorddetail[item]=[]
        newrecord = [...newrecord, { yearmonth: item, show:false}]
      })
      let id = 0
      res.data.details.map((item,index)=>{
        if(item.onReTime === null){
          item.onReTime="--";
        }
        if(item.offReTime === null){
          item.offReTime="--";
        }
        if(item.workTime == ""){
          item.workTime="0";
        }
        item.id= id
        recorddetail[item.yearAndMonth] = [...recorddetail[item.yearAndMonth],item]
        id++
      })
     
      that.setData({
        Record: that.data.Record.concat([...i]),
        recorddetail: recorddetail,
        newrecord:newrecord,
      });
    }
      else {
        wx.hideLoading();
      }
    }
    );
  },
  //点击最外层列表展开收起
  listTap(e) {
    //console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentitem//获取点击的下标值
      //console.log(e.currentTarget)
      let newrecord = []
      this.data.newrecord.map((item)=>{
        //console.log(item);
        if (item.yearmonth == Index.yearmonth){
          newrecord = [...newrecord, { yearmonth: Index.yearmonth, show: !Index.show}]
        }
        else{
          newrecord = [...newrecord,{ yearmonth: item.yearmonth, show: false}]
        }
      })
      this.setData({
        newrecord
    });
  },
    /**
     * 滑动切换tab
     */

    bindChange: function (e) {
      var that = this;
      that.setData({ currentTab: e.detail.current });
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
    this.getlistDatat();
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