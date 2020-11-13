// pages/tabenvent/tabenvent.js
// 活動頁
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: "https://wkshrms.wistron.com/file/EIPFile/Photo/",
    aimgurl: "https://wkshrms.wistron.com/file/EIPFile/ActImg/rar/",
    simgurl: "https://wkshrms.wistron.com/file/EIPFile/ActImg/small/",
    allpic: [],
    InfoDetailList: [],
    indicatorDots: false,//是否显示面板指示点
    autoplay: false,//是否自动切换
    interval: 3000,//自动切换时间间隔
    circular: true,//是否采用衔接滑动
    duration: 1000,//滑动动画时长
    showModal: false,
    showPicDetail: false,
    showMain: true,
    showTitle: "",
    showImg: "",
    showPicTitle: "",
    showPicUrl: "",
    showPicList:[],
    showPicID:'',
    current:"info",
  },
  handleTabChange: function (e) {
    var that = this;
    if (this.data.current === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        current: e.target.dataset.current
      })
    }
  },  
  // handleTabChange({ detail }) {
  //   this.setData({
  //     current: detail.key
  //   });
  // },
  getnum: function (e) {
    console.log(e.currentTarget.dataset.num);
    let flag = e.currentTarget.dataset.num - 1;
    let temp = this.data.InfoDetailList;
    let actimgurl = this.data.aimgurl;
    this.setData({
      showTitle: temp[flag].ActName,
      showImg: actimgurl + temp[flag].ActImg,
      showModal: true
    })
  },
  getpic: function (e) {
    var piclist = e.currentTarget.dataset.piclist;
    var pic = e.currentTarget.dataset.pic;
    var index = piclist.indexOf(pic)<0?0:piclist.indexOf(pic);
    this.setData({
      showPicTitle: e.currentTarget.dataset.title,
      showPicUrl: e.currentTarget.dataset.src,
      showPicList:e.currentTarget.dataset.piclist,
      showPicID:e.currentTarget.dataset.albumid,
      showPicDetail: true,
      showCurrent:index
    })
  },
  showMain: function () {
    this.setData({
      showMain: true,
    })
  },
  showAllAct: function () {
    this.setData({
      showMain: false,
    })
  },
  closedetail: function () {
    this.setData({
      showModal: false
    });
  },
  closepicdetail: function () {
    this.setData({
      showPicDetail: false
    });
  },
  getData() {
    let that = this;
    //util.request(api.InfoDetail, { site: app.globalData.site }).then(function (res) {
    util.request(api.InfoDetail, { site: "WKS" }).then(function (res) {
      if (res.result == "success") {
        let piclist = [];
        res.PicDetailList.map(function (item) {
          piclist.push(
            {
              AlbumID: item.AlbumID,
              title: item.AlbumName,
              AlbumDate:item.AlbumDate,
              piclist: item.PicList.split(",")
            }
          )
        })
        console.log(piclist)
        that.setData({
          InfoDetailList: that.data.InfoDetailList.concat(res.InfoDetailList),
          allpic: piclist
        });
      }
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    /*if (app.globalData.userInfo == "") {
      wx.showModal({
        title: '',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {
            wx.removeStorageSync("userInfo");
            wx.removeStorageSync("token");

            wx.reLaunch({
              url: '/pages/login/login'
            });
          }
        }
      });
    }
    else {
      wx.showLoading({
        title: '加载中...',
        success: function () {

        }
      });
      this.getData();
    }  */
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