// pages/Scan/Scan.js
const app = getApp()
var token;
var time ;
var util = require('../../../utils/tddutils.js');
var roomid;
var myid;
Page({
  data:{
     myid:"",
  },

  onLoad:function(options){
    time = util.formatTime(new Date());  
    this.setData({
      myid:app.globalData.userInfo,
    });
  },

  click: function () {
    wx.scanCode({
      onlyFromCamera:true,
      success: (res) => {
        roomid = (res.result).toUpperCase();
        myid = this.data.myid;
        console.log(myid);
        console.log(time);
        wx.request({
          url: 'https://TDDservice20.wistron.com/smartmeetingroom/GetMrInfo/schedule',
          data:{
             date1:time,
             date2:time,
             roomid:roomid,
             empno:app.globalData.userInfo
           },
           header:{'content-type': 'application/json'}, 
           method:'GET',
           success:function(res){
            //判断会议室是否存在
            if(res.data == "no"){
              wx.showToast({
                title: '会议室不存在，请重新扫码',
                icon:'none',
                duration:1000,
              }) 
            }else{
              var json = {"datebegin":time,"dateend":time,"meetingNumber":roomid,"listData":res.data,"myid":myid};
              wx.navigateTo({
                url:'../detailedMessage/index?json='+ JSON.stringify(json),
              })
            }
           },
           fail:function(){
             wx.showToast({
               title: '信息获取失败',
               icon:'none',
               duration:1000,
             }) 
           }
         });
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  create_QR:function(){
    wx.navigateTo({
      url: '../create_QR/create_QR',
    })
  }
})