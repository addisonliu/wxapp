var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: '',
    bankcardnumber: "",
    bankcardtype: "",
    bankName: '',
    bankPhonenumber: "",
    frontLoad: '',
    bankDataBase: [],
    bankDetails: [],
    index0: '',
    index1: '',
    reason: '',
    bankType: [{
      bankKey: "X",
      bankName: "农业银行",
    }, {
      bankKey: "Y",
      bankName: "工商银行",
    }, ],
    changeReason: [{
      reasonID: "b",
      reason: "丢失补办",
    }, {
      reasonID: "c",
      reason: "开户异常",
    }, {
      reasonID: "d",
      reason: "发薪失败",
    }],
    showPop: false,
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      success: function () {}
    });
    that.getlistDatat();
    wx.hideLoading();
  },

  //获取基础信息
  getlistDatat() {
    let that = this;
    // empno: app.globalData.userInfo, site: app.globalData.site
    // util.request(api.bankApplyData, {empno: app.globalData.userInfo, site: app.globalData.site}).then(function (res) {
      util.request(api.bankApplyData, {empno: 'K20085910', site: 'WKS'}).then(function (res) {

      if (res.result == "successful" && res.code == 1) { //已上传过银行卡
        console.log([res.details])
        that.setData({
          bankDataBase: that.data.bankDataBase.concat(res.details)
        });
        wx.hideLoading();
      } else if (res.result == "successful" && res.code == 2) { //新人数据
        console.log(res.details)
        that.setData({
          bankDataBase: that.data.bankDataBase.concat(res.details)
        });
        wx.showModal({
          content: '你尚未上传过银行卡，请返回，选择银行卡上传',
          showCancel: false, //是否显示取消按钮
          confirmText: "确定", //默认是“确定”
          confirmColor: 'skyblue', //确定文字的颜色
          success: function (res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框
            } else {
              //点击确定
              wx.navigateTo({
                url: '/packageHr/pages/bankcard/index/index',
              })
            }
          },
          fail: function (res) {}, //接口调用失败的回调函数
          complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
        })
      } else {
        console.log('系统异常：' + res.result)
        wx.showToast({
          title: '系统异常,请联系IT管理员',
          icon:'none'
        })
      }
    });
  },

  //输入卡号
  bindInputChange: function (e) {
    console.log("input输入的值为" + e.detail.value)
    this.setData({
      bankcardnumber: e.detail.value
    })
  },
  //输入手机号
  bindinputPhone: function (e) {
    console.log("input输入的值为" + e.detail.value)
    this.setData({
      bankPhonenumber: e.detail.value
    })
  },
  //选择银行卡类型
  chooseType: function (e) {
    var that = this;
    console.log("picker输入的值为" + e.detail.value)
    let index0 = e.detail.value
    this.setData({
      index0: index0,
      bankcardtype: that.data.bankType[index0].bankKey,
      bankName: that.data.bankType[index0].bankName
    })
  },
  //选择变更原因
  chooseReason: function (e) {
    console.log("picker输入的值为" + e.detail.value)
    this.setData({
      index1: e.detail.value,
    })
  },
  // 获取百度OCR access_token  需定时更新
  getToken: function (e) {
    var that = this;
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=x17nO7PjqYYq8WUjo7D1xOaF&client_secret=GCCq2bbzVHNho8QpGQOLKq1e73z3HTrm',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          access_token: res.data.access_token
        })
      },
      fail: function () {
        wx.showToast({
          title: 'access_token获取失败',
          icon: 'none',
          duration: 1000,
        })
      }
    });
  },
  // 识别图片 获取银行卡号
  upFileFront: function (e) {
    // let type = e.currentTarget.dataset.type;
    let that = this;
    that.getToken();
    let access_token = that.data.access_token;
    console.log('access_token 是' + access_token)
    wx.chooseImage({
      count: 1,
      sourceType: ["album", "camera"],
      success(res) {
        var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
        if (tempFilesSize <= 10000000) { //图片小于或者等于2M时 可以执行获取图片
          that.setData({
            frontLoad: true
          })
          console.log(res.tempFilePaths[0]);
          wx.getFileSystemManager().readFile({ //核心代码，将选中的图片进行base64位格式转换

            filePath: res.tempFilePaths[0],
            encoding: 'base64', //编码格式
            success(res) {
              var img = res.data;
              var imgs = img.replace(/^data:image\/\w+;base64,/, "");
              console.log(imgs)
              wx.request({ //百度AI平台 OCR识别链接 同时带参数请求
                //请求URL：https://aip.baidubce.com/rest/2.0/ocr/v1/idcard
                url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard?access_token=' + that.data.access_token,
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                  image: imgs
                },
                method: 'POST',
                success: function (res) {
                  console.log(res.data.result)
                  that.setData({
                    bankDetails: res.data.result,
                    bankcardnumber: res.data.result.bank_card_number,
                    bankName: res.data.result.bank_name
                  })
                  if (res.data.result.bank_name == '农业银行') {
                    that.setData({
                      bankcardtype: 'X'
                    })
                  } else if (res.data.result.bank_name == '工商银行') {
                    that.setData({
                      bankcardtype: 'Y'
                    })
                  } else {
                    wx.showToast({
                      title: '识别失败，请重新拍照上传',
                      icon:'none'
                    })
                  }
                },
                fail: function (res) {
                  console.log('识别失败，可能是access_token过期，登录百度OCR查看接口使用次数，用完请购买')
                },
                complete: function (res) {
                  that.setData({
                    access_token: ''
                  })
                },
              })
            }
          })
        } else {
          wx.showToast({
            title: '上传图片不能大于10M!', //标题
            icon: 'none'
          })
        }
      }
    })
  },

  //信息上传
  submit: function (e) {
    if (app.globalData.userInfo == "") {
      wx.showModal({
        title: '',
        content: '请先登入',
        success: function (res) {
          if (res.confirm) {
            wx.removeStorageSync("userInfo");
            wx.removeStorageSync("token");
            wx.navigateTo({
              url: '/pages/login/login'
            });
          }
        }
      });
    } else {
    var that = this;
    var reg = /^1[3-9]\d{9}$/;   /*定义验证手机号表达式*/
    let index1 = that.data.index1;
    let info = {
      // empno: 'K20085910',
      empno: app.globalData.userInfo,
      chName: that.data.bankDataBase[0].chName,
      phone: that.data.bankPhonenumber,
      IDNo: that.data.bankDataBase[0].idno,
      bankID: that.data.bankcardtype,
      cardNo: that.data.bankcardnumber,
      applyReasonID: that.data.changeReason[index1].reasonID,
    };
    if(info.phone == ''){
      wx.showToast({
        title: '请填写手机号,必须为本人手机号',
        icon:'none'
      })
    }else if (!reg.test(info.phone)) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
    } else if(info.cardNo == ''){
      wx.showToast({
        title: '请输入或拍照上传银行卡号',
        icon:'none'
      })
    }else if(info.bankID == ''){
      wx.showToast({
        title: '请选择银行类型',
        icon:'none'
      })
    }else if(info.applyReasonID == ''){
      wx.showToast({
        title: '请选择补办原因',
        icon:'none'
      })
    } else{
      //确认弹窗
      this.setData({
        showPop:!that.data.showPop,
        info:info
      });
    }
    }
  },
//确认上传
lastSubmit:function(e){
  wx.showLoading({
    title: '上传中...',
    success: function () {}
  });
  var that = this;
  let info = that.data.info;
  console.log(info)
  // console.log(that.data.bankDataBase)
  util.request(api.bankApplyDataSubmit, info, "POST")
    //util.request(api.ResignBase, { empno: 'K17058197', site: 'WKS' })
    .then(function (res) {
      wx.hideLoading();
      console.log('res.result:' + res.result);
      if (res.result == "successful") {
        wx.navigateTo({
          url: '/packageHr/pages/bankcard/banksucess/index',
        })
      }else{
        wx.showToast({
          title: '上传失败，请联系管理员',
          icon:'none',
          duration:1500,
          success:function(){
            setTimeout(function(){
            wx.navigateTo({
              url: '/packageHr/pages/bankcard/index/index',
            })
          },1500);
          }
        });
      }
    });
},
backChange:function(e){
  var that= this;
  this.setData({
    showPop:!that.data.showPop
  });
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