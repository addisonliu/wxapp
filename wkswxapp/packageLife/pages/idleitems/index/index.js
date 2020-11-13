var  util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRuleTrue: '',
    show: false,
    idleGoodslist: [],
    classifyList:[],
    inputValue:'',
    classify: [{
      "CategoryID": "C1",
      "CategoryName": "交通工具（电动车/自行车/摩托车）",
      "IsValid": "Y"
    },
    {
      "CategoryID": "C2",
      "CategoryName": "电子产品（电脑/手机/数码配件）",
      "IsValid": "Y"
    },
    {
      "CategoryID": "C3",
      "CategoryName": "生活用品（服装/鞋帽/箱包/日用品）",
      "IsValid": "Y"
    },
    {
      "CategoryID": "C4",
      "CategoryName": "家电家具（空调/冰箱/洗衣机/茶几沙发）",
      "IsValid": "Y"
    },
    {
      "CategoryID": "C4",
      "CategoryName": "文体乐器（健身类/乐器/书籍/音像）",
      "IsValid": "Y"
    },
  ],
  timeSort:[
    {
      "publishID":"0",
      "publishSort":"由早到晚"
    },
    {
      "publishID":"1",
      "publishSort":"由晚到早"
    }
  ],
  priceSort:[
    {
      "priceID":"0",
      "priceSort":"由高到低"
    },
    {
      "priceID":"1",
      "priceSort":"由低到高"
    }
  ]
  },
  //侧滑导航栏开关
  //开启透明层
  showRule: function () {
    var that = this;
    that.setData({
      isRuleTrue: true
    })
  },
  //关闭透明层
  hideRule: function () {
    var that = this;
    that.setData({
      isRuleTrue: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      success: function () {
        wx.hideLoading();
      }
    });
    this.getIdleGoods();

  },
// 获取首页列表
  getIdleGoods: function () {
    let that = this;
    util.request(api.IdleitemsMessage, {}).then(function (res) {
      if (res.result == "success") {
        console.log(res.data.details)
        that.setData({
          idleGoodslist: res.data.details
        })
      } else {
        wx.hideLoading()
      }
    })
  },
  //获取搜索关键字
  getInput:function(e){
    console.log('input发送选择改变，携带值为', e.detail.value)
    this.setData({
      inputValue:e.detail.value
    })

  },
//搜索
  searchGoods: function (e) {
    let that = this;
    // console.log( that.data.inputValue)
    util.request(api.searchGoods, {
      SearchParam:that.data.inputValue
    }).then(function (res) {
      if (res.result == "success") {
        that.setData({
          idleGoodslist: res.data.details
        })
      } else {
        wx.showToast({
          icon:'none',
          title: '未搜到相关物品',
        })
        wx.hideLoading()
      }
    })
  },
//分类
bindClassfiy: function (e) {//获取分类选中值
  var that = this;
  console.log('picker发送选择改变，携带值为', e.detail.value)
  var idleGoodslist = that.data.idleGoodslist;
  var newCategoryName = {}; //将商品列表根据CategoryNam分离成四部分
  var goodlistIndex = []
  for (let i in idleGoodslist) {
    let Name = idleGoodslist[i].CategoryName
    if (newCategoryName[Name] == undefined) {
      newCategoryName[Name] = [idleGoodslist[i]]
    } else {
      newCategoryName[Name].push(idleGoodslist[i])
    }
  }
  that.setData({
    index: e.detail.value,
    show: !that.data.show
  })
},
//发布时间
bindTime:function(e){

},
//价格
bindPrice:function(e){

},
  // 点击列表跳转详情页
  onPostTap: function (event) {
    var postid = event.currentTarget.dataset.goodsid
    console.log(postid)
    wx.navigateTo({
      url: '../goodsdetails/index?id='+postid,
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