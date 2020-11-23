var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionDataBase: [],
    singleSelect: [],
    MultiSelect: [],
    answer: [],
    index:'',
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      success: function () {}
    });
    that.getlistData();
  },
  //获取基础信息
  getlistData() {
    let that = this;
    util.request(api.questionNaire).then(function (res) {
      console.log(res)
      if (res.result == "success") {
        console.log(res.data.details)
        var singleSelect = res.data.details.slice(0, -4);
         var MultiSelect = res.data.details.slice(-3, -1);
        // var singleSelect =that.data.singleSelect;
        for (let i in singleSelect) {
          var answer = singleSelect[i].Answer;
          var answers = answer.map(v => ({
            option: v
          }));
          var answer = answer.splice(0, -1).concat(answers)
          // console.log(answer)
          // var c = answer[0]
          // c.checked = 'true';
          singleSelect[i].Answer = answer;
        }
       
        that.setData({
          singleSelect: singleSelect
        });
        // console.log(that.data.singleSelect)

        for (let i in MultiSelect) {
          var answer = MultiSelect[i].Answer;
          var answers = answer.map(v => ({
            option: v
          }));
          var answer = answer.splice(0, -1).concat(answers)
          // console.log(answer)
          // var c = answer[0]
          // c.checked = true;
          MultiSelect[i].Answer = answer;
        }
       
        that.setData({
          MultiSelect: MultiSelect
        });
        wx.hideLoading();
      } else {
        console.log('系统异常：' + res.result)
        wx.showToast({
          title: '系统异常，请联系IT管理员',
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/homepage/index',
              })
            }, 2000);
          }
        });
      }
    });
  },
  radiochange:function(e){
    var that = this;
    console.log('radio发生change事件，携带value值为：', e.currentTarget.dataset.id)
      console.log('radio发生change事件，携带value值为：', e.detail.value)
      var ID = e.currentTarget.dataset.id;
      const items = that.data.singleSelect[ID].Answer
      console.log(items,'开始')
      for (let i = 0;i < items.length;i++) {
        items[i].checked = items[i].value === e.detail.value
      }

      that.setData({
        items
      })
      console.log(items,'结束后')

  },

  radio:function(e){
      //  var that = this;
      //  var checked = that.data.checked
      //  that.setData({
      //    checked:!checked
      //  })
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