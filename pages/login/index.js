var api = require('../../config/api.js');
var app = getApp();
const { $Toast } = require('../../components/base/index');
var { $Message } = require('../../components/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empno: '', //工号
    password: '', //密码
    identity:true,
    choose:"",
    checked:false,
    // currentSelectTripType: 'Chinese',
  },
 


  // selectedChinese: function (e) {
  //   this.setData({
  //     currentSelectTripType: e.currentTarget.dataset.id
  //   })
  // },
  // selectedEnglish: function (e) {
  //   this.setData({
  //     currentSelectTripType: e.currentTarget.dataset.id
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //页面加载时，从微信缓存读取账号密码
      this.setData({
        empno: wx.getStorageSync("empno"),
        password: wx.getStorageSync("password"),
      })
      if(this.data.empno!=""){
        this.setData({
          checked:true,
          choose:"Y"
        })
      }
  },
    //切换中英文
    changeLang: function (e) {
      var that = this;
      this.setData({
        is_CH: !that.data.is_CH
      })
    },

  //获取输入的账号密码
  getinput: function (e) {
    var _this = this;
    if (e.currentTarget.dataset.value === 'empno') {
      _this.setData({
        empno: e.detail.value
      })
    }
    if (e.currentTarget.dataset.value === 'password') {
      _this.setData({
        password: e.detail.value  
      })
    }
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
    // this.setData({
    //   _t: base._t()
    // });
    // wx.hideTabBar();
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
    clearInterval(this.timer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    // 增加下拉刷新数据的功能
    var self = this;
    //this.getGoodsList();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
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

  },
  /**
  * 自定义函数
  */
  //键盘输入获取工号
  getEmpno(e) {
    let temp = e.detail.value;
    this.setData({
      empno: temp
    })
    app.globalData.userInfo = temp;
  },
  //键盘事件输入密码
  getPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //切换身份
  swicthIdentity: function () {
    this.setData({
      identity: !this.data.identity,
      empno:'',
      password:''
    })
  },
  //切换语言
  // swicthIdentity: function () {
  //   this.setData({
  //     identity: !this.data.identity,
  //     empno: '',
  //     password: ''
  //   })
  // },
  //登陆
  login() {
    if(this.data.identity){
      this.empnoLogin();
    }
    else{
      this.otherLogin()
    }
  },
  //员工登陆
  empnoLogin: function() {
    if (this.data.empno && this.data.password) {
    //如果记住密码则向微信缓存写入账号密码
    //如果不记住密码则清空微信缓存存在的账号密码
    if (this.data.choose == "Y") {
      wx.setStorageSync("empno",this.data.empno);
      wx.setStorageSync("password",this.data.password);
    } else{
      wx.setStorageSync("empno","");
      wx.setStorageSync("password","");
    }

		wx.showLoading({
			title: '登入中',
		}) 
      wx.request({
        url: api.Login,
        method: 'POST',
        data: {
          EmpNo: this.data.empno,
          Password: this.data.password
        },
        dataType: 'json',
        success(res) {   
          if (res.data.Code == 2) { 
           wx.setStorage({
              key: 'token',
              data: res.data.Token,
            })
          /*  wx.setStorage({
              key: 'userInfo',
              data: res.data.AccountID,
            })*/
            app.globalData.userInfo = res.data.AccountID;
			      wx.hideLoading(); 
            wx.navigateTo({
              url: '/pages/changepwd/index',
            })
          }
          else if (res.data.Code == 1){
            //密码验证成功
            wx.setStorage({
              key: 'token',
              data: res.data.Token,
            })
            app.globalData.userInfo = res.data.AccountID;
            app.globalData.site = res.data.site;
            app.globalData.chname = res.data.chname;
            app.globalData.dept = res.data.dept;
            app.globalData.position = res.data.position;
            app.globalData.company = res.data.company;
            app.globalData.IDNO = res.data.IDNO;
            app.globalData.LockerPWD = res.data.LockerPWD;
            app.globalData.isvalid = res.data.isvalid;
			      wx.hideLoading(); 
            wx.switchTab({
              url: '/pages/homepage/index'
            })
            // wx.switchTab({
            //   url: '/pages/tabwork/tabwork',
            // })
          } 
          else if (res.data.Code == 0) {
            //密码验证失败
            wx.hideLoading(); 
            // wx.showToast({
            //   title: res.data.Message,
            //   image: '../../static/image/err.png'
            // })
            $Toast({
              content: res.data.Message,
              type: 'error'
            });
          } else {
			      wx.hideLoading(); 
            wx.showToast({
              title: res.data.Message,
              icon: "none"
            })
          }
        },
      })

    } else {
      wx.showToast({
        image: '../../static/image/err.png',
        title: '请填写完整！',
      })
    }
  },
  //其他登陆
  otherLogin:function (){
    if (this.data.empno && this.data.password ){
      wx.showLoading({
        title:  '登入中',
      }) 
      wx.request({
        url: api.VisitorsLogin,
        method:'POST',
        data: {
          EmpNo: this.data.empno,
          Password: this.data.password
        },
        dataType: 'json',
        success:(res) => {
          if(res.data.code == 1){
            app.globalData.site = res.data.site;
            wx.hideLoading();
            this.handleDefault('登入成功','success')
            wx.navigateTo({
              url: '/pages/otherIndex/index',
            })
          }
          else{
            wx.hideLoading(); 
            this.handleDefault(res.data.message,'error')
          }
        }
      })
    }
    else{
      this.handleDefault('请填写完整','warning')
      wx.hideLoading();  
    }
  },
  handleDefault: function (content='出现错误',type='warning',duration=3) {
    $Message({
      content,
      type,
      duration
    });
  },
  
  checkboxChange(e){
    console.log(e.detail.value);
    if (e.detail.value.length=="1"){
      this.setData({
        choose: "Y",
        checked:true,
      })
    }
    else{
      this.setData({
        choose: "N",
        checked:false,
      })
    }
  },

})