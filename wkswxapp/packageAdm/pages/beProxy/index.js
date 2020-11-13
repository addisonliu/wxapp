// pages/BeProxy/BeProxy.js
var msg = null;
var myid;
var that;
var app = getApp();
Page({
  data: {
    btntype:'default',
    status:false,
    roomid:'',
    datetime1:'',
    datetime2:'',
    m1:'',
    m2:'',
  },

  onLoad: function (options) {
     msg = JSON.parse(options.msg);
     myid = msg.myid;
     this.setData({
      m1:myid,
    })
  },

  input_id:function(e){
    var value = (e.detail.value).toUpperCase();
    this.setData({
      m2:value
    });
  },

  submit:function(){
    that = this;
    if(that.data.m2 == ''){
      wx.showToast({
        title: '工号不可为空',
        icon:'none',
        duration:1000,
      })
    }else if(that.data.m2 == myid){
      wx.showToast({
        title: '工号填写重复，请重新填写',
        icon:'none',
        duration:1000,
      })
      that.setData({
        m2:'',
      })
    }else{
      var str = (msg.time).split("-");
      wx.request({
        url: 'https://TDDservice20.wistron.com/smartmeetingroom/BeiDaili',
        data:{
          roomid:msg.roomid,//"M1-1F-簡報室",
          datetime1:msg.date+" "+str[0],//"2020-07-31 13:00:00",
          datetime2:msg.date+" "+str[1],//"2020-07-31 17:00:00",
          m1:myid,   
          m2:that.data.m2,
        },
        header:{'content-type': 'application/json'},
        method:'GET',
        success:function(res){
          if(res.data == "yes"){
            wx.showToast({
              title: '提交成功',
              icon:'none',
              duration:1000,
            })
            that.setData({
              m2:'',
            })
          }else if(res.data == "no"){
            wx.showToast({
              title: '提交失败',
              icon:'none',
              duration:1000,
            })
            that.setData({
              m2:'',
            })
          }else if(res.data == "not exist 1" || res.data == "not exist 2"){
            wx.showToast({
              title: '被代理人不在此会议',
              icon:'none',
              duration:1000,
            })
            that.setData({
              m2:'',
            })
          }else if(res.data == "no 2"  || res.data == "no 1"){
            wx.showToast({
              title: '工号不存在',
              icon:'none',
              duration:1000,
            })
            that.setData({
              m2:'',
            })
          }else if(res.data == "exist 2"){
            wx.showToast({
              title: '已经参加会议，不可代理',
              icon:'none',
              duration:1000,
            })
            that.setData({
              m2:'',
            })
          }
        },
        fail:function(){
          wx.showToast({
            title: 'FAIL',
            icon:'none',
            duration:1000,
          })
          that.setData({
            m2:'',
          })
        }
      })
    
    }
  }
})