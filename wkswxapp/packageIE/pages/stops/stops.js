// packageIE/pages/stops/stops.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
var { $Message} = require('../../../components/base/index');
var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectShow: false,
    Plants: [], //Plant 
    index: 0,
    shiftidshow: false,
    s: [], // ShiftID
    shiftid:0,

    stageshow: false,
    t: [], //Stage
    stage: 0,

    selectShows: false,
    i: [], //组长
    indexs: 0,
    codeshow: false,
    c: [], //Project Code
    code: 0,
    nameshow: false,
    n: [], //Project Name
    name: 0,
    projectshow: false,
    j: [], //Project stage
    project: 0,
    date: '', //选择时间
    dates: '',
    classshow: false,
    C: [], //Big Class
    clas: 0,
    reasonshow: false,
    R: [], //Class reason
    reason: 0,
    descriptionshow: false,
    D: [], //Description
    description: 0,
    HeadCount: '',
    ReasonRemark: '',
    LiableSigner: '',
    Line:'',
    allReason:{},
    reasontype:[],
    selectReasontype:0,
    reasoncode:[],
    selectReasoncode:0,
    // Stage:'',
    dateSecond: ''
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  selectDateSecondChange(ev) {
    this.setData({
      dateSecond: ev.detail.value
    })
  },
  // bindshiftidChange: function (e) {
  //   console.log(e.detail.value)
  //   this.setData({
  //     shiftid: e.detail.value
  //   })
  // },
  bindLine: function (e) {
    console.log(e.detail.value)
    this.setData({
      Line: e.detail.value
    })
  },

  bindNumber: function (e) {
    console.log(e.detail.value)
    this.setData({
      HeadCount: e.detail.value
    })
  },

  bindDescription: function (e) {
    console.log(e.detail.value)
    this.setData({
      ReasonRemark: e.detail.value
    })
  },

  bindEmpno: function (e) {
    console.log(e.detail.value)
    this.setData({
      LiableSigner: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.getBaseData();
    // var s = this.data.s;

  },
  getBaseData() {
    let that = this;
    util.request(api.stop, {
        empNo: app.globalData.userInfo,
        site: app.globalData.site
      })
      // util.request(api.stop, {empNo: 'Y1912027', site: 'WMY'  })
      .then(function (res) {
        // console.log(res.data[0].plantID_Data);
        // console.log(res.data[1].shiftIDAndLineLeaderName_Data);
        // console.log(res.data[2].stage_Data);
        // console.log(res.data[3].projectCodeAndProjectName_Data);
        // console.log(res.data[4].projectStage_Data);
        // console.log(res.data[5].bigClassAndCodeAndDescription);
        console.log(res.data);

        // //判断位置是否为马来西亚
        //    if (app.globalData.site != 'WYM') {
        //   wx.showModal({
        //     title: '提示',
        //     content: app.globalData.site + '暂不支持此功能.',
        //     success: function (res) {
        //       console.log(res)
        //         wx.switchTab({
        //           url: '/pages/homepage/index',
        //         })
        //     }
        //   });
        // }
        if (res.result == "success") {
          let Plants = new Array();
          for (let z of res.data[0].plantID_Data) {
            Plants.push(z.Plant)
          }
          that.setData({
            Plants: [...Plants]
          })
          //  console.log([...Plants]);

          //遍历数组
          let i = new Array();
          for (let x of res.data[1].shiftIDAndLineLeaderName_Data) {
            i.push(x.LineLeaderName);
          }
          // console.log([...i]);
          that.setData({
            i: [...i],
          });

          var s = new Array();
          for (let y of res.data[1].shiftIDAndLineLeaderName_Data) {
            s.push(y.ShiftID);
          }
          // console.log([...s]);
          that.setData({
            s: [...s],
          });
        //  var s = toString(s)
        //  console.log(s);
        //  console.log(s[that.data.shiftid].substring(2,5));
         that.setData({
           Line :that.data.s[that.data.shiftid].substring(2,5)
         })
        //  console.log(that.data.Line);
          let t = new Array();
          for (let y of res.data[2].stage_Data) {
            t.push(y.Stage);
          }
          // console.log([...t]);
          that.setData({
            t: [...t],
          });
          // console.log(t);

          // console.log(s);
          let c = new Array();
          for (let b of res.data[3].projectCodeAndProjectName_Data) {
            c.push(b.ProjectCode);
          }
          // console.log([...c]);
          that.setData({
            c: [...c],
          });

          let n = new Array();
          for (let d of res.data[3].projectCodeAndProjectName_Data) {
            n.push(d.ProjectName);
          }
          // console.log([...n]);
          that.setData({
            n: [...n],
          });

          let j = new Array();
          for (let e of res.data[4].projectStage_Data) {
            j.push(e.ProjectStage);
          }
          // console.log([...j]);
          that.setData({
            j: [...j],
          });

          // let C = new Set();
          // for (let e of res.data[4].bigClassAndCodeAndDescription) {
          //   C.add(e.BigClass);
          // }
          // console.log([...C]);
          // that.setData({
          //   C: [...C],
          // });

          let C = new Array();
          let reasontype = []
          // console.log(res.data[5].bigClassAndCodeAndDescription)
          var reason1 = res.data[5].bigClassAndCodeAndDescription;
          var newreson = {};
          for (let i in reason1) {
            let bigclass = reason1[i].BigClass;
            console.log(bigclass)
            if(reasontype.indexOf(bigclass)<0){
              reasontype.push(bigclass)
            }
            if (newreson[bigclass] == undefined) {
              newreson[bigclass] = [reason1[i]]
            } else {
              newreson[bigclass].push(reason1[i])
            }
          }

          for (let e of res.data[5].bigClassAndCodeAndDescription) {
            C.push(e.BigClass);
          }
          // console.log(C);
          console.log(newreson[reasontype[that.data.selectReasontype]])
          that.setData({
            C: newreson,
            reasontype:reasontype,
            allReason:newreson,
            reasoncode:newreson[reasontype[that.data.selectReasontype]]
          });
          let R = new Array();
          for (let e of res.data[5].bigClassAndCodeAndDescription) {
            R.push(e.Code);
          }
          // console.log([...R]);
          that.setData({
            R: [...R],
          });

          let D = new Array();
          for (let e of res.data[5].bigClassAndCodeAndDescription) {
            D.push(e.Description);
          }
          // console.log([...D]);
          that.setData({
            D: [...D],
          });
        }
      });
  },
  
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(e.currentTarget.dataset.index);
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },

  selectTapselect() {
    this.setData({
      shiftidshow: !this.data.shiftidshow
    });
  },
  // 点击下拉列表
  optionTapselect(e) {
    // let Shiftid = e.currentTarget.dataset.shiftid; //获取点击的下拉列表的下标
    // console.log(e.currentTarget.dataset.shiftid);
    // let line = that.data.s[that.data.shiftid].slice(2,5)
    // console.log(e.details.value)
    let that = this;
    this.setData({
      shiftid:e.currentTarget.dataset.shiftid,
      shiftidshow: !this.data.shiftidshow,
      // Line :that.data.s[that.data.shiftid].substring(2,5),
    });
    console.log(this.data.shiftid);
    console.log( that.data.s[this.data.shiftid].substring(2,5))
    that.setData({
      Line:  that.data.s[this.data.shiftid].substring(2,5)
    })
    // console.log(that.data.Line);
  },
  selectTapstage() {
    this.setData({
      stageshow: !this.data.stageshow
    });
  },
  // 点击下拉列表
  optionTapstage(e) {
    let Stage = e.currentTarget.dataset.stage; //获取点击的下拉列表的下标
    console.log(e.currentTarget.dataset.stage);
    this.setData({
      stage: Stage,
      stageshow: !this.data.stageshow
    });
  },

  selectTaps() {
    this.setData({
      selectShows: !this.data.selectShows
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.indexs; //获取点击的下拉列表的下标
    console.log(e.currentTarget.dataset.indexs);
    this.setData({
      indexs: Indexs,
      selectShows: !this.data.selectShows
    });
  },


  selectTapcode() {
    this.setData({
      codeshow: !this.data.codeshow
    });
  },
  // 点击下拉列表
  optionTapcode(e) {
    let Code = e.currentTarget.dataset.code; //获取点击的下拉列表的下标
    console.log(e.currentTarget.dataset.code);
    this.setData({
      code: Code,
      codeshow: !this.data.codeshow
    });
  },

  // selectTapname() {
  //   this.setData({
  //     nameshow: !this.data.nameshow
  //   });
  // },
  // // 点击下拉列表
  // optionTapname(e) {
  //   let Name = e.currentTarget.dataset.name;//获取点击的下拉列表的下标
  //   console.log(e.currentTarget.dataset.name);
  //   this.setData({
  //     name: Name,
  //     nameshow: !this.data.nameshow
  //   });
  // },

  selectTapname() {
    this.setData({
      nameshow: !this.data.nameshow
    });
  },
  // 点击下拉列表
  optionTapname(e) {
    let Code = e.currentTarget.dataset.code; //获取点击的下拉列表的下标
    console.log(e.currentTarget.dataset.code);
    this.setData({
      code: Code,
      nameshow: !this.data.nameshow
    });
  },

  selectTapproject() {
    this.setData({
      projectshow: !this.data.projectshow
    });
  },
  // 点击下拉列表
  optionTapproject(e) {
    let Project = e.currentTarget.dataset.project; //获取点击的下拉列表的下标
    console.log(e.currentTarget.dataset.project);
    this.setData({
      project: Project,
      projectshow: !this.data.projectshow
    });
  },


  selectTapclass() {
    this.setData({
      classshow: !this.data.classshow
    });
  },
  // 点击下拉列表
  optionTapclass(e) {
    let Clas = e.currentTarget.dataset.clas; //获取点击的下拉列表的下标
    this.setData({
      reasoncode:this.data.allReason[this.data.reasontype[e.currentTarget.dataset.clas]],
      selectReasontype:e.currentTarget.dataset.clas,
      clas: Clas,
      classshow: !this.data.classshow
    });
  },

  selectTapreason() {
    this.setData({
      reasonshow: !this.data.reasonshow
    });
  },
  // 点击下拉列表
  optionTapreason(e) {
    let Clas = e.currentTarget.dataset.clas; //获取点击的下拉列表的下标
    console.log(e.currentTarget.dataset.clas);
    this.setData({
      clas: Clas,
      selectReasoncode:Clas,
      reasonshow: !this.data.reasonshow
    });
  },
  selectTapdescription() {
    this.setData({
      descriptionshow: !this.data.descriptionshow
    });
  },
  // 点击下拉列表
  optionTapdescription(e) {
    let Clas = e.currentTarget.dataset.clas; //获取点击的下拉列表的下标
    console.log(e.currentTarget.dataset.clas);
    this.setData({
      clas: Clas,
      descriptionshow: !this.data.descriptionshow
    });
  },
  sendWMY: function () {
    wx.showLoading({
      title: '加载中...',
      success: function () {}
    });
    // console.log('helo');
    let temp = this.data;
    //下拉框的下标
    let index = this.data.index;
    var shiftid = this.data.shiftid;
    let stage = this.data.stage;
    let indexs = this.data.indexs;
    let code = this.data.code;
    let name = this.data.name;
    let project = this.data.project;
    let clas = this.data.clas;
    let reason = this.data.reason;
    let description = this.data.description;
    //输入的文本
    let HeadCount = this.data.HeadCount;
    let ReasonRemark = this.data.ReasonRemark;
    let LiableSigner = this.data.LiableSigner;
    let Line = this.data.Line;
    let selectReasontype = this.data.selectReasontype;
    let selectReasoncode = this.data.selectReasoncode;
    // 提交到后台的数据
    let info = ({
      //  "ApplyID": 'Y1912027',           
      "ApplyID": app.globalData.userInfo,
      "Site": app.globalData.site,
      // "Site": "WMY",
      "PlantID": this.data.Plants[index],
      "ShiftDate": this.data.date,
      "ShiftID": this.data.s[shiftid],
      "Stage": this.data.t[stage],
      "LineLeaderName": this.data.i[indexs],
      "ProjectCode": this.data.c[code],
      "ProjectName": this.data.n[code],
      "ProjectStage": this.data.j[project],
      "LossFrom": this.data.dateSecond,
      "HeadCount": HeadCount,
      "BigClass": this.data.reasontype[selectReasontype],
      "ReasonCode": this.data.reasoncode[selectReasoncode].Code,
      "Description": this.data.D[clas],
      "ReasonRemark": ReasonRemark,
      "LiableSigner": LiableSigner,
      "Line":Line  
    });
    console.log(info)
    info = JSON.stringify(info)
    if (HeadCount == '' || ReasonRemark == '' || LiableSigner == '') {
      console.log(temp);
      // console.log(info);
      wx.showToast({
        title: '请填写完整!',
      })
      // console.log(data.employee);
    } else {
      util.requests(api.stops, info, "POST").then(function (res) {
        // console.log(res);
        if (res.result == "success") {
          console.log(info);
          wx.showToast({
            title: '提交成功',
            duration: 2000,
          })
          wx.switchTab({
            url: '/pages/homepage/index',
          })
        }else {
          wx.showToast({
            // title: res.result,
            title: '提交失败',
            duration: 2000,
          })
        }
      });
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