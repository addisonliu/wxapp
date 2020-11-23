// pages/DetailedMessage/detaildmessage.js
var myid;
var app = getApp();
var json;
var that;
var a;
var b;
Page({
  data: {
    listData:'',
    roomid:'',
    start_datetime:'',
    end_datetime:'',
    scroll_height:0,
    myid:'',
  },

  onLoad: function (options) {
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    json = JSON.parse(options.json);
    myid = json.myid;
    this.setData({
      listData:json.listData,
      roomid:json.meetingNumber,
      start_datetime:json.datebegin,
      end_datetime:json.dateend,
      myid:myid,
      scroll_height: windowHeight * 750 / windowWidth - (255) - 30
    });
  },

  select_date:function(){
    var select_date_json = {"datebegin":this.data.start_datetime,"dateend":this.data.end_datetime,"meetingNumber":this.data.roomid,"myid":myid};
    wx.navigateTo({
      url: '../query/index?select_date_json='+JSON.stringify(select_date_json),
    })
  },

  look_btn:function(e){
     var t = e.currentTarget.dataset.item;
     for(var i=0;i < (json.listData).length ;i++){
       a = (json.listData)[i].TIME;
       if(a === t.TIME && (json.listData).length > (i+1) ){
         a = (json.listData)[i+1].TIME;
         b = (json.listData)[i+1].DATE;
         app.globalData.nextmeeting_time = a;
         app.globalData.nextmeeting_date = b;
       }else if(a === t.TIME && (json.listData).length <= (i+1)){
        app.globalData.nextmeeting_time = "无";
        app.globalData.nextmeeting_date = "无";
       }
     }
     let str = (t.TIME).split("-");
     var start_datetime = t.DATE+" "+str[0];
     var end_datetime = t.DATE+" "+str[1];
     var roomid = this.data.roomid;
     var YUDINGZHE = t.YUDINGZHE;
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
        app.globalData.TDDmeetingtime = res.data[0].TIME;
         var json = {"start_datetime":start_datetime,"end_datetime":end_datetime,"ROOMID":roomid,"TIME":res.data[0].TIME,"DATE":res.data[0].DATE,"YUDINGZHE":YUDINGZHE,"ZHUCHIREN":res.data[0].ZHUCHIREN,"SUBJECT":res.data[0].SUBJECT,"MEMBERS":res.data[0].MEMBERS,"myid":myid};
        wx.navigateTo({
          url: '../meetingMessage/index?json='+JSON.stringify(json),
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
  },

   // 下拉刷新
   refresh: function(){
     this.onfresh();
   },
  //上拉加载
   loadMore:function(){
    this.onfresh();
   },

  onfresh:function(){
    that = this;
    wx.request({
      url: 'https://TDDservice20.wistron.com/smartmeetingroom/GetMrInfo/schedule',
      data:{
        date1:that.data.start_datetime,
        date2:that.data.end_datetime,
        roomid:that.data.roomid,
        empno:app.globalData.userInfo
      },
      header:{'content-type': 'application/json'},
      method:'GET',
      success:function(res){
        that.setData({
          listData:res.data,
        })
      }
    })
  }
})