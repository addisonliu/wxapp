// packageHr/pages/onJob/index.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Email: '', //输入邮箱
    creatPDF: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getEmail: function (e) {
    console.log('input输入邮箱地址' + e.detail.value)
    this.setData({
      Email: e.detail.value
    })
  },
  submit: function (e) {
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
    } else {
      // console.log('郵箱為：' + this.data.Email);
      // let str = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      let str = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      // console.log(str.test(this.data.Email));
      if (!str.test(this.data.Email)) {
        wx.showToast({
          title: '請輸入正確的郵箱地址',
          icon: 'none',
          duration: 1500
        });
      } else {
        wx.showLoading({
          title: '加载中...',
          success: function () {}
        });
        wx.hideLoading();
        var that = this;
        let info = {
          empno: app.globalData.userInfo,
          site: app.globalData.site,
          mailTo: that.data.Email
        }
        util.request(api.employingCreatPDF, info, "POST")
          //util.request(api.ResignBase, { empno: 'K17058197', site: 'WKS' })
          .then(function (res) {
            // console.log('res.result:' + res.result);
            if (res.result == "GeneratePDFSuccessful") {
              console.log(res)
              that.setData({
                creatPDF: res.details
              })
              let info1 = {
                empno: app.globalData.userInfo,
                mailTo: that.data.creatPDF.mailTo,
                pdfName: that.data.creatPDF.pdfName,
                pdfFile: that.data.creatPDF.pdfFile
              }
              // console.log(info1)
              util.request(api.employingSendMail, info1, "POST").then(function (res) {
                if (res.result == 'SendSuccessful') {
                  let info2 = {
                    empno: app.globalData.userInfo,
                    mailTo: that.data.creatPDF.mailTo,
                    pdfFile: that.data.creatPDF.pdfFile
                  }
                  // console.log(info2)
                  util.request(api.employingDeleteMail, info2, "POST").then(function (res) {
                    if (res.result == 'delEnclosureSuccessful') {
                      wx.showToast({
                        title: '提交成功,稍后发送在职证明至邮箱',
                        icon:'none',
                        duration:1500,
                        success:function(){
                          setTimeout(function(){
                          wx.switchTab({
                            url: '/pages/homepage/index',
                          })
                        },1500);
                        }
                      });
                    }
                  })
                }
              })
            } else {
              // console.log(res.result)
              wx.showToast({
                title: '提交失败，请联系管理员',
                success: function () {}
              });
            }
          });
      }
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