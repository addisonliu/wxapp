// packageHr/pages/four/four.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
const {
  $Toast
} = require('../../../components/base/index');
var {
  $Message
} = require('../../../components/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    objectArray: [],
    Skill: [],
    newSkill: {},
    arrSkill: [],
    arrkey: [],
    Mobile: '',
    Leader: '',
    Line: '',
    LeaderContac: '',
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '/packageHr/pages/dlfourstatus/fourstatus',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
    util.request(api.four, {EmpNo: app.globalData.userInfo, Site: app.globalData.site,}).then(function (res) {
      let Array = ["K0803607","K17027435","K19072519","K19073693", "K19110258","K20038167","K2003F496", "K20078448"]
      for(let i in Array ){
        console.log(app.globalData.userInfo);
      if (app.globalData.userInfo === Array[0] || app.globalData.userInfo === Array[1]|| app.globalData.userInfo === Array[2]|| app.globalData.userInfo === Array[3]|| app.globalData.userInfo === Array[4]|| app.globalData.userInfo === Array[5]|| app.globalData.userInfo === Array[6]|| app.globalData.userInfo === Array[7]){
        if (res.result == "success") {
          // console.log(res.data.details[0].SkillCodeAndSkillName);
          that.setData({
            Skill : res.data.details[0].SkillCodeAndSkillName
          })
          // console.log(that.data.Skill[0]);
          that.setData({
            newSkill: that.data.Skill[0]
          })
          // console.log(that.data.newSkill);
    
         for(let key in that.data.newSkill){
          //  console.log(key);
         }
        // that.setData({
        //   arrkey:that.data.key
        // })
          var arrSkill = [];
          for(let i in that.data.newSkill){
            arrSkill.push(that.data.newSkill[i]);
          }
          // console.log(arrSkill);
          that.setData({
            arrSkill:arrSkill
          })
        // console.log(that.data.arrSkill);
        //   var i = new Array();
        //   for (let x of res.data.details[0].SkillCodeAndSkillName) {
        //     i.push(x.DL782);
        //   }
        //  console.log(...i);
        //  that.setData({
        //   Skill: [...i],
        //  })
        //  console.log(that.data.Skill);
        //  var j = new Array();
        //  for(let x of res.data.details[0].SkillCodeAndSkillName){
        //    j.push(x.DL540);
        //  }
        //  console.log(...j);
        //  that.setData({
        //    Skills:[...j]
        //  })
        //  console.log(that.data.Skills);
        //  var k = new Array();
        //  for(let x of res.data.details[0].SkillCodeAndSkillName){
        //    k.push(x.DL540);
        //  }
        //  console.log(...k);
        //  that.setData({
        //    Skille:[...k]
        //  })
        //  console.log(that.data.Skille);
        //  var l = new Array();
        //  for(let x of res.data.details[0].SkillCodeAndSkillName){
        //    l.push(x.DL540);
        //  }
        //  console.log(...l);
        //  that.setData({
        //    Skilled:[...l]
        //  })
        //  console.log(that.data.Skilled);
        //  console.log(that.data.Skill.concat(that.data.Skills).concat(that.data.Skille).concat(that.data.Skilled))
        //  that.setData({
        //    Skill : that.data.Skill.concat(that.data.Skills).concat(that.data.Skille).concat(that.data.Skilled)
        //  })
        // console.log(that.data.Skill);
          that.setData({
          objectArray: that.data.objectArray.concat(res.data.details),
          showModal: true,
          });
        }
      }
      else{
        wx.switchTab
        ({
          url: '/pages/homepage/index',
        })
      }
     }
      // util.request(api.four, { EmpNo: 'K20078448',Site:'WKS'  }).then(function (res) {
      // console.log(res.data.details);
     
      // console.log(that.data.objectArray);
    });
  },
  //关闭注意事项
  readClick: function () {
    this.setData({ //关闭规则模块
      showModal: false,
    });
  },
  bindLine: function (e) {
    // console.log(e.detail.value)
    this.setData({
      Line: e.detail.value
    })
  },
  bindMobile: function (e) {
    // console.log(e.detail.value)
    this.setData({
      Mobile: e.detail.value
    })
  },
  bindLeader: function (e) {
    // console.log(e.detail.value)
    this.setData({
      Leader: e.detail.value
    })
  },
  bindLeaderContac: function (e) {
    // console.log(e.detail.value)
    this.setData({
      LeaderContac: e.detail.value
    })
  },
  // bindPlant: function (e) {
  //   // console.log(e.detail.value)
  //   this.setData({
  //     Plant: e.detail.value
  //   })
  // },
  //传送数据
  sendApplication: function () {
    wx.showLoading({
      title: '加载中...',
      success: function () {}
    });
  let index = this.data.index;
  let Mobile = this.data.Mobile;
  let Line = this.data.Line;
  let Leader = this.data.Leader;
  let LeaderContac = this.data.LeaderContac;
  var reg = /^1[3|4|5|7|8]\d{9}$/;   /*定义验证手机号表达式*/
  // let Plant = this.data.Plant;
  let info = {
    EmpNo:this.data.objectArray[0].EmpNo,
    Site: app.globalData.site,
    AllowanceLevel:"4",
    // "EmpNo":"K20078448", 
    // "Site":"WKS",
    ChName:this.data.objectArray[0].ChName,
    Dept:this.data.objectArray[0].DeptCode,
    Shift:this.data.objectArray[0].ShiftName,
    SkillName:this.data.arrSkill[index],
    Mobile:Mobile,
    Line:Line,
    Leader:Leader,
    LeaderContac:LeaderContac,
    // "Site":"WKS",
    // "EmpNo":"K0609304",
    // "ChName":"齐世丽",
    // "Dept":"5MA120",
    // "Shift":"08:00~17:00",
    // "SkillName":"FATP TEST(A)",
    // "Mobile":"13457621016",
    // "Line":"CA1",
    // "Leader":"傅兆伦",
    // "LeaderContac":"17854297461"
   };
   console.log(info)
    if (info.SkillName == '') {
      wx.showToast({
        title: '请选择技能申请类型',
        icon: 'none'
      })
    } else if (info.Mobile == '') {
      wx.showToast({
        title: '请填写本人手机号',
        icon: 'none'
      })
    } else if (!reg.test(info.Mobile)) {
      wx.showToast({
        title: '请填写正确的本人手机号',
        icon: 'none'
      })
    } else if (info.Line == '') {
      wx.showToast({
        title: '请填写您的线别',
        icon: 'none'
      })
    } else if (info.Leader == '') {
      wx.showToast({
        title: '请填写您的组长姓名',
        icon: 'none'
      })
    } else if (info.LeaderContac == '') {
      wx.showToast({
        title: '请填写您的组长联系方式',
        icon: 'none'
      })
    } else if (!reg.test(info.LeaderContac)) {
      wx.showToast({
        title: '请填写您的组长正确的手机号',
        icon: 'none'
      })
    } else {
      console.log(info)
      util.requests(api.foursend, info, "POST").then(function (res) {
        console.log(res);
        if (res.result == "success") {
          console.log(info)
          wx.showLoading({
            title: "提交中",
            duration: 2000,
          })
          wx.navigateTo({
            url: '/packageHr/pages/dlfoursuccess/index',
          })
          //  console.log(res.result)
        } else {
          wx.showToast({
            title: res.result,
            icon: 'none',
            duration: 3000,
          })
          console.log(res.result)
        }
      })
    }

    // info=JSON.stringify(info);

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