// pages/resignForm/resignForm.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
const { $Toast } = require('../../../components/base/index');
const { $Message } = require('../../../components/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // showModal:true,
    showModal:false,
    visible:false,
    showTextArea:false,
    show:false,
    disabled: true,
    codename: '',
    // current: 'apply',
    current: 'query',
    date: '',
    now: '',
    index: 0,
    EmpNo: '',
    ChName: '',
    Deptcode: '',
    OndutyLastDay: '',
    ResignationDetailReason: '',
    SignDetailList: [],
    EXT: '',
    resigndate:'',
    days:0,
    reason:'',
    handover:'',
    employee: {
      // Empno:'K17058197',
      // Chname:'周倩玉',
      // Deptcode:'MEL120',
      // JobName:'資訊類助理工程師',
      // Hiredate:'2017-05-21'
    },//api获取
    objectArray: [
      // { Code: 'T41', ResignationReason:'工作層面-工作內容'},
      // { code: 'T43', resignationReason: '工作層面-工作內容不符' },
      // { code: 'T66', resignationReason: '工作層面-工作分配不均' },
      // { code: 'T60', resignationReason: '工作層面-工作瓶頸' },
      // { code: 'T62', resignationReason: '工作層面-工作環境' },
      // { code: 'T44', resignationReason: '工作層面-負荷太重或工時太長' },
    ],//api获取
    applyinfo:{},
    mail:'',
  },
