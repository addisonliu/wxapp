// pages/Traveler Status/index.js
var { PickQuery, PickDeatil, DepartQuery, DepartDeatil } = require('../../../config/api.js');
var app = getApp();
var util = require('../../../utils/util.js'); 
const { $Toast } = require('../../../components/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: true,
    data:[],
    date: '',
    showDetailKey: false,
    detailInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllData()
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
  getAllData: function() {
    let state = this.data.state;
    let url = state === true ? PickQuery : DepartQuery;
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });
    // let that = this;
    // util.request(url, { empno: app.globalData.userInfo, site: app.globalData.site }).then(function (res) {
    //   console.log(res.code)
    //   if (res.code == 1) {
    //     that.setData({
    //       data: res.data
    //     })
    //     wx.hideLoading();
    //   }
    //   else{
    //     wx.hideLoading();
    //     $Toast({
    //       content: res.message,
    //       type: 'warning'
    //     });
    //     setTimeout(()=>{
    //       wx.redirectTo({
    //         url: '/pages/index/index',
    //       })
    //     },1000)
    //   }
    // })
    wx.request({
      url,
      method: 'GET',
      data: { site: app.globalData.site, EmpNo: app.globalData.userInfo },
      dataType: 'json',
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            data: res.data.data
          })
          wx.hideLoading();
        }
        else{
          wx.hideLoading();
          $Toast({
            content: res.data.message,
            type: 'warning'
          });
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/homepage/index',
            })
          },1000)
        }
        
      }
    })
  },
  changeState: function(e) {
    let state = e.target.dataset.state;
    this.setData({
      state: state === 'true' ? true : false,
      showDetailKey: false
    })
    this.getAllData()
  },
  getDetail: function(e) {
    let site = e.currentTarget.id,
        date = e.currentTarget.dataset.date,
        state = this.data.state;
    let url = state ? PickDeatil : DepartDeatil;
    // let that = this;
    // util.request(url,{site,date}).then(function (res) {
    //   if (res.code == 1) {
    //     let temp = res.data;
    //       temp = temp.map(v => ({ ...v, state: false}))
    //       that.setData({
    //         showDetailKey: true,
    //         date: date,
    //         detailInfo: temp
    //       })
    //     }
    //     wx.hideLoading();
    // })
    wx.request({
      url,
      method: 'GET',
      data:{
        site,
        date
      },
      dataType: 'json',
      success: (res) => {
        if (res.data.code == 1) {
          let temp = res.data.data;
          temp = temp.map(v => ({ ...v, state: false}))
          this.setData({
            showDetailKey: true,
            date: date,
            detailInfo: temp
          })
        }
        wx.hideLoading();
      }
    })
  },
  changeArrowState: function(e) {
    let temp = this.data.detailInfo,
        id = e.currentTarget.id;
    temp = temp.map(v => {
      if(v.Site === id && v.state === false) {
        return {...v,state:true}
      }
      else {
        return {...v,state:false}
      }
    })
    this.setData({
      detailInfo: [...temp]
    })
  }
})