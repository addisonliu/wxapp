// pages/executionForm/index.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
const { http, checkDate, uploadFile } = require('../../../utils/index.js');
const { $Message } = require('../../../components/base/index');
const { ExecutionInit, ExecutionHistory, ExecutionSheet, ExecutionAddWorker, ExecutionSubmit, ExecutionButton, IntervieweeInfo } = require('../../../config/api.js');

Page({
  /**
   * 
   * 
   * 页面的初始数据
   */
  data: {
    tag: null,
    applytype: {}, //施工类型，默认，取返回值中的一般作业
    data: {//所有数据  + 默认数据
     // isworthy: 'N'
    },
    isDisabled: false,
    new:"",
    show:false,
    hidden:false,
    currentPage: 1,//当前页面
    pageAnimation1: '',//页面过渡css
    pageAnimation2: '',
    pageAnimation3: '',
    pageAnimation4: '',
    pageAnimation5: '',
    pageAnimation6: '',
    addWorkerPageAnimation: '',
    addWorkerDialogAnimation: '',
    addNewWorkerAttentionAnimation: '',
    showAddDialog: false,
    pageList1: [//页面1
      { label: '施工厂商负责人手机号', isRequired: true, id: 'GuestMobile', disabled: false, type: 'input',name:'a'},
      {label: '厂商负责人姓名', isRequired: true, id: 'FacPIC', disabled: false, type: 'input'},
      {label: '厂商公司名称', isRequired: true, id: 'GuestFacName', disabled: false, type: 'input'},
      {label: '受访同仁英文名', isRequired: true, id: 'EnName', disabled: false, type: 'input', 
      otherType: 'picker', otherLabel: '点击选择'},
      {label: '受访人姓名', disabled: false, id: 'CompanionName', disabled: true, type: 'input'},
      {label: '受访人分机', disabled: false, id: 'mobile', disabled: true, type: 'input'}
    ],
    pageList2: [
      {label: '申请作业类别', isRequired: false, id: 'app', disabled: true, type: 'input'},
      {label: '申請內容', isRequired: true, id: 'require', disabled: false,
       type: 'radio', radioList: [
              // {applytype.Name}
        {label: '高架作業', value: 'first' }, {label: '密閉作業', value: 'second'}, 
         {label: '動火作業', value: 'third'}, {label: '挖掘作業', value: 'forth'},
        {label: '吊掛作業', value: 'fifth'}, {label: '臨時用電作業', value: 'sixth'},
      ]},
      // 
      {label: '施工项目', isRequired: true, id: 'item', disabled: false, type: 'input'},
      {label: '备注说明', isRequired: false, id: 'remark', disabled: false, type: 'input'},
      {label: '施工开始日期', isRequired: true, id: 'fromdate', disabled: true, type: 'input',
       otherLabel: '点击选择', start: new Date().toLocaleString().split(' ')[0].replace(/\//g, '-')},
      {label: '施工结束日期', isRequired: true, id: 'todate', disabled: true, type: 'input',
       otherLabel: '点击选择', start: new Date().toLocaleString().split(' ')[0].replace(/\//g, '-')},
      {label: '对水电需求', isRequired: true, id: 'require2', disabled: false, type: 'radio', radioList: [
      {label: '有需求', value: 'Y'}, {label: '无需求', value: 'N'}
      ]},
      {label: '具体水电需求', isRequired: false, id: 'require1', disabled: false, type: 'input'},
      {label: '施工类型', isRequired: true, id: 'isworthy', disabled: false, type: 'radio', radioList:[
        {label: '有偿施工', value: 'Y'}, {label: '无偿施工', value: 'N'}
      ]},
    ],
    enNameList: [], //自定义picker值 测试
    isAddChecked: false,      //全选
    addCheckedPerson: [],    //点击完成后保存的人数
    addCheckPerson:[],      //多选保存的索引
    addWorkerPerson: [],   //储存施工人员
    tempAddWorkerDialogData: {}, //新增施工人员信息  待确认
    showDeleteConfirm: true,
    deleteConfirmFooter: [{ name: '取消' }, { name: '删除', color: '#ed3f14', loading: false }],
    addNewWorkerAttention: '5s',
    showAddNewWorkerAttention: false,
    uploadFileType: ['zip','7z','rar','pdf','doc','docx'],//上传文件限制类型
    isConfirm: false,
    evaluationSheetArr: [], //一般的评估表存放
    evaluationSheetID: [], // 存ID,
    evaluationSheetShow: [], //显示的
    lastFilePath: null,
    hasCheck: false,
    hasCheck2: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    http({ url: ExecutionInit }).then(res => {
      if (res.data.code === 1) {
        this.setData({
          tag: res.data.data.tag,
          //applytype1: res.data.data.applytype[1],
          data: {
            ...this.data.data,
            app: res.data.data.applytype[1].Name
          }
        })
      }
      else {
        this.showMessage(res.data.message, 'warning')
      }
    })
      .catch(err => {
        this.showMessage('请联系管理员', 'error')
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
    this.setData({
      show:true
    })
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
  accept: function (e) {
    var hasCheck2 = this.data.hasCheck2;
    if (e.detail.value == '') {
      this.setData({
        hasCheck2: false
      })
    }
    else {
      this.setData({
        hasCheck2: true
      })
    }
  },

  //下一页
  nextPage: function(e) {
    this.setData({
      isDisabled: false
    })
    
    const page = parseInt(e.currentTarget.dataset.page, 10);

    var GuestMobile = this.data.data['GuestMobile'];      //第一页必填的内容
    var FacPIC = this.data.data['FacPIC'];
    var GuestFacName = this.data.data['GuestFacName'];
    var EnName = this.data.data['EnName'];
    //console.log(GuestMobile);console.log(FacPIC);
    if(e.currentTarget.id==='next1'){
      if (!GuestMobile || !FacPIC || !GuestFacName || !EnName){
        this.showMessage('请填写完整信息', 'error');
        return
      } 
    }
    var require = this.data.data['require'];       //第二页必填的内容
    var item = this.data.data['item'];
    var fromdate = this.data.data['fromdate'];
    var todate = this.data.data['todate'];
    var isworthy = this.data.data['isworthy'];
    var require2 = this.data.data['require2'];
    if(e.currentTarget.id==='next2'){
      if (!require || !item || !fromdate || !todate || !require2||!isworthy){
        this.showMessage('请填写完整信息', 'error');
        return
      }
    }
    const addCheckedPerson = this.data.addCheckedPerson; //第三页必填内容
    if (e.currentTarget.id == 'next3') {
      if (addCheckedPerson.length === 0) {
        this.showMessage('请填写完整信息', 'error');
        return
      }
    }
    var hasCheck = this.data.hasCheck;        //第四页必填的内容
    if (e.currentTarget.id === 'next4') {
      if (hasCheck === false) {
        this.showMessage('请填写完整信息', 'error');
        return
      }
    }
    var hasCheck2 = this.data.hasCheck2;        //第5页必填的内容
    if (e.currentTarget.id === 'next5') {
      if (hasCheck2 === false) {
        this.showMessage('请阅读以上内容后勾选按钮', 'error');
        return
      }
    }
    
    this.setData({
      currentPage: page,
      ['pageAnimation' + (page-1)]: 'page-leftOut',
      ['pageAnimation' + page]: 'page-rightIn'
    })

    if (this.data.applytype.ID && this.data.evaluationSheetArr.length === 0) {
      http({url: ExecutionSheet, data: { typeid: this.data.applytype.ID }})
        .then(res => {
          const data = res.data;
          if(data.code === 1) {
            const assess = data.data.assess;
            this.setData({
              evaluationSheetArr: [...assess]
            })
          }
        })
    }
  },
  //上一页
  prePage: function(e) {
    const a = parseInt(e.currentTarget.dataset.page, 10);
    const page = a === 1 ? 2 : a + 1;
    this.setData({//设置2页面之间过渡class
      currentPage: page,
      ['pageAnimation' + (page-1)]: 'page-leftIn',
      ['pageAnimation' + page]: 'page-rightOut'
    })
  },
  //单选  保存对应单选值  对应的id_值

  radioChange: function (e) {
    const [id, value] = e.currentTarget.dataset.value.split('_');
    const temp = this.data.data;
    this.setData({
      data: {
        ...temp,
        [id]: value
      }
    })
    //console(this.data.data.require)
    //this.data.data.require 打印value的值
    
    http({ url: ExecutionInit }).then(res => {
      if (this.data.data.require === "first") {//高架
        this.setData({
          tag: res.data.data.tag,
          applytype: res.data.data.applytype[2],
          data: {
            ...this.data.data,
            applytype: res.data.data.applytype[2].Name
          },
          new:"first"
        })
      }
      else if (this.data.data.require === "second")  {//密閉
        this.setData({
          tag: res.data.data.tag,
          applytype: res.data.data.applytype[3],
          data: {
            ...this.data.data,
            applytype: res.data.data.applytype[3].Name
          },
          new:"second"
        })  
      }
      else if (this.data.data.require === "third") {//動火
        this.setData({
          tag: res.data.data.tag,
          applytype: res.data.data.applytype[4],
          data: {
            ...this.data.data,
            applytype: res.data.data.applytype[4].Name
          },
          new :"third"
        })
      }
      else if (this.data.data.require === "forth") {//挖掘
        this.setData({
          tag: res.data.data.tag,
          applytype: res.data.data.applytype[5],
          data: {
            ...this.data.data,
            applytype: res.data.data.applytype[5].Name
          },
          new:"forth"
        })
      }
      else if (this.data.data.require === "fifth") {//吊掛
        this.setData({
          tag: res.data.data.tag,
          applytype: res.data.data.applytype[6],
          data: {
            ...this.data.data,
            applytype: res.data.data.applytype[6].Name
          },
          new:"fifth"
        })
      }
      else if (this.data.data.require === "sixth") {//'臨時用電
        this.setData({
          tag: res.data.data.tag,
          applytype: res.data.data.applytype[9],
          data: {
            ...this.data.data,
            applytype: res.data.data.applytype[9].Name
          },
          new: "sixth"
        })
      }   
    })
      .catch(err => {
        this.showMessage('请联系管理员', 'error')
      })
  },
  //获取input值
  getInputValue: function(e) {
    const value = e.detail.value;
    if(e.currentTarget.id === 'GuestMobile') {
      const phoneReg = /^[1][3,5,6,7,8]\d{9}$/;
      if(!phoneReg.test(value)) {
        this.showMessage('手机号码格式不正确');
        return
      }
      this.getPhoneLogs(value);
    }
    if(e.currentTarget.id === 'EnName') {
      this.getEnNameInfo(e.detail.value)
    }
    this.setData({
      data: {
        ...this.data.data,
        [e.currentTarget.id]: value
      }
    })
  },
  getPhoneLogs: function(telephone) {
    http({url: ExecutionHistory, data: { telephone }}).then(res => {
      if(res.data.code === 1) {
        const {Name, Detail, GuestFacName} = res.data.data[0];
        let temp = [],
            arr = []
        if(Name.length) {
          Name.forEach((v,k) => {
            temp.push(v.EnName)
          })
        }
        if(Detail.length) {
          Detail.forEach((v,k) => {
            arr.push({GuestName: v.GuestName, AppIDNO: v.AppIDNO, key: k,
            checked: false,
            hideIdCard: v.AppIDNO.replace(/^(\d{6})(\d{8})(\d{3}[0-9Xx]{1})$/,'$1'+'X'.repeat(8)+'$3')})
          })
        }
        this.setData({
          enNameList: temp,
          addWorkerPerson: arr,
          data: {
            ...this.data.data,
            GuestFacName: GuestFacName
          }
        })
      }
      else {
        return 
        this.showMessage(res.data.message,'error');
      }
    })
    .catch(err => {
      this.showMessage('请联系管理员','error')
    })
  },
  //picker值获取
  enNamePickerChange: function(e) {
    let isTrue = true;
    const startDate = this.data.data['fromdate'];
    if(e.currentTarget.id === 'todate') {
      if(!startDate) {
        this.showMessage('请输入开始日期');
        return
      }
      else if (e.detail.value < startDate) {
        this.showMessage("结束时间不早于开始时间", 'error');
        return
      }
      isTrue = checkDate(startDate, e.detail.value, this.data.applytype.Days);
    }
    //具体施工+施工时间提示
    if(!isTrue) {
      this.showMessage(`施工日期区间不符合规定`, 'error');
      return;
    }
    if(e.currentTarget.id === 'EnName') {
      this.getEnNameInfo(this.data.enNameList[e.detail.value])
      this.setData({
        data: {
          ...this.data.data,
          EnName: this.data.enNameList[e.detail.value]
        }
      })
      return
    }
    this.setData({
      data: {
        ...this.data.data,
        [e.currentTarget.id]: e.detail.value
      }
    })
  },
  getEnNameInfo: function(enname) {
    http({url: IntervieweeInfo, data: { ENName: enname }})
      .then(res => {
        if(res.data.code === 1) {
          const {Companion, CompanionName, VisitDept, Extention} = res.data.data[0];
          this.setData({
            data: {
              ...this.data.data,
              Companion,
              CompanionName,
              VisitDept,
              mobile: Extention
            }
          })
        }
      })
  },
  //显示增加施工人员页面
  showAdd: function() {
    this.setData({
      addWorkerPageAnimation: 'page-downIn',
      pageAnimation3: 'page-upOut'
    })
  },
  //hide 返回
  hideAdd: function() {
    this.setData({
      addWorkerPageAnimation: 'page-downOut',
      pageAnimation3: 'page-upIn'
    })
  },
  //显示增加施工人员dialog
  showAddWorkerDialog: function() {//点击新增
    this.setData({
      showAddDialog: true,
      addWorkerDialogAnimation: 'dialog-toShow'
    })
  },
  hideAddWorkerDialog: function() {//dialog中取消新增
    this.setData({
      addWorkerDialogAnimation: 'dialog-toHide'
    });
    const timer = setTimeout(() => {
      clearTimeout(timer)
      this.setData({
        addWorkerDialogAnimation: '',
        showAddDialog: false,
        tempAddWorkerDialogData: {} //以防取消后下次直接点确定有数据
      })
    },500)
  },
  //add worker
  getAddWorkerInputName: function(e) {
    this.setData({
      tempAddWorkerDialogData: {
        ...this.data.tempAddWorkerDialogData,
        [e.currentTarget.id] : e.detail.value,
      }
    })
  },
  getAddWorkerInputIdCard: function(e) {
    this.setData({
      tempAddWorkerDialogData: {
        ...this.data.tempAddWorkerDialogData,
        [e.currentTarget.id] : e.detail.value,
      }
    })
  },
  //确认新增
  confimAddNewWorker: function() {
    const data = this.data.tempAddWorkerDialogData,
          temp = this.data.addWorkerPerson;
    const idReg = /^\d{17}[0-9Xx]{1}$/;
    if(!idReg.test(data.AppIDNO)) {
      this.showMessage('请输入正确的身份证号', 'warning');
      return
    }
    if(data.GuestName.length === 0 ) {
      this.showMessage('姓名不能为空', 'warning');
      return
    }
    const a = {
      ...data,
      key: temp.length,
      checked: false,
      hideIdCard: data.AppIDNO.replace(/^(\d{6})(\d{8})(\d{3}[0-9Xx]{1})$/,'$1'+'X'.repeat(8)+'$3')
    };
    this.setData({
      addWorkerPerson: [...temp, a],
      tempAddWorkerDialogData: {}
    })
    this.hideAddWorkerDialog();
    this.showMessage('新增成功', 'success');
    if(this.data.addWorkerPerson.length === 1) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
      },1000)
    }
  },
  //施工人员上传证件注意事项
  showAddNewWorkerAttentionDialog: function() {
    let index = 4;
    this.setData({
      showAddNewWorkerAttention: true,
      addNewWorkerAttentionAnimation: 'toShow'
    })
    const timer = setInterval(() => {
      this.setData({
        addNewWorkerAttention: `${index--}s`,
      })
      if(index === -1 ) {
        clearTimeout(timer)
        this.setData({
          addNewWorkerAttention: '确认'
        })
      }
    },1000)
  },
  hideAddNewWorkerAttentionDialog: function() {
    if(this.data.addNewWorkerAttention !== '确认') {
      return
    }
    this.setData({
      showAddNewWorkerAttention: false,
      addNewWorkerAttention: '5s'
    })
  },
  //施工人员证件
  addWorkerImg: function(e) {
    const id = e.currentTarget.dataset.id;
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths[0];
        const tempData = _this.data.addWorkerPerson;
        for (let i = 0; i < tempData.length; i++) {
          if(tempData[i].AppIDNO === id) {
            tempData[i]['tempFilePaths'] = tempFilePaths;
            break;
          }
        }
        _this.setData({
          addWorkerPerson: [...tempData]
        })
        _this.showMessage('上传成功','success');
      },
      fail (err) {
        console.log(err)
        if(err.errMsg === 'chooseImage:fail cancel') {
          _this.showMessage('取消上传','warning');
        }
        else {
          _this.showMessage('上传失败,请联系管理员','error');
        }
      }
    })
  },
  //预览
  previewWorkerImg: function(e) {
    const path = e.currentTarget.dataset.path;
    wx.previewImage({
      urls: [path],
      current: path
    })
  },
  //删除该人员已上传图片
  deleteItemWorkerImg: function(e) {
    const id = e.currentTarget.dataset.id;
    const tempData = this.data.addWorkerPerson;
    for (let i = 0; i < tempData.length; i++) {
      if(tempData[i].AppIDNO === id) {
        tempData[i]['tempFilePaths'] = '';
        break;
      }
    }
    this.setData({
      addWorkerPerson: [...tempData]
    })
    this.showMessage('删除图片成功','success');
  },
  //全选
  addWorkerAllChecked: function() {
    const tempData = this.data.addWorkerPerson,
          isAddChecked = this.data.isAddChecked;
    let temp = [];
    for (let i = 0; i < tempData.length; i++) {
      if(!isAddChecked) {
        temp.push(`${tempData[i].AppIDNO}_${tempData[i].key}`);
      }
      else {
        temp = [];
      }
      tempData[i].checked = !isAddChecked;
    }
    this.setData({
      isAddChecked: !isAddChecked,
      addWorkerPerson: [...tempData],
      addCheckPerson: [...temp]
    })
  },
  //多选
  checkboxChange: function(e) {
    const arr = e.detail.value,
          tempData = this.data.addWorkerPerson;
    let _arr = [];
    if(arr.length === tempData.length) {
      for (let j = 0; j < tempData.length; j++) {
        tempData[j].checked = true;
      }
      this.setData({
        isAddChecked: true
      })
    }
    else if (arr.length !== 0 ){
      for (let j = 0; j < tempData.length; j++) {
        tempData[j].checked = false;
      }
      for (let i = 0; i < arr.length; i++) {
        const [a,b] = arr[i].split('_');
        for (let j = 0; j < tempData.length; j++) {
          if(tempData[j].AppIDNO == a && tempData[j].key == b) {
            tempData[j].checked = true;
          }
        }
      }
      this.setData({
        isAddChecked: false
      })
    }
    else {
      for (let j = 0; j < tempData.length; j++) {
        tempData[j].checked = false;
      }
      this.setData({
        isAddChecked: false
      })
    }
    this.setData({
      addWorkerPerson: [...tempData],
      addCheckPerson: [...arr]
    })
  },
  deleteConfirm: function() {
    const arr = this.data.addCheckPerson;
    if(!arr.length) {
      this.showMessage('请选择要删除的人员');
      return
    }
    this.setData({
        showDeleteConfirm: false
    });
  },
  //删除选择
  deleteWorkerChecked: function({ detail }) {
    //if (detail.index === 0) {
   //   this.setData({
       //   showDeleteConfirm: false
     // });
   // }
    const action = [...this.data.deleteConfirmFooter];
    action[1].loading = true;
    this.setData({
        deleteConfirmFooter: action
    });
    let arr = this.data.addCheckPerson,
        tempData = this.data.addWorkerPerson,
        _arr = [];
    for (let i = 0 ; i < arr.length ; i++) {
      const [a,b] = arr[i].split('_');
      for (let j = 0; j < tempData.length; j++) {
        if(tempData[j].AppIDNO == a && tempData[j].key == b) {
          tempData.splice(j, 1);//删除数组中位置j的1个元素
        }
      }
    }
    action[1].loading = false;
    this.setData({
      addWorkerPerson: [...tempData],
      addCheckPerson: [],
      showDeleteConfirm: true,
      deleteConfirmFooter: action,
      isAddChecked: false
    })
    this.showMessage('删除成功', 'success');
  },

  deleteWorkerCancel: function() {
    const action = [...this.data.deleteConfirmFooter];
    action[1].loading = false;
    this.setData({
        deleteConfirmFooter: action,
      showDeleteConfirm: true
    });
  },

  saveCheckedWorker: function() {
    if(this.data.isConfirm) {
      return
    }
    const CheckPerson=this.data.addCheckPerson;
    if (CheckPerson.length===0){
      this.showMessage('请选择新增人员', 'error');
    }

  else{
    const workers = this.data.addWorkerPerson,
          idxs = this.data.addCheckPerson,
          _this = this;
    let temp = [],
        flag = true,
        index = 0;
    idxs.forEach((v) => {
      const [a,b] = v.split('_');
      try {
      workers.forEach( (item, index) => {
        if(item.AppIDNO == a && item.key == b) {
          const formData = {
            tag: this.data.tag,
            Frequency: [
              {GuestName: item.GuestName, AppIDNO: item.AppIDNO, GoodsName: `file_${index+1}`}
            ]
          }
          if (typeof (item.tempFilePaths) == "undefined") {
            console.log("undefined")
            throw new Error("error")
          }
          else {
            console.log("defined")
          temp.push([ExecutionAddWorker, item.tempFilePaths, `file_${index+1}`, formData, index]);
              }
            }
          })
        } catch (error) {
          console.log("catch")
          flag = false
          this.showMessage('请添加新增人员附件', 'error');
        }
      })
      console.log(flag)
      if (flag) {
    const promise = temp.map( (v, k) => uploadFile(...v))
    Promise.all(promise).then(res => {
      wx.hideLoading();
      this.setData({
        addCheckedPerson: [...workers.filter(v => v.checked)] 
      })
      _this.hideAdd();
        })
        .catch(err => {
      console.log(err);
      wx.hideLoading()
      _this.showMessage('请上传特殊岗位证件', 'error');
        })
  } }
  },
  uploadsuccess: function (e) {
    this.setData({
      isDisabled: false
    }),
    this.setData({
      lastFilePath: e.detail.path
    })
  },
  deleteFile: function(e) {
    this.setData({
      isDisabled: true
    })
    if(e.detail.code == 1) {
      this.setData({
        lastFilePath: null
      })
    }
  },
  getEvaluation: function(e) {

    var hasCheck = this.data.hasCheck;
    if (e.detail.value == '') {
      this.setData({
        hasCheck: false
      })
    }
    else {
      this.setData({
        hasCheck: true
      })
    }



    const arr = e.detail.value;
    const a = arr.map( v => {
      let b = null;
      this.data.evaluationSheetArr.forEach( item => {
        if(v === item.ID) {
          b = {...item}
        }
      })
      return b
    })
    this.setData({
      evaluationSheetID: arr,
      evaluationSheetShow: a
    })
  },


  submit: function() {
    console.log(11);
    this.setData({
      isDisabled: true
    })
     
    let str = [],
        bool = true;
    const { data, tag, lastFilePath, evaluationSheetShow, applytype } = this.data;
    const _this = this;
    if(evaluationSheetShow.length === 0 ) {
      _this.showMessage('请选择施工步骤');
      return
    }
    evaluationSheetShow.forEach( v => {
      str.push(v.ID);
    })
    const submitData = {
      ...data,
      tag,
      danger: str.toString(),
      applytype: applytype.ID
    }
    if(!this.data.lastFilePath) {
      _this.showMessage('请上传厂商资质文件');
      return
    }
    if(Object.keys(submitData).length < 12) {
      _this.showMessage('请填写完整');
      return
    }
    for (let i = 0; i < Object.keys(submitData).length; i++) {
      if(!submitData[Object.keys(submitData)[i]]) {
        bool = false;
        break;
      }
    }
   /* if(!bool) {
      _this.showMessage('请填写完整');
      return
    }*/
    uploadFile(ExecutionSubmit, lastFilePath, 'file', submitData)
      .then(res => {
     const r = JSON.parse(res.data);
        if(r.code === 1) {
           this.setData({
            isDisabled: false
           })
           
          wx.hideLoading();
           wx.redirectTo({
             url: '/pages/otherIndex/index',
         })
        }
        else {
          wx.hideLoading();
         //  _this.showMessage("成功")
           _this.showMessage(r.message)
       }
      }).catch(err => {
         wx.hideLoading()
        _this.showMessage('提交失败,请联系管理员', 'error');
      })
  },



  showMessage: function(content, type='warning', duration=3) {
    $Message({content, type, duration});
  }
})