// pages/healthcheck/health.js
const app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emplid: '',
    name:'张三',
    declareStatus:false,
    backToWork:false,
    site: '',
    isHidden:true,
    enablePost:false,
    lastTime:new Date(),
    temperatureHis: [{ temp: 36.5, time: util.formatTime(new Date()) }, { temp: 36.8, time: util.formatTime(new Date()) }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page=this;
    page.setData({
      emplid: app.globalData.userInfo,
      site: app.globalData.site,
    })
    var lastTemperatureTime;
    if (app.globalData.site!='WZS')
      {
        wx.showModal({
          title: '提示',
          content: app.globalData.site+'暂不支持此功能.',
          success:function(res) {
            console.log(res)
            if (res.confirm){
              wx.switchTab({
                url: '/pages/homepage/index',
              })
            }
          }
        });
      }else{
        //check declaration and last history time
      wx.request({
          url: 'https://wzsapi.wistron.com/DLH/EMP_CERTIFY/api/persontemp',
        //这里填写你的接口路径
        header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
          'Content-Type': 'application/json'
        },
        data: {//这里写你要请求的参数
          emplid: this.data.emplid,
        },

        success: function (res) {
          //这里就是请求成功后，进行一些函数操作
          //console.log(res.data);
          wx.hideLoading();
          if (res.data.content == '') {
            wx.showModal({
              title: 'Error',
              content: '资料不存在或输入错误，请稍后重试!',
              success(res) {
                return;
              }
            });
          } else {
                 if(res.data.content.emplid=='')
                 {
                   //not declare...
                   wx.showModal({
                     title: 'Error',
                     content: '资料不存在!',
                     success(res) {
                       return;
                     }
                   });
                 }else{

                   var items = [];
                   if (res.data.content.pertempdata!=null){
                        var tempL = res.data.content.pertempdata;
                        //遍历数据
                        for (let i = 0; i < tempL.length; ++i) { 
                          //console.log(tempL[i]);
                          if (lastTemperatureTime == undefined) {lastTemperatureTime = tempL[i].idate;
                          } else {lastTemperatureTime = lastTemperatureTime < tempL[i].idate ? tempL[i].idate : lastTemperatureTime;}
                          items.push({ temp: tempL[i].pertemp, time: util.formatTime(new Date(tempL[i].idate)) });
                        }
                   }
                   lastTemperatureTime = lastTemperatureTime == undefined ? new Date() : lastTemperatureTime;
                   //console.log('lastTemperatureTime:' + lastTemperatureTime);
                   page.setData({
                              emlid: res.data.content.emplid,
                              name: res.data.content.cname,
                              declareStatus: res.data.content.iS_PROCLAIM,
                              backToWork: res.data.content.iS_RETURN_WORK_CERTIFY,
                              temperatureHis: items,
                              isHidden: false,
                              lastTime: lastTemperatureTime
                                  });
                   page.check(page);
                 }
          }
        }
      });
        //end of check
    }
  },

  check:function(page){
    var gapHours = (new Date().getTime() - new Date(page.data.lastTime).getTime()) / (1000 * 60 * 60);
  if(page.data.temperatureHis.length >= 2) {
        page.setData({ enablePost: false });
        wx.showModal({
          title: '提示',
          content: '已录入第二次体温, 无需重复录入.',
          success(res) {
            return;
          }
        });
      }
  else if (!page.data.declareStatus || gapHours < 4) {
      page.setData({ enablePost: false });
      wx.showModal({
        title: '提示',
        content: '健康宣告书填完后间隔4小时才能填第2次温度!',
        success(res) {
          return;
        }
      });
    } 
    else page.setData({ enablePost: true });
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

  saveTemperature: function(e){
    var temp = e.detail.value.temperature;
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('form发生了submit事件，携带数据为：', temp)
    //check declaration and last history time
    if(temp==''){
      wx.showModal({
        title: '提示',
        content: '请以数字格式填写温度数据!',
        success(res) {
          return;
        }
      });
      return ;
    }else{
      var regPos = /^\d+(\.\d+)?$/;
      if (!regPos.test(temp)){
        wx.showModal({
          title: '提示',
          content: '请以数字格式填写温度数据!',
          success(res) {
            return;
          }
        });
        return;
      }
    }
    wx.request({
      url: 'https://wzsapi.wistron.com/DLH/EMP_CERTIFY/api/persontemp?emplid=' + this.data.emplid + '&personTemp=' + temp,
      //这里填写你的接口路径
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      method:'POST',
      data: {//这里写你要请求的参数
        // emplid: this.data.emplid,
        // personTemp: temp,
      },

      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        console.log(res.data);
        wx.hideLoading();
        if (res.data.msg == "OK") {
          wx.showModal({
            title: '提示',
            content: '资料保存成功!',
            success(res) {
              return;
            }
          });
        } else {
            wx.showModal({
              title: 'Error',
              content: res.data.msg,
              success(res) {
                return;
              }
            })
        }
      }
    });
        //end of save
  }
})