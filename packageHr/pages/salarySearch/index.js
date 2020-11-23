var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    animation: '',
    site: '' 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });
    this.getInitData();
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
    wx.switchTab({
      url: '/pages/homepage/index'
    });
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
  getInitData: function() {
    let EmpNo = app.globalData.userInfo;
    util.request(api.SalarySearch, { EmpNo, site: getApp().globalData.site }).then( (res) => {
      if (res.result == "success") {
        for(let i = 0 ; i < res.DetailList.length; i ++) {
          res.DetailList[i].state = false;
          res.DetailList[i].id = i;
        }
        this.setData({
          list: res.DetailList
        })
        //console.log(this.data.list)
        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showModal({
          content: '暂无信息',
          showCancel: false
        });
      }
    });
  },
  changeState: function(e) {
    let temp = this.data.list;
    //let id = e.currentTarget.id;
    let id = e.currentTarget.dataset.parentindex
    console.log( e.currentTarget.id)
    //console.log(temp[id])
    temp[id].state = !temp[id].state;
    for(let i = 0 ; i < temp.length; i++){
      if(i != id){
         temp[i].state = false;
      }
    }
    this.setData({
      animation: temp[id].state ? 'show' : 'hidden',
      list: temp
    })
  }
})