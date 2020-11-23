// pages/healthForm/healthForm.js
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
    hidden:false,
    deadline:'',
    site:'',
    showModal: false,
    disabled: true,
    codename: '我已阅读',
    visible: false,
    visible1: false,
    title:'提交成功',
    message:'',
    actions:[{name: '确定'}],
    siteone:'',
    sitetwo:'',
    winHeight: '',
    isdisabled: true,
    now: '',
    employee: {},//api获取
    place:'',
    enplace:'',
    phone:'',
    idno:'',
    region:[],
    address:'',
    items: [
      { id: '0', name: 'yes', value: '是' },
      { id: '1', name: 'no', value: '否' },
      // , checked: 'true'
    ],
    isIdentity:'',//确诊
    isTouch:'',//接触
    isSameBuilding:'',//住同一栋楼
    isSymptom:'',//感染症状
    isTouchSymptom: '',//接触感染症状
    temperature:'',
    stemperature:'',
    codeArray: [
      { RID: '1', Description: "绿色" },
      { RID: '2', Description: "黄色" },
      { RID: '3', Description: "红色" },
    ],
    codechname:'',
    codeenname:'',
    code:'',
    insulateArray: [
      { RID: '1', Description: "否"},
      { RID: '2', Description: "政府机构隔离"},
      { RID: '3', Description: "公司医学观察"},
      { RID: '4', Description: "在家医学观察"},
      { RID: '5', Description: "已解除隔离" },
    ],
    insulate:'',
    insulatefrom: '',
    insulateto: '',
    insulateaddressflag: '',
    insulateaddress: '',
    acrossArray:[
      { RID:'1',Description: "没去过",Content:"N" },
      { RID:'2',Description: "经停",Content: "P" },
      { RID:'3',Description: "去过",Content: "Y" },
    ],
    newacrossArray:[],
    across:'',
    acrossdes:'',
    wacross:'',
    wacrossdes: '',
    isHolidyTouch:'',//春节假期接触
    isHolidyTouchW: '',
    returndate:'',
    liveArray: [
      { RID: '1', Description: "外宿" },
      { RID: '2', Description: "机械园" },
      { RID: '3', Description: "中华园" },
      { RID: '4', Description: "共聚宿舍" },
      { RID: '5', Description: "会馆" },
    ],
    liveindex: 0,
    live: '',
    isLiveTouch:'',//共住
    isLiveTouchW: '',//共住
    isNotice:'',
    more:'',
    choose:'',
    noticechoose:'',
    day:'',
    returnArray: [
      { RID: '1', Description: "私家车" },
      { RID: '2', Description: "大巴" },
      { RID: '3', Description: "高铁/火车" },
      { RID: '4', Description: "飞机" },
      // { RID: '5', Description: "已解除隔离" },
    ],
    returntype:'',
    returnplace:'',
    visible_red:false,
    visible_green: false,
    visible_yellow: false,
    isTravelG:'',
    isTravelS: '',
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
    util.request(api.HealthBase, { empno: app.globalData.userInfo, site: app.globalData.site })
    // util.request(api.HealthBase, { empno: 'K20075305', site: 'wks' })
      .then(function (res) {

        // console.log(res.EmpList[0].Empno);
        // console.log(res.EmpList[0].Chname);

        if (res.result == "success") {
          if (res.EmpList.length > 0) {
            that.setData({
              employee: res.EmpList[0],
              phone: res.EmpList[0].PhoneNo,
            })

            // console.log(employee.Empno);
          }

          if (res.AcrossList.length > 0){
            that.setData({
              newacrossArray: [...res.AcrossList]
            })
          }
          if (res.List.length > 0){
            that.setData({
              place: res.List[0].Place,
              enplace: res.List[0].EnPlace,
            });
          }
          if (res.deadline!=""){
            var now = util.formatDate(new Date()).replace(/-/g, '/');
            var nowtime = new Date();
            var deadline = new Date(now + ' ' + res.deadline.replace(/：/g, ':'));
            var day = (nowtime - deadline) / 1000 / 60 / 60;

            console.log(nowtime, deadline, day)
            
            if (day>0){
              that.setData({
                showModal: false,
                deadline: res.deadline.replace(/：/g, ':'),
                visible1: true
              });
            }
            else{
              that.setData({
                showModal: true,
                deadline: res.deadline.replace(/：/g, ':'),
              });
            }
            
          }
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

  bindAddress: function (e) {
    console.log(e.detail.value)
    this.setData({ 
      address: e.detail.value     
    })  
  },     //选择当日所在地

  bindInsulateAddress: function (e) {
    console.log(e.detail.value)
    this.setData({
      insulateaddress: e.detail.value
    })
  },


  isIdentityChange:function(e){
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
      stemperature: e.detail.value       //是否被隔离管制
    })
  },

  getReturnPlace(e) {
    this.setData({
      returnplace: e.detail.value
    })
  },
  bindInsulateChange: function (e) {
    console.log('111111111111111111111111111picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      insulate: this.data.insulateArray[e.detail.value].Description
    })
  },

  bindCodeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      code: this.data.codeArray[e.detail.value].Description
    })
  },

  bindReturnChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      returntype: this.data.returnArray[e.detail.value].Description
    })
  },
  bindAcrossChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      // acrossindex: e.detail.value,
      across: this.data.newacrossArray[e.detail.value].Content,
      acrossdes: this.data.newacrossArray[e.detail.value].Description
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
    var fromdate = new Date(e.detail.value)
    var todate = new Date(util.formatDate(new Date()))
    var day = (fromdate - todate) / 1000 / 60 / 60 / 24
    console.log(e.detail.value, util.formatDate(new Date()), day)
    this.setData({
      returndate: e.detail.value,
      day: day,
      returntype:''
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
      this.setData({                       //本人承诺....
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

  checkboxChange(e){
    console.log(e.detail.value)
    if (e.detail.value.length==1){
      this.setData({
        isdisabled: false
      })
    }
    else{
      this.setData({
        isdisabled: true
      })
    }
  },

  isGTravelChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isTravelG: 'Y'
      })
    }
    else {
      this.setData({
        isTravelG: 'N'
      })
    }
  },

  isSTravelChange: function (e) {
    if (e.detail.value == "yes") {
      this.setData({
        isTravelS: 'Y'
      })
    }
    else {
      this.setData({
        isTravelS: 'N'
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
    var nnow = util.formatDate(new Date()).replace(/-/g, '/');
    var nnowtime = new Date();
    var ndeadline = new Date(nnow + ' ' + temp.deadline);
    var nday = (nnowtime - ndeadline) / 1000 / 60 / 60;
    if (nday > 0) {
      wx.hideLoading();
      this.setData({
        visible1: true
      });
    }
    else{
    let index = this.data.index;
    let reason = this.data.reason;
    //console.log(temp);
    console.log(temp)
    var applytime = util.formatTime(new Date());
    let info = { 
      site: app.globalData.site, 
      applyid: this.data.employee.Empno,
      applyname: this.data.employee.Chname, 
      applydept: this.data.employee.Deptcode,
      applyphone: this.data.phone,
      applyidno: this.data.idno,
      applytime: applytime,
      applydate: this.data.now,
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
      live: this.data.live,
      isLiveTouch: this.data.isLiveTouch,
      isLiveTouchW: this.data.isLiveTouchW,
      isNotice: this.data.isNotice,
      more: this.data.more,
      insulate: this.data.insulate,
      insulatefrom: this.data.insulatefrom,
      insulateto: this.data.insulateto,
      insulateaddressflag: this.data.insulateaddressflag,
      insulateaddress: this.data.insulateaddress,
      returntype: this.data.returntype,
      returnplace: this.data.returnplace,
      code: this.data.code,
      isTravelG: this.data.isTravelG,
      isTravelS: this.data.isTravelS
    };
      // if (temp.site != 'WOK' && temp.site != 'WKS'&&temp.idno == '') {
    if (temp.site == 'WWW' && temp.idno == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写身份证号码',
        type: 'warning'
      });
    }
    // else if (temp.site != 'WOK' && temp.site != 'WKS'&&temp.idno.length != 18) {
    else if (temp.site == 'WWW' && temp.idno.length != 18) {
      wx.hideLoading();
      $Toast({
        content: '请填写18位身份证号码',
        type: 'warning'
      });
    }
    else if ((temp.site == 'WOK' || temp.site == 'WKS' || temp.site == 'WTZ' ) && temp.code == '') {
        wx.hideLoading();
      const codechname = temp.codechname;
        $Toast({
          content: '请选择' + codechname+'颜色',
          type: 'warning'
        });
      }
      // else if (temp.address == '' && (temp.site != 'WOK' && temp.site != 'WKS')) {
    else if (temp.address == '' && (temp.site == 'WWW')) {
        wx.hideLoading();
        $Toast({
          content: '请填写详细地址',
          type: 'warning'
        });
      }
    else if (temp.isTravelG == '' && (temp.site == 'WZS')) {
      wx.hideLoading();
      $Toast({
        content: '请选择是否有国外旅行史',
        type: 'warning'
      });
    }
    else if (temp.isTravelS == '' && (temp.site == 'WWW')) {
      wx.hideLoading();
      $Toast({
        content: '请选择是否有省外旅行史',
        type: 'warning'
      });
    }
      //else if (temp.isIdentity == '' && (temp.site != 'WOK' && temp.site != 'WKS')) {
    else if (temp.isIdentity == '' && (temp.site == 'WWW')) {
        wx.hideLoading();
        $Toast({
          content: '请选择所在街道是否有确诊病例',
          type: 'warning'
        });
      }
      else if ((temp.site == 'WWW' || temp.site == 'WWW') && temp.day > 0 && temp.returntype == '') {
        wx.hideLoading();
        $Toast({
          content: '请选择返回交通工具',
          type: 'warning'
        });
      }
      else if (temp.returntype == '高铁/火车' && temp.returnplace == '') {
        wx.hideLoading();
        $Toast({
          content: '请选择搭乘高铁/火车上车点',
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
    else if (temp.phone == '') {
      wx.hideLoading();
      $Toast({
        content: '请填写联络电话',
        type: 'warning'
      });
    }
    else if (!reg.test(temp.phone)){
      wx.hideLoading();
      $Toast({
        content: '联络电话格式错误',
        type: 'warning'
      });
    }
    // else if (temp.insulate != '' && temp.insulate != '否' && temp.insulateaddressflag == '' && (temp.site != 'WOK' && temp.site != 'WKS')) {
    else if (temp.insulate != '' && temp.insulate != '否' && temp.insulateaddressflag == '' && (temp.site == 'WWW' )) {
        wx.hideLoading();
        $Toast({
          content: '请选择隔离期间是否违规外出',
          type: 'warning'
        });
      }
      //else if (temp.isLiveTouch == '' && (temp.site != 'WOK' && temp.site != 'WKS')) {
    else if (temp.isLiveTouch == '' && (temp.site == 'WWW')) {
        wx.hideLoading();
        $Toast({
          content: '请选择共住人员是否有接触14天內返回的管制区域的同事或亲友',
          type: 'warning'
        });
      }
      //else if (temp.isNotice == '' && (temp.site != 'WOK' && temp.site != 'WKS')) {
    else if (temp.isNotice == '' && (temp.site == 'WWW')) {
        wx.hideLoading();
        $Toast({
          content: '请选择是否接到相应通知',
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
    else if (temp.isTouch == '' && temp.site != 'WZS'&& temp.site != 'WKS'&& temp.site != 'WOK') {
      wx.hideLoading();
      $Toast({
        content: '请选择近14日内是否与确诊人员有密切接触',
        type: 'warning'
      });
    }
    else if (temp.isSameBuilding == '' && temp.site != 'WZS'&& temp.site != 'WKS'&& temp.site != 'WOK') {
      wx.hideLoading();
      $Toast({
        content: '请选择近14日内是否与确诊人员住同一栋楼',
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
    else if (temp.insulate != '' && temp.insulate != '否' && temp.insulatefrom == '' ) {
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
    else if (temp.isHolidyTouch == ''&& temp.site != 'WKS'&& temp.site != 'WOK') {
      wx.hideLoading();
      $Toast({
        content: '请选择是否接触近14日内返回的管制区域来的同事或亲友',
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
    
    
    // else if (temp.isLiveTouchW == '') {
    //   wx.hideLoading();
    //   $Toast({
    //     content: '请选择共住人员是否接触浙江温州/台州/杭州/宁波来的同事或亲友',
    //     type: 'warning'
    //   });
    // }
    
    else if (temp.across == '') {
      wx.hideLoading();
      $Toast({
        content: '请选择近14日内是否去过或经停管制区域',
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
    else if (temp.returndate == ''&& temp.site != 'WKS'&& temp.site != 'WOK') {
      wx.hideLoading();
      var content = '请选择预计返回' + temp.sitetwo + '日期(已返回' + temp.sitetwo +'填写实际日期，春节一直留守统一填2020/01/24)'
      $Toast({
        content: content,
        type: 'warning'
      });
    }
    else if (temp.live == '') {
      wx.hideLoading();
      var content = '请选择返回'+temp.sitetwo+'后住宿点'
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
      util.request(api.HealthForm, info, "POST")
      .then(function (res) {
        console.log(res)
        if (res.code == 0) {
          wx.hideLoading();
          wx.showToast({
            image: '../../../static/image/err.png',
            title: res.result,
          })
        }
        else {
          wx.hideLoading();
          // if(that.data.site=="WZS")
          if (res.empcode == "A" || res.empcode == "D"){
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
          else{
            that.setData({
              visible_green: true,
              message: res.result,
            });
          }
          // that.setData({
          //   visible: true,
          //   message: res.result,
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
    }
  },


  handleClick({ detail }) {
    this.setData({
      visible: false
    });
    wx.switchTab({
      url: '/pages/homepage/index',
    })
  },

  handleClick1({ detail }) {
    this.setData({
      visible1: false
    });
    wx.switchTab({
      url: '/pages/homepage/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      var site1 = 'Kunshan';
      var site2 = '昆山';
      var codechname = '苏城码';
      var codeenname = 'Sucheng';
      var liveplace = [
        { RID: '1', Description: "外宿" },
        { RID: '2', Description: "宿舍" }
      ];
      console.log(app.globalData.site)
      if (app.globalData.site=="WKS"){
        site1 ="Kunshan";
        site2="昆山";
        codechname = '苏城码';
        liveplace = [
          { RID: '1', Description: "外宿" },
          { RID: '2', Description: "机械园" },
          { RID: '3', Description: "中华园" },
          { RID: '4', Description: "共聚宿舍" },
          { RID: '5', Description: "会馆" },
        ];
      }
      else if (app.globalData.site == "WTZ") {
        site1 = "Taizhou";
        site2 = "泰州";
        codechname = '祥泰码';
        codeenname = 'Xiangtai';
      }
      else if (app.globalData.site == "WOK") {
        site1 = "Kunshan";
        site2 = "昆山";
        codechname = '苏城码'; 
        codeenname = 'Sucheng';
      }
      else if (app.globalData.site == "WCQ") {
        site1 = "Chongqing";
        site2 = "重庆";
        codechname = '';
        codeenname = '';
      }
      else if (app.globalData.site == "WCD") {
        site1 = "Chengdu";
        site2 = "成都";
        codechname = '';
        codeenname = '';
      }
      else if (app.globalData.site == "WZS") {
        site1 = "Zhongshan";
        site2 = "中山";
        codechname = '粤康码';
        codeenname = 'Yuekang';
      }
      var DATE = util.formatDate(new Date());
      this.setData({
        site: app.globalData.site,
        now: DATE,
        siteone: site1,
        sitetwo: site2,
        liveArray:liveplace,
        codechname: codechname,
        codeenname: codeenname
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