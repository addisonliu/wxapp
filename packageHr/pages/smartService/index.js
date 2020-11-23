var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
// var api = require('../../config/json.js');
const app = getApp();
var inputVal = '';
var msgList = [];
//獲取屏幕寬高
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

function getBaseData(that) {
  util.request(api.smartService1, {
      uid: app.globalData.userInfo,
      timestamp: Date.parse(new Date())
    })
    .then(function (res) {
      console.log('當前時間戳1---' + that.data.timestamp);
      msgList.splice(0, msgList.length);
      that.setData({
        msgList,
      })
      console.log('首回复顯示1---' + res.result);
      console.log('首回复顯示1---' + res.message);
    })
}

/**
 * 初始化数据
 */
function initData(that) {
  //定義頁面加載時就要顯示的數據
  inputVal = '';
  util.request(api.smartService0, {
      uid: app.globalData.userInfo,
      timestamp: Date.parse(new Date())
    })
    .then(function (res) {
      console.log('當前時間戳0---' + that.data.timestamp);
      console.log('首回复0---' + res.text);
      console.log('首回复顯示0---' + res.result);
      console.log('選擇0---' + res.option);
      console.log('歡迎辭所有內容---' + res.content);

      // 解决：不能直接用接口的返回值去转换，需要先用变量接收返回值，例如var a=res.data,
      // 然后对a进行转换，json.parse(a);
      var obj = res.content;
      var cont = JSON.parse(obj);
      // var content = JSON.stringify(obj);
      console.log('user' + cont.uid);
      console.log('action' + cont.action);
      console.log('text' + cont.text);
      console.log('option' + cont.option);
      console.log('timestamp' + cont.timestamp);

      if (cont.option == "[]") {
        that.setData({
          content: cont.text,
          option: ''
        })
      } else {
        var s = "" + cont.option + "";
        console.log("option:" + cont.option)
        console.log(cont.option.indexOf('"]'))
        // console.log(content.option.substring(2, content.option.indexOf('"]')))
        that.setData({
          content: cont.text,
          option: s.split(',')
        })
      }
      msgList.push({
        speaker: 'server',
        contentType: 'text',
        // answer: that.data.text,
        // 必須用this.data數據才會拿到
        content: cont.text,
        option: that.data.option
      })
      console.log('option的值是' + that.data.option)
      that.setData({
        msgList,
      })
      // var sh = that.data.shows;
      if (that.data.option == '') {
        that.setData({
          shows: false
        })
      }

      console.log('shows的狀態是' + that.data.shows)
    })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    inputVal: '',
    // data: '',
    timestamp: 0,
    // toView: '',
    option: '',
    scrollHeight: '91vh',
    inputBottom: 0,
    shows: true,
    index: '',
    kefuPhone: [{
      kefu: '客服1',
      // phoneNumber:'15190161071',
    }, {
      kefu: '客服2',
      // phoneNumber:'15190161357',
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })

    //Date.parse得到的數據單位是毫秒，new Date()得到的數據單位是秒
    var timestamp = Date.parse(new Date());
    console.log("当前时间戳为：" + timestamp);
    getBaseData(this);
    //initData是初始數據函數
    initData(this);
  },

  sendClick: function (e) {
    // this.data.LabelNew = e.detail.value;
    this.data.sendClick = e.detail.value;
  },
  send(e) {
    let that = this;
    if (this.data.sendClick != '') {
      e.detail.value = this.data.sendClick;
      msgList.push({
        speaker: 'customer',
        contentType: 'text',
        content: e.detail.value
      })
      that.setData({
        msgList,
        inputVal,
        data: e.detail.value,

      });
      that.setData({
        toView: 'msg-' + (msgList.length - 1)
      });
      console.log('輸入的數據是：' + e.detail.value);

      util.request(api.smartService, {
          uid: app.globalData.userInfo,
          timestamp: Date.parse(new Date()),
          speak: that.data.data
        })
        .then(function (res) {
          console.log('輸入內容為：' + that.data.data);
          console.log('當前時間戳---' + that.data.timestamp);
          console.log('首回复---' + res.text);
          console.log('首回复顯示---' + res.result);
          console.log('1選擇---' + res.option);
          console.log('send=action---' + res.action);
          // console.log('res.option.indexOf' + res.option.indexOf('[]'));
          var obj = res.content;
          var cont1 = JSON.parse(obj);
          // var content = JSON.stringify(obj);
          console.log('text1' + cont1.text);
          console.log('option1' + cont1.option);

          if (cont1.option == "[]") {
            that.setData({
              content: cont1.text,
              option: ''
            })

            that.setData({
              shows: false
            })

          } else {
            console.log("option:" + cont1.option)
            var s = "" + cont1.option + "";
            // console.log(cont1.option.split(','))
            that.setData({
              content: cont1.text,
              option: s.split(',')
            })
          }
          // if (res.action.indexOf('fb_button')!=-1){
          if (cont1.action.indexOf('fb_button') != -1) {
            that.setData({
              action: "fb_button",
            })
          } else {
            that.setData({
              action: [],
            })
          }
          console.log('改後的action' + that.data.action);
          msgList.push({
            speaker: 'server',
            contentType: 'text',
            // answer: that.data.text,
            //必須用this.data數據才會拿到
            content: that.data.content,
            option: that.data.option,
            action: that.data.action
          })
          that.setData({
            msgList,
            // toView: 'msg-' + (msgList.length - 1)
          })
          that.setData({
            toView: 'msg-' + (msgList.length - 1)
          });
        })
      console.log('數組長度：' + msgList.length);
    }
  },
  choosePhone: function (e) {
    console.log("picker输入的值为" + e.detail.value)
    let index = e.detail.value
    this.setData({
      index: index,
    })
    if (index == 0) {
      wx.makePhoneCall({
        phoneNumber: '15190161071',
      })
    } else if (index == 1) {
      wx.makePhoneCall({
        phoneNumber: '15190161357',
      })
    } else {
      wx.showToast({
        title: '系统错误',
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    // keyHeight = '70px';
    console.log('key:' + keyHeight);
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px',
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);
  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '91vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
  },


  /* 點擊option使其內容傳輸到input裡 */
  changeValueClick: function (e) {
    let that = this;
    var value = e.target.dataset.text;
    console.log(value);
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: value
    });
    that.setData({
      inputVal,
      msgList
    });
    var newcontent = '';
    var newoption = [];
    // util.request(api.smartService, { uid: app.globalData.userInfo, timestamp: Date.parse(new Date()), speak:value })
    util.request(api.smartService, {
        uid: app.globalData.userInfo,
        timestamp: Date.parse(new Date()),
        speak: value
      })
      .then(function (res) {
        console.log('輸入內容為：' + value);
        console.log('首回复---' + res.text);
        console.log('首回复顯示---' + res.result);
        console.log('選擇2---' + res.option);
        console.log('click=action---' + res.action);

        var obj = res.content;
        var cont1 = JSON.parse(obj);
        // var content = JSON.stringify(obj);

        console.log('text2' + cont1.text);
        console.log('option2' + cont1.option);
        if (res.option == "[]") {
          newcontent = cont1.text;
        } else {
          var s = "" + cont1.option + "";
          newcontent = cont1.text,
            newoption = s.split(',')
          that.setData({
            shows: false
          })
        }
        console.log('shows狀態：' + that.data.shows)
        if (cont1.action.indexOf('fb_button') != -1) {
          that.setData({
            action: "fb_button",
          })
        } else {
          that.setData({
            action: [],
          })
        }
        msgList.push({
          speaker: 'server',
          contentType: 'text',
          // answer: that.data.text,
          //必須用this.data數據才會拿到
          content: newcontent,
          option: newoption,
          action: that.data.action
        })
        that.setData({
          msgList,
        })
        that.setData({
          toView: 'msg-' + (msgList.length - 1)
        });
      })
    console.log(that.data.msgList);
  },

  clickNo: function (e) {
    let that = this;
    var value = e.currentTarget.dataset.text;
    console.log(value);
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: value
    });
    that.setData({
      inputVal,
      msgList
    });
    var newcontent = '';
    var newoption = [];
    // util.request(api.smartService, { uid: app.globalData.userInfo, timestamp: Date.parse(new Date()), speak:value })
    util.request(api.smartService, {
        uid: app.globalData.userInfo,
        timestamp: Date.parse(new Date()),
        speak: 'n'
      })
      .then(function (res) {
        var obj = res.content;
        var cont1 = JSON.parse(obj);
        // var content = JSON.stringify(obj);

        console.log('text3' + cont1.text);
        console.log('option3' + cont1.option);
        if (cont1.option == "[]") {
          newcontent = cont1.text;
        } else {
          var s = "" + cont1.option + "";
          newcontent = cont1.text,
            newoption = s.split(',')
        }
        if (cont1.action.indexOf('fb_button') != -1) {
          that.setData({
            action: "fb_button",
          })
        } else {
          that.setData({
            action: [],
          })
        }
        msgList.push({
          speaker: 'server',
          contentType: 'text',
          // answer: that.data.text,
          //必須用this.data數據才會拿到
          content: newcontent,
          option: newoption,
          action: that.data.action
        })
        that.setData({
          msgList,
        })
        that.setData({
          toView: 'msg-' + (msgList.length - 1)
        });
      })
    console.log(that.data.msgList);
  },
  clickYes: function (e) {
    let that = this;
    var value = e.currentTarget.dataset.text;
    console.log(value);
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: value
    });
    that.setData({
      inputVal,
      msgList
    });
    var newcontent = '';
    var newoption = [];
    // util.request(api.smartService, { uid: app.globalData.userInfo, timestamp: Date.parse(new Date()), speak:value })
    util.request(api.smartService, {
        uid: app.globalData.userInfo,
        timestamp: Date.parse(new Date()),
        speak: 'y'
      })
      .then(function (res) {
        console.log('輸入內容為：' + value);
        console.log('首回复---' + res.text);
        console.log('首回复顯示---' + res.result);
        console.log('選擇4---' + res.option);
        console.log('click=action---' + res.action);
        var obj = res.content;
        var cont1 = JSON.parse(obj);
        // var content = JSON.stringify(obj);

        console.log('text4' + cont1.text);
        console.log('option4' + cont1.option);
        if (cont1.option == "[]") {
          newcontent = cont1.text;
        } else {
          var s = "" + cont1.option + "";
          newcontent = cont1.text,
            newoption = s.split(',')
        }
        if (cont1.action.indexOf('fb_button') != -1) {
          that.setData({
            action: "fb_button",
          })
        } else {
          that.setData({
            action: [],
          })
        }
        msgList.push({
          speaker: 'server',
          contentType: 'text',
          // answer: that.data.text,
          //必須用this.data數據才會拿到
          content: newcontent,
          option: newoption,
          action: that.data.action
        });
        that.setData({
          msgList
        });
        that.setData({
          toView: 'msg-' + (msgList.length - 1)
        });
      })
    console.log(that.data.msgList);
  },

  adddetial: function () {
    wx.navigateTo({
      url: '../questionCollection/index'
    })
  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  }
})