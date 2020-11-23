// packageHr/pages/up/up.js
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
    showModal: true,
    objectArray: [],
    Method: [],    //训练方式
    Apply:['新人','再训练','在职训'],   //申请类型
    SkillCategory:[],  //技能类别
    Skill:[],      //技能
    index:'',
    index0:'',
    indexed:'',
    indexs:''
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '/packageHr/pages/dlupstatus/upstatus',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangeSkillCategory: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexs: e.detail.value
    })
  },
  bindPickerChangeskill: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index0: e.detail.value
    })
  },
  bindPickerChangemethod: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexed: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBaseData();
    var that = this;
  },
  getBaseData() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
      success:function(){
      }
    });
    util.request(api.up, {EmpNo: app.globalData.userInfo, Site: app.globalData.site,}).then(function (res) {
      let Array = ["K0803607","K17027435","K19072519","K19073693", "K19110258","K20038167","K2003F496", "K20078448"]
      for(let i in Array ){
        console.log(app.globalData.userInfo);
      if (app.globalData.userInfo === Array[0] || app.globalData.userInfo === Array[1]|| app.globalData.userInfo === Array[2]|| app.globalData.userInfo === Array[3]|| app.globalData.userInfo === Array[4]|| app.globalData.userInfo === Array[5]|| app.globalData.userInfo === Array[6]|| app.globalData.userInfo === Array[7] ){
        console.log(res.data);
      if (res.result == "success") {
      //   let i = new Array();
      //   for (let x of res.data.details) {
      //     i.push(x.TrainMethod);
      //   }
      //  console.log(...i);
      //  that.setData({
      //   Method: [...i],
      //  })
      //  console.log(that.data.Method);
      // console.log(res.data.details[0].TrainMethod)
     that.setData({
       Method:res.data.details[0].TrainMethod,
       SkillCategory:res.data.details[0].SkillCategory,
       Skill:res.data.details[0].Skill,
       objectArray: that.data.objectArray.concat(res.data.details)
     })
     wx.hideLoading({})
    //  console.log(that.data.Method);
      //  let newMethod = {};
      //  for(var key in that.data.Method){
      //    newMethod[key]=that.data.Method[key];
      //  }
      //  that.setData({
      //   newMethod:newMethod 
      //  })
      //  console.log(newMethod);
      }
      }
      else{
        wx.switchTab
        ({
          url: '/pages/homepage/index',
        })
      }
     }
      // util.request(api.up, { EmpNo: 'K0609304', Site:'wks' }).then(function (res) {
      // console.log(res.data);
      // console.log(that.data.objectArray);
    }
    );
  },
  //关闭注意事项
  readClick: function() {
    this.setData({   //关闭规则模块
      showModal: false,
    });
  },
//送出数据
  sendApplication:function(){
    wx.showLoading({
      title: '提交中...',
      success:function(){
      }
    });
   let index = this.data.index;
   let indexs = this.data.indexs;
   let indexed = this.data.indexed;
   let index0 = this.data.index0;
   let info = {
      // "EmpNo":'K0609304',
      // "Site": 'WKS',
   EmpNo:this.data.objectArray.EmpNo,
   Site: app.globalData.site,
   Alie:this.data.objectArray[0].Alie,
   PlantID:this.data.objectArray[0].PlantID,
   Token:this.data.objectArray[0].Token,
   SkillCategory:this.data.SkillCategory[indexs],
   Skill :this.data.Skill[index0],                   
   ApplyCategory:this.data.Apply[index],
   TrainMethod:this.data.Method[indexed],
   }
   util.requests(api.upsend , info , "POST").then(function (res){
      console.log(res);
    if(res.result == "success"){
      console.log(info)
  //     wx.showLoading({
  //    title: res.result,
  //    duration: 2000,
  //  })
   wx.navigateTo({
    url: '/packageHr/pages/dlupsuccess/index',
  })
  //  console.log(res.result)
   }
    else{ 
      console.log(res)
      // wx.showToast({
      //   title: res.details[0].message,
      //   icon:'none',
      //   duration:3000,
      //   success:function(){
      //     setTimeout(function(){},3000);
      //   }
      // });
     wx.hideLoading({})
    //  console.log(res.result)
   }
   })
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