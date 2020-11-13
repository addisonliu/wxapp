// pages/out/out.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
var { $Message } = require('../../../components/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:'',
    date:'',
    now:'',
    employee:{},//api获取
    objectArray: [],//api获取
    index: 0,
    time:'10:00',
    returndate:'',
    returntime:'',
    items: [
      { id:'0',name: 'yes', value: '是' },
      { id: '1',name: 'no', value: '否', checked: 'true' },
    ],
    returnflag:false,
    reason:'',
    info: { },

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  
  bindTimeChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindBackDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      returndate: e.detail.value
    })
  },
  bindBackTimeChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      returntime: e.detail.value
    })
  },
  radioChange: function (e) {
    //console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value=="yes")
    {
      this.setData({
        returnflag:true
      })
    }
    else
    {
      this.setData({
        returnflag: false
      })
    }
    //console.log(this.data.returnflag)
  },
  
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      reason: e.detail.value
    })
  },


  sendApplication: function () {
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });
    let temp = this.data;
    let index = this.data.index; 
    let reason = this.data.reason;
    //console.log(temp);
    console.log(temp)
    var applytime = util.formatTime(new Date());
    let info = { site: app.globalData.site, applyid: this.data.employee.Empno, applyname: this.data.employee.Chname, applydept: this.data.employee.Deptcode, applyshift: this.data.employee.ShiftName, applyisholiday: this.data.employee.isholiday, applyshiftstart: this.data.employee.ShiftStart, applyshiftend: this.data.employee.ShiftEnd, applytypeid: this.data.objectArray[index].P06Content, applytype: this.data.objectArray[index].Description, applytime: applytime, outdate: this.data.date, outtime: this.data.time, isreturn: this.data.returnflag, returndate: this.data.returndate, returntime: this.data.returntime, reason: reason, lunchfrom: this.data.employee.LunchFrom, lunchto: this.data.employee.LunchTo,};
    if (info.reason == '') {
      console.log(temp)
      console.log(info)
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请填写出厂事由',
      })

      console.log(data.employee);
    }
    else {
      if (info.isreturn == true) {
        if (info.returntime == '') {
          wx.showToast({
            image: '../../../static/image/err.png',
            title: '请填写返回时间',
          })
        }
        else {
          info.isreturn = 'Y';
          var returnflag = parseInt(info.returndate.replace('-', '').replace('-', '') + info.returntime.replace(':',''));
          var outflag = parseInt(info.outdate.replace('-', '').replace('-', '') + info.outtime.replace(':', ''));
          console.log(returnflag)
          console.log(outflag)
          if (returnflag < outflag)
          {
            wx.showToast({
              image: '../../../static/image/err.png',
              title: '返回时间不正确',
            })
          }
          else{
            util.request(api.OutApply, info ,"POST")
              .then(function (res) {
                if (res.code == 0) {
                  wx.showToast({
                    image: '../../../static/image/err.png',
                    title: res.result,
                  })
                }
                else {
                  wx.showToast({
                    title: '提交成功',
                  })
                  wx.switchTab({
                    url: '/pages/homepage/index',
                  })
                }
              });
            // wx.request({
            //   url: api.OutApply,
            //   method: 'POST',
            //   data: info,
            //   dataType: 'json',
            //   success(res) { 
            //     wx.hideLoading(); 
            //     if (res.data.code == 0) 
            //     {
            //       wx.showToast({
            //         image: '../../../static/image/err.png',
            //         title: res.data.result,
            //       })
            //     }
            //     else
            //     {
            //       wx.showToast({
            //         title: '提交成功',
            //       })
            //       wx.navigateTo({
            //         url: '/pages/index/index',
            //       })
            //       // setTimeout(() => {
            //       //   wx.switchTab({
            //       //     //url: '/pages/index/index',
            //       //     url: '/pages/tabwork/tabwork',
            //       //   })
            //       // }, 1000);
            //     }
            //   }
            // });
            //console.log(info)
          }
         
        }
      }
      else {
        info.isreturn = 'N';
        info.returndate = '';
        info.returntime = '';


        util.request(api.OutApply, info, "POST")
          .then(function (res) {
            if (res.code == 0) {
              wx.showToast({
                image: '../../../static/image/err.png',
                title: res.result,
              })
            }
            else {
              wx.showToast({
                title: '提交成功',
              })
              wx.switchTab({
                url: '/pages/homepage/index',
              })
            }
          });


        // wx.request({
        //   url: api.OutApply,
        //   method: 'POST',
        //   data: info,
        //   dataType: 'json',
        //   success(res) {
        //     wx.hideLoading(); 
        //     if (res.data.code == 0) {
        //       wx.showToast({
        //         image: '../../../static/image/err.png',
        //         title: res.data.result,
        //       })
        //     }
        //     else {
        //       wx.showToast({
        //         title: '提交成功',
        //       })
        //       wx.navigateTo({
        //         url: '/pages/index/index',
        //       })
        //     }
        //   }
        // });
        //console.log(info)
      }
    }
    // temp['Detail'] = a;
    // wx.request({
    //   url: SubmitApplication,
    //   data: temp,
    //   method: 'POST',
    //   dataType: 'json',
    //   success: (res) => {
    //     if (res.data.code == 1) {
    //       this.showMessage('提交成功', 'success');
    //       wx.hideLoading();
    //       wx.redirectTo({
    //         url: '/pages/Index/index',
    //       })
    //     }
    //     else {
    //       this.showMessage(res.data.message, 'error');
    //       wx.hideLoading();
    //     }
    //   },
    //   fail: (res) => {
    //     this.showMessage('出现错误,请联系管理员', 'error');
    //     wx.hideLoading();
    //   }
    // })
  },


  getBaseData(){
    let that = this;
    util.request(api.OutBase, { empno: app.globalData.userInfo, site: app.globalData.site })
    // util.request(api.OutBase, { empno: 'K17058197', site: 'wks' })
    .then(function (res) {
      if (res.result == "success") {
        that.setData({
          objectArray: that.data.objectArray.concat(res.P06List),
          employee: res.EmpList[0],
        });
      }
      else
      {
        wx.showToast({
          image: '../../../static/image/err.png',
          title: 'ERROR',
        })
      }
      console.log(that.data);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
      now:DATE,
      returndate:DATE,
    });
    this.getBaseData();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight-88
        });
      }
    });
    //console.log(this.data)
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