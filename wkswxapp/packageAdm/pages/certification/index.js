// pages/certification/certification.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
const { $Toast } = require('../../../components/base/index');
var { $Message } = require('../../../components/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    visible: false,
    actions: [{ name: '确定' }],
    site:'',
    name: '',
    userId:'',
    idNum: '',
    cerdate:'',
    cermain: '',
    company: ''
  },
  getBaseData() {
    let that = this;
    util.request(api.CertificationBase, { empno: app.globalData.userInfo, site: app.globalData.site })
      //util.request(api.OutBase, { empno: 'K17058197', site: 'wks' })
      .then(function (res) {
        if (res.result == "success") {
          if (res.EmpList.length > 0) {
            that.setData({
              site: app.globalData.site,
              name: res.EmpList[0].Chname,
              userId: res.EmpList[0].Empno,
              idNum: res.EmpList[0].IDNO,
            })
            if (res.cermain != '' && res.cerdate != '' && res.cercomp != '') {
              var newmain = res.cermain.replace(/\\n/g, '\n');
              that.setData({
                cermain: newmain,
                cerdate: res.cerdate,
                company: res.cercomp,
                show:true
              })
            }
            else{
              that.setData({
                error: that.data.site + '暂不支持此功能',
                visible: true,
              })
            }
          } 
        }
        else {
          that.setData({
            error: res.result,
            visible: true,
          })
          // $Toast({
          //   content: res.result,
          //   type: 'warning'
          // });
          // wx.showToast({
          //   image: '../../../static/image/err.png',
          //   title: res.result,
          // })
        }
        console.log(that.data);
      });
  },
  handleClick({ detail }) {
    this.setData({
      visible: false
    });
    wx.switchTab({
      url: '/pages/homepage/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo == "") {
      wx.showModal({
        title: '',
        content: '请先登入',
        success: function (res) {
          if (res.confirm) {
            wx.removeStorageSync("userInfo");
            wx.removeStorageSync("token");

            wx.navigateTo({
              url: '/pages/login/login'
            });
          }
        }
      });
    }
    else {
      this.getBaseData();
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