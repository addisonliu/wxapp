// pages/MeetingMessage/meetingmessage.js
var start_datetime = null;
var end_datetime = null;
var roomid = null;
var app = getApp();
var myid;
var json;
Page({
  data: {
    roomid:'',
    time:'',
    date:'',
    orderpeople:'',
    hoster:'',
    meeting_substance:'',
    joinpeople:'',
    value1:'代理',
    value2:'被代理',
    checked1:false,
    checked2:false,
    sexs:[
      {num:'0',value:'代理'},
      {num:'1',value:'被代理'},
    ],
    checked:false,
    btntype:'default',
    agent:'',
    status:true,
    modalHidden:true,
    myid:''
  },

  onLoad: function (options) {
    json = JSON.parse(options.json);
    myid = json.myid;
   
    this.setData({
      roomid:json.ROOMID,
      time:app.globalData.TDDmeetingtime,
      date:json.DATE,
      orderpeople:json.YUDINGZHE,
      hoster:json.ZHUCHIREN,
      meeting_substance:json.SUBJECT,
      joinpeople:json.MEMBERS,
      myid:myid,
    })
  },

checkedTap1: function () {
  var checked1 = this.data.checked1;
  var checked2 = this.data.checked2;
  if(checked2 === false){
    var status = this.data.status;
    this.setData({
      checked1: !checked1,
      status:!status,
      agent:"代理",
    });
  }else{
    var status = this.data.status;
    this.setData({
      checked2:false, 
      checked1: !checked1,
      agent:"代理",
    });
  }

},

checkedTap2: function () {
  var checked1 = this.data.checked1;
  var checked2 = this.data.checked2;
  if(checked1 === false){
    var status = this.data.status;
    this.setData({
      checked2: !checked2,
      status:!status,
      agent:"被代理",
    })
  }else{
    var status = this.data.status;
    this.setData({
      checked1:false,
      checked2: !checked2,
      agent:"被代理"
    })
  }
},

  dailisheding:function(){//事件处理函数
    this.setData({
      modalHidden:!this.data.modalHidden
    });
  },

  modalBindaconfirm:function(){//确认按钮点击事件
    if(this.data.agent === "代理"){
      var msg = {"roomid":this.data.roomid,"time":this.data.time,"date":this.data.date,"myid":myid};
      wx.navigateTo({
        url: '../agentSet/index?msg='+JSON.stringify(msg),
      })
    }else if(this.data.agent === "被代理"){
      var msg = {"roomid":this.data.roomid,"time":this.data.time,"date":this.data.date,"myid":myid};
      wx.navigateTo({
        url: '../beProxy/index?msg='+JSON.stringify(msg),
      })
    }
  },

  modalBindcancel:function(){//取消按钮点击事件
    this.setData({
      modalHidden:!this.data.modalHidden
    })
  },

  delay_btn:function(){
    //延长会议
    var msg = {"roomid":this.data.roomid,"myid":myid,"time":this.data.time,"date":this.data.date};
    wx.navigateTo({
      url: '../delayMeeting/index?msg='+JSON.stringify(msg),
    })
  },

  onPullDownRefresh:function(){
    this.updateMeetingMsg();
  },

  updateMeetingMsg:function(){
    var that = this;
    var t = (app.globalData.TDDmeetingtime).split("-");
    start_datetime = that.data.date+" "+t[0];
    end_datetime = that.data.date+" "+t[1];
    roomid = that.data.roomid;
    wx.request({ 
      url: 'https://TDDservice20.wistron.com/smartmeetingroom/GetMrInfo/detail',
      data:{
       start_datetime:start_datetime,
       end_datetime:end_datetime,
       roomid:roomid,
      },
      header:{'content-type': 'application/json'},
      method:'GET',
      success:function(res){
        if(JSON.stringify(res.data[0]) != null){
        that.setData({
          roomid:res.data[0].ROOMID,
          time:app.globalData.TDDmeetingtime,
          date:res.data[0].DATE,
          orderpeople:res.data[0].YUDINGZHE,
          hoster:res.data[0].ZHUCHIREN,
          meeting_substance:res.data[0].SUBJECT,
          joinpeople:res.data[0].MEMBERS,
          myid:myid,
        })
        }
      },
      fail:function(){
       wx.showToast({
         title: '会议信息查询失败',
         icon:'none',
         duration:1000,
       }) 
      }
    });
  }
})

