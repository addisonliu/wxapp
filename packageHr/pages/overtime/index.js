// pages/overtime/overtime.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    overtimeSummary:[],
    OvertimeDetail:[],
    currentTab:0
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
    util.request(api.Overtime, { empno: app.globalData.userInfo,site:app.globalData.site }).then(function (res) {
    // util.request(api.Overtime, { empno: 'k19115108',site :'wks'}).then(function (res) {
      //  console.log(res.resultD);
      //  console.log(res.resultS);
      if (res.resultD == "success") {
        that.setData({
          OvertimeDetail: that.data.OvertimeDetail.concat(res.DetailList),
        });
        //console.log(that.data.OvertimeDetail);
        wx.hideLoading();
      }
      if (res.resultS == "success") {
        that.setData({
          overtimeSummary: res.SummaryList,
        });
        //console.log(that.data.OvertimeDetail);
        wx.hideLoading();
      }  
      else {
        wx.hideLoading();
        // wx.showModal({
        //   // title: '请假查询',
        //   content: '暂无请假加班记录',
        //   showCancel: false
        // });
      }
    }
    );
  },

  
  //点击最外层列表展开收起
  listTap(e) {
    console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentindex,//获取点击的下标值
      overtimeSummary = this.data.overtimeSummary;
    overtimeSummary[Index].show = !overtimeSummary[Index].show || false;//变换其打开、关闭的状态
    if (overtimeSummary[Index].show) {//如果点击后是展开状态，则让其他已经展开的列表变为收起状态
      this.packUp(overtimeSummary, Index);
      
      wx.getSystemInfo({
        success: res => {
          //console.log(res)
          //获取文字高度rpx
          let height = res.screenHeight-160
          //文字高度 
          console.log(height) ;
          overtimeSummary[Index].height = height;
          overtimeSummary[Index].height0 = height-45;
          console.log(overtimeSummary[Index]);
          }, 
      });
    }
    else{
      overtimeSummary[Index].height = 45;
      overtimeSummary[Index].height0 = 0;
    }
    this.setData({
      overtimeSummary
    });
  },
  //点击里面的子列表展开收起
  listItemTap(e) {
    let parentindex = e.currentTarget.dataset.parentindex,//点击的内层所在的最外层列表下标
      Index = e.currentTarget.dataset.index,//点击的内层下标
      overtimeSummary = this.data.overtimeSummary;
    console.log(overtimeSummary[parentindex].item, Index);
    overtimeSummary[parentindex].item[Index].show = !overtimeSummary[parentindex].item[Index].show || false;//变换其打开、关闭的状态
    if (overtimeSummary[parentindex].item[Index].show) {//如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
      for (let i = 0, len = overtimeSummary[parentindex].item.length; i < len; i++) {
        if (i != Index) {
          overtimeSummary[parentindex].item[i].show = false;
        }

      }
    }
    this.setData({ overtimeSummary });
  },
  //让所有的展开项，都变为收起
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) {//其他最外层列表变为关闭状态
      if (index != i) {
        data[i].show = false;
        data[i].height = 45;
        data[i].height0 = 0;
        // for (let j = 0; j < data[i].item.length; j++) {//其他所有内层也为关闭状态
        //   data[i].item[j].show = false;
        // }
      }
    }
  },
  /**
     * 滑动切换tab
     */
  
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
    //console.log(e.detail.current);
    if (that.data.OvertimeDetail.length == 0 && e.detail.current==1)
    {
      wx.showModal({
           title: '加班查询',
          content: '本月暂无加班记录',
          showCancel: false
        });
    }
    
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    console.log('tab切换====='+e.target.dataset.current);
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