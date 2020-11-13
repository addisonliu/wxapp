// pages/healthVisitForm/healthVisitForm.js
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
    site:'',
    showModal: true,
    disabled: true,
    codename: '我已阅读',
    visible: false,
    title: '提交成功',
    message: '',
    actions: [{ name: '确定' }],
    siteone: '',
    sitetwo: '',
    winHeight: '',
    isdisabled: true,
    now: '',
    // employee: {},//api获取
    place:'',
    enplace:'',
    chname:'',
    companyName:'',
    purpose:'',
    purposeArray: [
      { RID: '1', Description: "客戶" },
      { RID: '2', Description: "访客/施工/驻厂" },
      { RID: '3', Description: "家属" },
      { RID: '4', Description: "出差" },
      // { RID: '5', Description: "" },
      // { RID: '6', Description: "" },
    ],
    phone: '',
    idno: '',
    region: [],
    address: '',
    items: [
      { id: '0', name: 'yes', value: '是' },
      { id: '1', name: 'no', value: '否' },
      // , checked: 'true'
    ],
    isIdentity: '',//确诊
    isTouch: '',//接触
    isSameBuilding: '',//住同一栋楼
    isSymptom: '',//感染症状
    isTouchSymptom: '',//接触感染症状
    temperature: '',
    stemperature:'',
    insulateArray: [
      { RID: '1', Description: "否" },
      { RID: '2', Description: "政府机构隔离" },
      { RID: '3', Description: "公司隔离" },
      { RID: '4', Description: "在家隔离" },
      { RID: '4', Description: "已解除隔离" },
      
    ],
    insulate: '',
    insulatefrom: '',
    insulateto: '',
    insulateaddressflag: '',
    insulateaddress: '',
    acrossArray: [
      { RID: '1', Description: "没去过", Content: "N" },
      { RID: '2', Description: "经停", Content: "P" },
      { RID: '3', Description: "去过", Content: "Y" },
    ],
    across: '',
    acrossdes: '',
    wacross: '',
    wacrossdes: '',
    isHolidyTouch: '',//春节假期接触
    isHolidyTouchW: '',
    returndate: '',
    liveArray: [
      { RID: '1', Description: "外宿" },
      { RID: '2', Description: "机械园" },
      { RID: '3', Description: "中华园" },
      { RID: '4', Description: "共聚宿舍" },
      { RID: '5', Description: "会馆" },
    ],
    liveindex: 0,
    live: '',
    isLiveTouch: '',//共住
    isLiveTouchW: '',//共住
    isNotice: '',
    more: '',
    choose: '',
    noticechoose: '',
    native:[],
    codeArray: [
      { RID: '1', Description: "绿色" },
      { RID: '2', Description: "黄色" },
      { RID: '3', Description: "红色" },
    ],
    codechname: '',
    codeenname: '',
    code: '',
    xcodeArray: [
      { RID: '1', Description: "绿色" },
      { RID: '2', Description: "黄色" },
      { RID: '3', Description: "红色" },
    ],
    xcode: '',
    visible_red: false,
    visible_green:false,
    visible_yellow:false
  },
  //倒计时功能
  /*getVerificationCode: function () {
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
  },*/
  //关闭注意事项
  readClick: function () {
    this.setData({   //关闭规则模块
      showModal: false
    });
  },
  getBaseData() {
    let that = this;
    util.request(api.HealthVisitBase, { site: app.globalData.site })
      //util.request(api.OutBase, { empno: 'K17058197', site: 'wks' })
      .then(function (res) {
        if (res.result == "success") {
          var newnative = [];
          if (res.NativeList.length >0){
            res.NativeList.map(function (item) {
              newnative.push(item.Native)
            })
            that.setData({
              native: that.data.native.concat(newnative)
            });
          }
          if (res.List.length > 0) {
            that.setData({
              place: res.List[0].Place,
              enplace: res.List[0].EnPlace,
            });
          }
        }
        else {
          wx.showToast({
            image: '../../../static/image/err.png',
            title: 'ERROR',
          })
        }
        console.log(that.data.native);
      });
  },
  getName(e) {
    this.setData({
      chname: e.detail.value
    })
  },
  getCompanyName(e) {
    this.setData({
      companyName: e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getIdno(e) {
    this.setData({
      idno: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindCodeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      code: this.data.codeArray[e.detail.value].Description
    })
  },
  bindXCodeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      xcode: this.data.xcodeArray[e.detail.value].Description
    })
  },
  bindAddress: function (e) {
    console.log(e.detail.value)
    this.setData({
      address: e.detail.value
    })
  },
  bindInsulateAddress: function (e) {
    console.log(e.detail.value)
    this.setData({
      insulateaddress: e.detail.value
    })
  },
  isIdentityChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isIdentity: 'Y'
      })
    }
    else {
      this.setData({
        isIdentity: 'N'
      })
    }
  },
  isTouchChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isTouch: 'Y'
      })
    }
    else {
      this.setData({
        isTouch: 'N'
      })
    }
  },
  isSameBuildingChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isSameBuilding: 'Y'
      })
    }
    else {
      this.setData({
        isSameBuilding: 'N'
      })
    }
  },
  isSymptomChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isSymptom: 'Y'
      })
    }
    else {
      this.setData({
        isSymptom: 'N'
      })
    }
  },
  isTouchSymptomChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isTouchSymptom: 'Y'
      })
    }
    else {
      this.setData({
        isTouchSymptom: 'N'
      })
    }
  },
  getTemperature(e) {
    this.setData({
      temperature: e.detail.value
    })
  },
  getSecondTemperature(e) {
    this.setData({
      stemperature: e.detail.value
    })
  },
  bindPurposeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      purpose: this.data.purposeArray[e.detail.value].Description
    })
  },
  bindInsulateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      insulate: this.data.insulateArray[e.detail.value].Description
    })
  },
  bindAcrossChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      // acrossindex: e.detail.value,
      across: this.data.acrossArray[e.detail.value].Content,
      acrossdes: this.data.acrossArray[e.detail.value].Description
    })
  },
  bindWAcrossChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      // acrossindex: e.detail.value,
      wacross: this.data.acrossArray[e.detail.value].Content,
      wacrossdes: this.data.acrossArray[e.detail.value].Description
    })
  },
  isHolidyTouchChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isHolidyTouch: 'Y'
      })
    }
    else {
      this.setData({
        isHolidyTouch: 'N'
      })
    }
  },
  isHolidyTouchWChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isHolidyTouchW: 'Y'
      })
    }
    else {
      this.setData({
        isHolidyTouchW: 'N'
      })
    }
  },
  bindFromDateChange: function (e) {
    this.setData({
      insulatefrom: e.detail.value
    })
  },
  bindToDateChange: function (e) {
    this.setData({
      insulateto: e.detail.value
    })
  },
  isInsulateOutChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        insulateaddressflag: 'Y'
      })
    }
    else {
      this.setData({
        insulateaddressflag: 'N'
      })
    }
  },
  bindBackDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      returndate: e.detail.value
    })
  },
  bindLiveChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      liveindex: e.detail.value,
      live: this.data.liveArray[e.detail.value].Description
    })
  },
  isLiveTouchChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isLiveTouch: 'Y'
      })
    }
    else {
      this.setData({
        isLiveTouch: 'N'
      })
    }
  },
  isLiveTouchWChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isLiveTouchW: 'Y'
      })
    }
    else {
      this.setData({
        isLiveTouchW: 'N'
      })
    }
  },
  isNoticeChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isNotice: 'Y'
      })
    }
    else {
      this.setData({
        isNotice: 'N'
      })
    }
  },
  getMore(e) {
    this.setData({
      more: e.detail.value
    })
  },
  checkboxChange(e) {
    console.log(e.detail.value)
    if (e.detail.value.length == 1) {
      this.setData({
        isdisabled: false
      })
    }
    else {
      this.setData({
        isdisabled: true
      })
    }
  },
  checkboxNoticeChange(e) {
    console.log(e.detail.value)
    if (e.detail.value.length == 1) {
      this.setData({
        disabled: false
      })
    }
    else {
      this.setData({
        disabled: true
      })
    }
  },
  sendApplication: function () {
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });
    var reg = /^[0-9]{11}$/;   /*定义验证表达式*/
    var reg1 = /(^[3-4][0-9]\.\d)|(^[3-4][0-9])$/;
    var reg2 = /^[0-9]{17}[0-9Xx]$/;
    var reg3 = /^[A-Z][1-2][0-9]{8}$/;
    let temp = this.data;
    let index = this.data.index;
    let reason = this.data.reason;
    //console.log(temp);
    console.log(temp)
    var applytime = util.formatTime(new Date());
    let info = {
      site: app.globalData.site,
      // applyid: this.data.employee.Empno,
      applyname: this.data.chname,
      applycompany: this.data.companyName,
      applyphone: this.data.phone,
      applyidno: this.data.idno,
      applytime: applytime,
      applydate: this.data.now,
      purpose:this.data.purpose,
      province: this.data.region[0],
      city: this.data.region[1],
      district: this.data.region[2],
      town: this.data.address,
      isIdentity: this.data.isIdentity,
      isTouch: this.data.isTouch,
      isSameBuilding: this.data.isSameBuilding,
      isSymptom: this.data.isSymptom,
      isTouchSymptom: this.data.isTouchSymptom,
      temperature: this.data.temperature,
      stemperature: this.data.stemperature,
      across: this.data.acrossdes,
      wacross: this.data.wacrossdes,
      isHolidyTouch: this.data.isHolidyTouch,
      isHolidyTouchW: this.data.isHolidyTouchW,
      returndate: this.data.returndate,
      // live: this.data.live,
      isLiveTouch: this.data.isLiveTouch,
      isLiveTouchW: this.data.isLiveTouch,
      // isNotice: this.data.isNotice,
      more: this.data.more,
      insulate: this.data.insulate,
      insulatefrom: this.data.insulatefrom,
      insulateto: this.data.insulateto,
      insulateaddressflag: this.data.insulateaddressflag,
      insulateaddress: this.data.insulateaddress,
      code:this.data.code,
      xcode: this.data.xcode
    };
    if (temp.chname == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写姓名',
        type: 'warning'
      });
    }
    else if (temp.companyName == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写公司名',
        type: 'warning'
      });
    }
    else if (temp.purpose == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写参访目的',
        type: 'warning'
      });
    }
    else if (temp.idno == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写身份证号码',
        type: 'warning'
      });
    }
    else if (temp.idno.length != 18) {
      wx.hideLoading();
      $Toast({
        content: '请填写18位身份证号码',
        type: 'warning'
      });
    }
    else if ( temp.site == 'WKS' && temp.code == '') {
      wx.hideLoading();
      const codechname = temp.codechname;
      $Toast({
        content: '请选择' + codechname + '颜色',
        type: 'warning'
      });
    }
    else if (temp.site == 'WKS' && temp.xcode == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择行程码颜色',
        type: 'warning'
      });
    }
    // else if (!reg2.test(temp.idno) && !reg3.test(temp.idno) ) {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '身份证号码格式错误',
    //     type: 'warning'
    //   });
    // }
    /*else if (temp.native.indexOf(temp.idno.substring(0, 2))>-1) {
      console.log(temp.native.indexOf(temp.idno.substring(0, 2)))
      wx.hideLoading();
      $Toast({
        content: '管制区域人员不能申请',
        type: 'warning'
      });
    }
    else if (temp.native.indexOf(temp.idno.substring(0, 4)) > -1) {
      console.log(temp.native.indexOf(temp.idno.substring(0, 2)))
      $Toast({
        content: '管制区域人员不能申请',
        type: 'warning'
      });
    }*/
    // else if (temp.idno.substring(0, 4) == '3301') {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '浙江杭州籍人员无法申请',
    //     type: 'warning'
    //   });
    // }
    // else if (temp.idno.substring(0, 4) == '3302') {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '浙江宁波籍人员无法申请',
    //     type: 'warning'
    //   });
    // }
    // else if (temp.idno.substring(0, 4) == '3310') {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '浙江台州籍人员无法申请',
    //     type: 'warning'
    //   });
    // }
    else if (temp.phone == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写联络电话',
        type: 'warning'
      });
    }
    else if (!reg.test(temp.phone)) {
      wx.hideLoading();
      $Toast({
        content: '联络电话格式错误',
        type: 'warning'
      });
    }
    else if (temp.region.length == 0) {
      wx.hideLoading();
      $Toast({
        content: '请选择所在地',
        type: 'warning'
      });
    }
    else if (temp.address == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写详细地址',
        type: 'warning'
      });
    }
    else if (temp.isIdentity == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择所在街道是否有确诊病例',
        type: 'warning'
      });
    }
    else if (temp.isTouch == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择14天內是否与确诊人员有密切接触',
        type: 'warning'
      });
    }
    else if (temp.isSameBuilding == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择14天内是否与确诊人员住同一栋楼',
        type: 'warning'
      });
    }
    else if (temp.insulate == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择是否被隔离管制中',
        type: 'warning'
      });
    }
    else if (temp.insulate != '' && temp.insulate != '否' && temp.insulatefrom == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择开始隔离日期',
        type: 'warning'
      });
    }
    else if (temp.insulate != '' && temp.insulate != '否' && temp.insulateto == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择结束隔离日期',
        type: 'warning'
      });
    }
    else if (temp.insulate != '' && temp.insulate != '否' && temp.insulateaddressflag == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择隔离期间是否违规外出',
        type: 'warning'
      });
    }
    else if (temp.insulate != '' && temp.insulate != '否' && temp.insulateaddressflag == 'Y' && temp.insulateaddress == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写隔离期间违规外出详细地址',
        type: 'warning'
      });
    }
    else if (temp.isSymptom == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择是否有感染症状',
        type: 'warning'
      });
    }
    else if (temp.isTouchSymptom == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择亲密接触的家属人群是否有疑似症状',
        type: 'warning'
      });
    }
    else if (temp.isHolidyTouch == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择是否接触14天内內返回的管制区域来的同事或亲友',
        type: 'warning'
      });
    }
    // else if (temp.isHolidyTouchW == '') {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '请选择春节假期是否接触浙江温州/台州/杭州/宁波来的同事或亲友',
    //     type: 'warning'
    //   });
    // }
    else if (temp.isLiveTouch == '') {
      wx.hideLoading();
      $Toast({
        content: '选择共住人员是否有接触14天內返回的管制区域的同事或亲友',
        type: 'warning'
      });
    }
    // else if (temp.isLiveTouchW == '') {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '请选择共住人员是否接触浙江温州/台州/杭州/宁波来的同事或亲友',
    //     type: 'warning'
    //   });
    // }
    // else if (temp.isNotice == '') {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '请选择是否接到相应通知',
    //     type: 'warning'
    //   });
    // }
    else if (temp.across == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择14天内是否去过或经停管制区域',
        type: 'warning'
      });
    }
    // else if (temp.wacross == '') {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '请选择春节假期是否去过或经停浙江温州/台州/杭州/宁波',
    //     type: 'warning'
    //   });
    // }
    // else if (temp.live == '') {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '请选择返昆后住宿点',
    //     type: 'warning'
    //   });
    // }
    else if (temp.returndate == '') {
      wx.hideLoading();
      var content = '请选择预计返回' + temp.sitetwo + '日期(已返回' + temp.sitetwo + '填写实际日期，春节一直留守统一填2020/01/24)'
      $Toast({
        content: content,
        type: 'warning'
      });
    }
    else if (temp.temperature == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写体温',
        type: 'warning'
      });
    }
    else if (!reg1.test(temp.temperature)) {
      wx.hideLoading();
      $Toast({
        content: '第一次体温格式错误',
        type: 'warning'
      });
    }
    else if (temp.stemperature != '' && !reg1.test(temp.stemperature)) {
      wx.hideLoading();
      $Toast({
        content: '第二次体温格式错误',
        type: 'warning'
      });
    }
    else {
      let that = this;
      util.request(api.HealthVisitForm, info, "POST")
        .then(function (res) {
          if (res.code == 0) {
            wx.hideLoading();
            wx.showToast({
              image: '../../../static/image/err.png',
              title: res.result,
            })
          }
          else {
            wx.hideLoading();
            var empcode = "";
            if (res.empcode == "A" || res.empcode == "D") {
              that.setData({
                visible_red: true,
                message: res.result,
              });
            }
            else if (res.empcode == "B" || res.empcode == "C") {
              that.setData({
                visible_yellow: true,
                message: res.result,
              });
            }
            else {
              that.setData({
                visible_green: true,
                message: res.result,
              });
            }
            // that.setData({
            //   visible: true,
            //   message: res.result,
            //   mes: empcode
            // });

            // wx.showToast({
            //   title: '提交成功',
            // })
            // setTimeout(() => {
            //   wx.navigateTo({
            //     url: '/pages/index/index',
            //   })
            // }, 1000);

          }
        });
    }
  },
  handleClick({ detail }) {
    this.setData({
      visible: false
    });
    wx.navigateTo({
      url: '/pages/otherIndex/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.site == "") {
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
      var site1 = '昆';
      var site2 = '昆山';
      var codechname = '苏城码';
      var codeenname = 'Sucheng';
      var liveplace = [
        { RID: '1', Description: "外宿" },
        { RID: '2', Description: "宿舍" }
      ];
      console.log(app.globalData.site)
      if (app.globalData.site == "WKS") {
        site1 = "昆";
        site2 = "昆山";
        codechname = '苏城码';
        codeenname = 'Sucheng';
        liveplace = [
          { RID: '1', Description: "外宿" },
          { RID: '2', Description: "机械园" },
          { RID: '3', Description: "中华园" },
          { RID: '4', Description: "共聚宿舍" },
          { RID: '5', Description: "会馆" },
        ];
      }
      else if (app.globalData.site == "WTZ") {
        site1 = "泰";
        site2 = "泰州";
        codechname = '祥泰码';
        codeenname = 'Xiangtai';
      }
      else if (app.globalData.site == "WOK") {
        site1 = "昆";
        site2 = "昆山";
        codechname = '苏城码';
        codeenname = 'Sucheng';
      }
      else if (app.globalData.site == "WCQ") {
        site1 = "重";
        site2 = "重庆";
        codechname = '';
        codeenname = '';
      }
      else if (app.globalData.site == "WCD") {
        site1 = "成";
        site2 = "成都";
        codechname = '';
        codeenname = '';
      }
      else if (app.globalData.site == "WZS") {
        site1 = "中";
        site2 = "中山";
        codechname = '粤康码';
        codeenname = 'Yuekang';
      }
      var DATE = util.formatDate(new Date());
      this.setData({
        site: app.globalData.site,
        codechname: codechname,
        codeenname: codeenname,
        now: DATE,
        siteone: site1,
        sitetwo: site2,
        liveArray: liveplace
      });
      this.getBaseData();
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            winHeight: res.windowHeight - 58
          });
        }
      });
    }
    // this.getVerificationCode();
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