// pages/applicationForm/index.js
var { $Message } = require('../../../components/base/index');
var { IntervieweeInfo, HistoryVisitors, SubmitApplication, IsBlackList} = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { title: '填单人手机号', type: 'input', require: true, id:'GuestMobile',disabled:false},
      { title: '填单人姓名', type: 'input', require: true, id:'ApplyName',disabled:false},
      { title: '填单人公司名称', type: 'input', require: true, id:'GuestFacName',disabled:false},
      { title: '受访同仁英文名', type: 'input', require: true, id: 'ENName', disabled: false, placeholder: '需英文名全称', otherTitle: '选择訪客'},
      { title: '受访人名字', type: 'input', require: false, id:'CompanionName',disabled:true},
      { title: '受访人分机', type: 'input', require: false, id:'Extention',disabled:true},
      { title: '入厂事由', type: 'input', require: true, id:'Reason',disabled:false},
      { title: '预约进厂日期', type: 'date', require: true, id:'BookInDate',disabled:true,otherTitle:'选择日期'},
      { title: '预约进厂时间', type: 'time', require: true, id:'BookInTime',disabled:true,otherTitle:'选择时间'},
      { title: '预约出厂时间', type: 'time', require: true, id:'BookOutTime',disabled:true,otherTitle:'选择时间'},
      {title: '点此处新增访客信息', type: 'container', require: true, id:'visitors',disabled:false}
    ],
    data:{

    },
    checkData: [],
    addNewVisitorList:[
      { label: '访客姓名:', id:'GuestName'},
      { label: '身份证号:', id:'AppIDNO'},
      { label: '携带物品:', id:'GoodsName'},
    ],
    checkedData:[],
    selectOptions:[],
    idxs:[],
    newVisitor: {},
    showList:false,
    showModal:false,
    animation:'',
    transform:'translateX(100%)',
    show:'',
    index: 0,
    visible: false,
    actions: [
      {
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14',
        loading: false
      }
    ],
    allCheck: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },
  //input
  blur: function (e) {
    if (e.currentTarget.id === 'GuestMobile'){
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if(!phoneReg.test(e.detail.value)){
        this.showMessage('请填写正确的手机号','error',5);
        return
      }
      this.getHistoryVisitors(e.detail.value);
    }
    if (e.currentTarget.id === 'ENName' && e.detail.value){
      this.getIntervieweeInfo(e.detail.value)
    }
    this.setData({
      data: {
        ...this.data.data,
        [e.currentTarget.id]: e.detail.value
      }
    })
  },
  //日期时间
  changeData: function (e){
    this.setData({
      data:{
        ...this.data.data,
        [e.currentTarget.id]: e.detail.value
      }
    })
  },

  changeState: function (e) {
    if(this.data.showList){
      this.setData({
        animation:"Out 0.5s linear",
        showList: false,
      })
      setTimeout(() => {
        this.setData({
          showList: false,
          transform:'translateX(100%)'
        })
      }, 500)
    }
    else{
      if (!this.data.data.GuestMobile){
        this.showMessage('请先填写手机号', 'warning');
        return;
      }
      this.setData({
        showList: true,
        animation: "In 0.5s linear",
        transform: 'translateX(0)',
      })
    }
  },
  chkChange: function (e) {
    this.setData({
      idxs:e.detail.value
    })
  },
  AllCheck: function() {
    let idxs = this.data.idxs,
        checkData = this.data.checkData,
        a = [],
        allCheck = this.data.allCheck;
    if(!allCheck) {
      for (let i = 0; i < checkData.length; i++) {
        a.push('key' + checkData[i].key);
        checkData[i].checked = true;
      }
    }
    else {
      for (let i = 0; i < checkData.length; i++) {
        checkData[i].checked = false;
        a = [];
      }
    }
    this.setData({
      idxs: [...a],
      checkData: [...checkData],
      allCheck: !allCheck
    })
  },
  //修改访客携带物品
  getVisitorThings: function (e) {
    let key = e.currentTarget.id,
        temp = this.data.checkData;
    key = key.substr(key.length-1);
    for(let i = 0;i< temp.length;i++){
      temp[key].GoodsName = e.detail.value ? e.detail.value : '无';
    }
    this.setData({
      checkData:[...temp]
    })
    this.showMessage('修改成功','success')
  },
  //新增模态框
  addVisitor: function (e) {
    this.setData({
      showModal:true,
      show:'show 0.5s linear'
    })
  },
  //新增访客人员信息
  confirmAdd: function (){
    let temp = this.data.newVisitor,
        data = this.data.checkData;
    for(let key in temp){
      if (!temp[key] && key != 'GoodsName'){
        this.showMessage('请填写完整','error');
        return
      }
      if (temp['AppIDNO'].length !== 18 && temp['AppIDNO'].length !== 15 && temp['AppIDNO'].length !== 9){
        this.showMessage('请输入正确证件','warning');
        return
      }
    }
    data.push({ GuestName: temp.GuestName, AppIDNO: temp.AppIDNO, GoodsName: temp.GoodsName ? temp.GoodsName : '无', checked: false, disabled: false, key: data.length });
    this.setData({
      checkData: [...data],
    });
    this.showMessage('新增成功', 'success');
    this.hideModal();
  },
  //隐藏新增
  hideModal: function () {
    if(this.data.showModal){
      this.setData({
        show:'hidden 0.5s linear'
      })
      setTimeout(()=>{
        this.setData({
          showModal:false,
          newVisitor: {},
        })
      },500)
    }
  },
  //新增访客
  newVisitorInfo: function (e) {
    this.setData({
      newVisitor:{
        ...this.data.newVisitor,
        [e.currentTarget.id] : e.detail.value
      }
    })
  },
  //删除确认框
  showDeleteVisitor: function() {
    if(!this.data.idxs){
      this.showMessage('请选择要删除的人员','warning')
    }
    this.setData({
      visible: true
    })
  },
  isDeleteVisitor: function(e) {
    if(e.detail.index === 0 ){
      this.cancelDeleteVisitor();
      return;
    }
    let idx = JSON.parse(JSON.stringify(this.data.idxs)),
        temp = JSON.parse(JSON.stringify(this.data.checkData));
    for (let i = 0; i < idx.length; i++){
      for(let j = 0; j < temp.length-1; j++) {
        // console.log(idx[i][idx[i].length - 1], temp[j].key, idx[i][idx[i].length - 1] == temp[j].key)
        if (idx[i][idx[i].length - 1] == temp[j].key) {
          temp.splice(j, 1);
        }
      }
      // temp.splice(idx[i][idx.length-1], 1);
    }
    this.setData({
      visible: false,
      checkData: [...temp],
      idxs: []
    })
    this.showMessage('删除成功', 'success')
  },
  cancelDeleteVisitor: function() {
    this.setData({
      visible: false,
    })
  },
  //选择访客
  selectConfirm: function () {
    let arr = this.data.idxs,
        temp = this.data.checkData,
        data = [];
    for(let i = 0 ; i < arr.length;i ++ ){
      data.push(temp[arr[i].replace(/key/, '')])
    }
    this.chkIsBlackList(data);
  },
  chkIsBlackList: function (Frequency){
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });
    wx.request({
      url: IsBlackList,
      data: { Frequency, site: app.globalData.site},
      method:'POST',
      dataType:'json',
      success: (res) =>{
        if (res.data.code == 1) {
          this.setData({
            checkedData: [...Frequency]
          })
          wx.hideLoading();
          this.changeState();
        }
        else{
          this.showMessage(res.data.message,'error');
          wx.hideLoading();
        }
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      data: { ...this.data.data, ENName: this.data.selectOptions[e.detail.value] }
    });
    this.getIntervieweeInfo(this.data.selectOptions[e.detail.value]);
  },
  //受访人
  getIntervieweeInfo: function (name) {
    wx.request({
      url: IntervieweeInfo,
      data: {
        ENName:name,
        site: app.globalData.site
      },
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        if(res.data.code == 1){
          this.setData({
            data: { ...this.data.data,...res.data.data[0]}
          })
        }
        if(res.data.code == 0){
          this.showMessage(res.data.message,'error')
        }
      },
      fail: (res) => {
        this.showMessage('出现错误,请联系管理员','error')
      },
      complete: function(res) {},
    })
  },
  //历史访客
  getHistoryVisitors: function (telephone){
    telephone = telephone.length !== 0  ? telephone : this.data.data.GuestMobile;
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });
    wx.request({
      url: HistoryVisitors,
      data: {
        telephone,
        site: app.globalData.site
      },
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        if (res.data.code == 1) {
          let data = res.data.data[0].Detail;
          let temp = [];
          let array = [];
          for (let i = 0; i < data.length; i++) {
            let tempVisitor = { GuestName: data[i].GuestName, AppIDNO: data[i].AppIDNO, GoodsName: data[i].GoodsName, key: i, checked: false, disabled: false };
            temp.push(tempVisitor);
          }
          if (this.data.checkData.length === 0) {
            for (let j = 0; j < res.data.data[0].Name.length; j++) {
              array.push(res.data.data[0].Name[j].EnName);
            }
            this.setData({
              checkData: temp,
            })
          }

          this.setData({
            data: { ...this.data.data, GuestFacName: res.data.data[0].GuestFacName },
            selectOptions: array
          });
          wx.hideLoading();
        }else{
          this.setData({
            data: { ...this.data.data, GuestFacName: [] },
            selectOptions: [],
            checkData:[]
          });
          wx.hideLoading()
        }
      },
      fail: (res) => {
        this.showMessage(res.message, 'error');
        wx.hideLoading();
      },
    })
    // else{
    //   this.setData({
    //     showList: true,
    //     animation: "In 0.5s linear",
    //     transform: 'translateX(0)',
    //   })
    // }

  },
  //提交
  sendApplication: function () {
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    });
    let temp = this.data.data;
    let arr1 = Object.keys(temp);
    let arr2 = Object.keys(this.data.checkedData);
    if(arr1.length<12){
      this.showMessage('请填写完整','warning');
      wx.hideLoading();
      return
    }
    if(!arr2.length){
      this.showMessage('访客信息不能为空','warning');
      wx.hideLoading();
      return
    }
    let a = {
      Frequency: this.data.checkedData,
      site: app.globalData.site
    }
    temp['Detail'] = a;
    // console.log(temp)
    wx.request({
      url: SubmitApplication,
      data: temp,
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        if (res.data.code == 1){
          this.showMessage('提交成功','success');
          wx.hideLoading();
          wx.redirectTo({
            url: '/pages/otherIndex/index',
          })
        }
        else{
          this.showMessage(res.data.message,'error');
          wx.hideLoading();
        }
      },
      fail: (res) => {
        this.showMessage('出现错误,请联系管理员','error');
        wx.hideLoading();
      }
    })
  },

  showMessage: function (content, type='warning', duration=3){
    $Message({
      content,
      type,
      duration
    })
  }
})