//菜单切换
  handleChange: function (e) {
    this.setData({
      current: e.target.dataset.current
    })
    if (e.target.dataset.current=='apply'){
      wx.hideLoading();
    }
    else if(e.target.dataset.current == 'query'){
      wx.showLoading({
        title: '加载中...',
        success: function () {

        }
      });
      this.getDatat();
    }
    else{
      
    }
  },
  getBaseData() {
    let that = this;
    util.request(api.ResignBase, { empno: app.globalData.userInfo, site: app.globalData.site })
    //util.request(api.ResignBase, { empno: 'K17058197', site: 'WKS' })
      .then(function (res) {
        if (res.result == "success") {
          that.setData({
            objectArray: that.data.objectArray.concat(res.P05List),
            employee: res.EmpList[0],
            hiredate: res.EmpList[0].Hiredate,
          });
        }
        else {
          wx.showToast({
            image: '../../../static/image/err.png',
            title: 'ERROR',
          })
        }
        console.log(that.data);
      });
  },
  getDatat() {
    let that = this;
    util.request(api.ResignDetail, { empno: app.globalData.userInfo, site: app.globalData.site }).then(function (res) {
    //util.request(api.ResignDetail, { empno: "K19112829", site:"WKS" }).then(function (res) {
      if (res.result == "success") {
        that.setData({
          EmpNo: res.FormDetail.EmpNo,
          ChName: res.FormDetail.Chname,
          DeptCode: res.FormDetail.DeptCode,
          OndutyLastDay: res.FormDetail.OndutyLastDay,
          ResignationDetailReason: res.FormDetail.ResignationDetailReason,
          SignDetailList: that.data.SignDetailList.concat(res.SignDetailList),
        });

        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showModal({
          content: '暂无离职单记录',
          showCancel: false
        });

      }
    });
  },
  enterContact(e) {
    let tel = '051257367888' + ',' + e.target.dataset.ext;
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  },
  //倒计时功能
  getVerificationCode: function () {
    var that = this
    var num = 5;
    that.setData({
      codename: num + "s"
    })
    var timer = setInterval(function () {
      num--;
      if (num <= 0) {
        clearInterval(timer);
        that.setData({
          codename: '我已阅读',
          disabled: false
        })
      } else {
        that.setData({
          codename: num + "s",
          disabled: true
        })
      }
    }, 1000)
  },
  //关闭注意事项
  readClick: function () {
    this.setData({   //关闭规则模块
      showModal: false,
      showTextArea:true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
      now: DATE,
    });
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo==""){
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
    }
    else{
      this.getBaseData();
      this.getDatat();
    } 
    this.getVerificationCode();
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hiredate: e.detail.value
    })
  },
  //离职日期相隔天数
  bindResDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var fromdate = new Date(e.detail.value);
    var todate = new Date(this.data.now);
    var iDays = parseInt(Math.abs(fromdate - todate) / 1000 / 60 / 60 / 24)    //把相差的毫秒数转换为天数  
    this.setData({
      resigndate: e.detail.value,
      days: iDays
    });
    var mydate = new Date(fromdate);
    var myday = mydate.getDay();
    console.log(mydate)
    console.log(myday)
    if (myday == 0 || myday == 6) {
      $Toast({
        content: '請選擇工作日',
        type: 'warning'
      });
    }
    else if (this.data.employee.EmpType == 'DL' && iDays<14)
    {
      $Toast({
        content: '请提前十四天提出申请',
        type: 'warning'
      });
    }
    else if (this.data.employee.EmpType == 'IDL' && iDays < 30) {
      $Toast({
        content: '请提前三十天提出申请',
        type: 'warning'
      });
      console.log(iDays)
    }
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      reason: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  getEmpno(e) {
    let temp = e.detail.value;
    if (temp == this.data.employee.Empno)
    {
      $Toast({
        content: '交接人不能为自己',
        type: 'warning'
      });
    }
    else{
      this.setData({
        handover: temp
      })
      console.log(temp)
    }
  },
  getMail(e) {
    let temp = e.detail.value;
    this.setData({
        mail: temp
    })
  },
  handleClick: function() {
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
    }
    else {
      wx.showLoading({
        title: '加载中...',
        success: function () {
        }
      });
    let temp = this.data;
    let index = this.data.index;
    let reason = this.data.reason;
    //console.log(temp);
    //console.log(temp)
    var applytime = util.formatTime(new Date());
    let info = { site: 'WKS', applyid: this.data.employee.Empno, applyname: this.data.employee.Chname, applyenname: this.data.employee.Enname, applylevel: this.data.employee.AppLevel,applycomp: this.data.employee.CompanyCode,applydept: this.data.employee.Deptcode, applydeptname: this.data.employee.Deptname, jobname: this.data.employee.JobName,   applyreasoncode: this.data.objectArray[index].Code, applyreason: this.data.objectArray[index].ResignationReason, applytime: applytime, reason: this.data.reason, hiredate: this.data.employee.Hiredate, emptype: this.data.employee.EmpType, resigndate:this.data.resigndate,days: this.data.days,handover:this.data.handover};
    var mydate = new Date(info.resigndate);
    var myday = mydate.getDay();
    console.log(mydate)
    if (myday == 0 || myday == 6) {
      wx.hideLoading();
      $Toast({
        content: '请选择工作日',
        type: 'warning'
      });
    }
    else if (info.emptype == 'DL' && info.days < 14) {
      wx.hideLoading();
      $Toast({
        content: '请提前十四天提出申请',
        type: 'warning'
      });
    }
    else if (info.emptype == 'IDL' && info.days < 30) {
      wx.hideLoading();
      $Toast({
        content: '请提前三十天提出申请',
        type: 'warning'
      });
    }
    else if (info.reason == ""){
      wx.hideLoading();
      $Toast({
        content: '请填写离职原因',
        type: 'warning'
      });
    }
    else if (info.handover == "") {
      wx.hideLoading();
      $Toast({
        content: '请填写正确交接人工号',
        type: 'warning'
      });
    }
    else if (info.handover == info.applyid) {
      wx.hideLoading();
      $Toast({
        content: '请填写正确交接人工号',
        type: 'warning'
      });
    }
    else
    {
      wx.hideLoading();
      this.setData({
        visible: true,
        applyinfo:info
      })
    }
    }
  },
  handleSubmit:function(){
    this.setData({
      visible: false
    })
    util.request(api.ResignApply, this.data.applyinfo, "POST")
      .then(function (res) {
        wx.hideLoading();
        if (res.code == 0) {
          $Toast({
            content: res.result,
            type: 'warning'
          });
        }
        else {
          $Toast({
            content: res.result,
            type: 'success'
          });
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/homepage/index',
            })
          }, 1000);
        }
      });
      // wx.request({
      //   url: api.ResignApply,
      //   method: 'POST',
      //   data: info,
      //   dataType: 'json',
      //   success(res) {
      //     wx.hideLoading();
      //     if (res.data.code == 0) {
      //       $Toast({
      //         content: res.data.result,
      //         type: 'warning'
      //       });
      //     }
      //     else {
      //       $Toast({
      //         content: res.data.result,
      //         type: 'success'
      //       });
      //       // wx.navigateTo({
      //       //   url: '/pages/index/index',
      //       // })
      //       setTimeout(() => {
      //         wx.switchTab({
      //           //url: '/pages/index/index',
      //           url: '/pages/tabwork/tabwork',
      //         })
      //       }, 1000);
      //     }
      //   }
      // });
      // console.log(info)
  },
  handleCancle: function () {
    this.setData({
      visible: false
    })
  },
  createPdf:function(){
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
    }
    else {
//      if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.data.email))){
//         //alert('邮箱格bai式正确');
//         $Toast({
//         content: '请填写正確的邮箱地址',
//         type: 'warning'
//         });
      
//      } else {
//           //alert('邮箱格式错du误');
//           wx.showLoading({
//             title: '加载中...',
//             success: function () {
//             }
//           });
//           var that = this;
//           util.request(api.CreatePdf, { empno: app.globalData.userInfo, site: app.globalData.site, MailTo: this.data.mail })
//           .then(function (res) {
//             wx.hideLoading();
//             console.log('res.result:'+res.result);
//             if (res.result == "success") {
//               that.setData({
//                 show: true
//               })
//               $Toast({
//                 content: "已提交，稍後會發送至郵箱，請注意查收",
//                 type: 'success'
//               });
//               console.log('數據請求成功');
//             }
//             else {
//               $Toast({
//                 content: res.result,
//                 type: 'warning'
//               });
//             }
//         }

      console.log('郵箱為：'+this.data.mail);
      let str = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      console.log(str.test(this.data.mail));
      if(!str.test(this.data.mail)){
        $Toast({
          content: '請輸入正確的郵箱地址',
          type: 'warning'
        });
      }
      else{
        wx.showLoading({
          title: '加载中...',
          success: function () {
          }
        });
        var that = this
        util.request(api.CreatePdf, { empno: app.globalData.userInfo, site: app.globalData.site, MailTo: this.data.mail })
          //util.request(api.ResignBase, { empno: 'K17058197', site: 'WKS' })
          .then(function (res) {
            wx.hideLoading();
            console.log('res.result:'+res.result);
            if (res.result == "success") {
              that.setData({
                show: true
              })
              $Toast({
                content: "已提交，稍後會發送離職證明至邮箱",
                type: 'success'
              });
              console.log('數據請求成功');
            }
            else {
              $Toast({
                content: res.result,
                type: 'warning'
              });
            }
          });
        }
      }
  },

  /**
  * 下载文件并预览
  */
  
  downloadFile: function (e) {
    // console.log(e);
    // let type = e.currentTarget.dataset.type;
    // // let url = e.currentTarget.dataset.url;
    // // switch (type) {
    // //   case "pdf":
    // //     url += 'pdf';
    // //     break;
    // //   case "word":
    // //     url += 'docx';
    // //     break;
    // //   case "excel":
    // //     url += 'xlsx';
    // //     break;
    // //   default:
    // //     url += 'pptx';
    // //     break;
    // // }
    // let url = 'https://wkshrms.wistron.com/file/招募費用報表.pdf'
    // wx.downloadFile({
    //   url: url,
    //   header: {},
    //   success: function (res) {
    //     var filePath = res.tempFilePath;
    //     console.log(filePath);
    //     wx.openDocument({
    //       filePath: filePath,
    //       success: function (res) {
    //         console.log('打开文档成功')
    //       },
    //       fail: function (res) {
    //         console.log(res);
    //       },
    //       complete: function (res) {
    //         console.log(res);
    //       }
    //     })
    //   },
    //   fail: function (res) {
    //     console.log('文件下载失败');
    //   },
    //   complete: function (res) { },
    // })
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
  },


})