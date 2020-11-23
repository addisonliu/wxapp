// pages/DelayMeeting/DelayMeeting.js
var str;
var myid;
var start_datetime;
var end_datetime;
var json;
var that;
var app = getApp();
var next_str;
var nextmeeting_starttime;
Page({
  data: {
    picktime:"",
    roomid:"",
    myid:"",
    date:"",
    time:"",
    starttime:'',
    endtime:'',
    nextmeeting_time:'',
    nextmeeting_date:'',
    modalHidden:true
  },

  onLoad: function (options) {
    json = JSON.parse(options.msg);
    myid = json.myid;
    str = (json.time).split("-");
    start_datetime = json.date+" "+str[0];
    end_datetime = json.date+" "+str[1];
   
    this.setData({
      roomid:json.roomid,
      myid:myid,
      date:json.date,
      time:json.time,
      picktime:(str[1]).substring(0,5),
      starttime:start_datetime,
      endtime:end_datetime,
      nextmeeting_time:app.globalData.nextmeeting_time,
      nextmeeting_date:app.globalData.nextmeeting_date
    });

  },

  changeTime:function(e){
    this.setData({
       picktime: e.detail.value 
      });
      next_str = (this.data.nextmeeting_time).split("-");
      nextmeeting_starttime = next_str[0];
      if((this.data.picktime+":00") > nextmeeting_starttime && (this.data.date) == (this.data.nextmeeting_date)){
        this.setData({
          modalHidden:!this.data.modalHidden
        });
      }
  },

  modalBindaconfirm:function(){//确认按钮点击事件
    this.delay_ok();
  },

  modalBindcancel:function(){//取消按钮点击事件
    this.setData({
      modalHidden:!this.data.modalHidden
    })
  },

  delay_ok:function(){
    that = this;
    wx.request({
      url: 'https://TDDservice20.wistron.com/smartmeetingroom/Delay',
     data:{
      roomid:that.data.roomid,
      empno:myid,
      datetime1:start_datetime,
      datetime2:json.date+" "+that.data.picktime+":00",
     },
     header:{'content-type': 'application/json'},
     method:'GET',
     success:function(res){
       console.log(res)
       if(res.data == "yes"){
        that.setData({
          time:str[0]+"-"+that.data.picktime+":00",
         });
         app.globalData.TDDmeetingtime = str[0]+"-"+that.data.picktime+":00";
         wx.showToast({
          title: '延长成功',
          icon:'none',
          duration:1000,
        });
        that.setData({
          modalHidden:true
        })
       }else if(res.data == "no"){
        wx.showToast({
          title: '延长时间失败',
          icon:'none',
          duration:1000,
        })
       }else if(res.data == "no permission"){
        wx.showToast({
          title: '无修改权限',
          icon:'none',
          duration:1000,
        })
       }
     }, 
     fail:function(){
      wx.showToast({
        title: '延长时间失败',
        icon:'none',
        duration:1000,
      })
     }
    })
  }
})