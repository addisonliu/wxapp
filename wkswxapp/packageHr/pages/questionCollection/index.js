// pages/questionCollection/questionCollection.js
var util = require('../../../utils/util.js');
var time = require('../../../utils/time.js');
var api = require('../../../config/api.js');
const app = getApp();
const { $Toast } = require('../../../components/base/index');
var { $Message } = require('../../../components/base/index');
var pending = [];
var completed = [];
var global = [];
var categoryArray = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    empno: '',
    chname: '',
    subject: '',
    category: '',
    incharge: '',
    questions: '', 
    current: 'describe',    
    value: '',//api获取
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    // selectData:['宿舍','餐厅','卫生','交通车','安管中心','厂务','薪资福利','纬隆餐厅','其他'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    // categoryArray: [
    // ],
    riderCommentList: [
      {
      value: '公共事务课',
    },{
      value: '公共服务课',
    },{
      value: '公共卫生课',
    },{
      value: '安管中心',
    },{
      value: '员工关系部',
    },{
      value: '薪资管理部',
    }],
    pending:[],
    completed:[],
    global: [],
    QuesHeights: 0,
  },
  getBaseData() {
    let that = this;
    util.request(api.smartService2, { empno: app.globalData.userInfo })
    // util.request(api.smartService2, { empno: 'K17070775' })
      .then(function (res) {
        if (res.result == "success") {
          if (res.EmpList.length > 0) {
            that.setData({
              empno: res.EmpList[0].Empno,
              chname: res.EmpList[0].Chname
            })   
            console.log('后台数据获取成功');
            console.log('工号'+that.data.empno);
            console.log(res.EmpList[0].Empno);
            console.log(res.EmpList[0].Chname);
          }
          else {
        //   wx.showToast({
        //     image: '../../../static/image/err.png',
        //     title: 'ERROR',
        //   })
          console.log('數據未獲取到');
          }
        }else{
          console.log('api連接失敗');
        }
      })
  },


  getCategory(){
    let that = this;
    that.setData({
      categoryArray,
      })
    util.request(api.smartService5, { empno: app.globalData.userInfo })
      .then(function (res) {
        if (res.result == "success") {
          console.log('res:'+res);
          var obj = res.content;
          console.log('res.content////////////------------------------'+obj);
          var cont1 = JSON.parse(obj);
          console.log('cont111111.data////////////------------------------'+cont1.data);
          console.log('cont111111.data.length////////////------------------------'+cont1.data.length);
          console.log('cont111111.data[0]////////////------------------------'+cont1.data[0]);
          for(var i=0;i<cont1.data.length; i++){
            categoryArray.push({
              value: cont1.data[i]
            })
            that.setData({
              categoryArray
            })
            console.log('類別'+categoryArray);
          }
          console.log('類別----------')
        }
      })
    // wx.request({
    //   url: api.smartService5, //仅为示例，并非真实的接口地址
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success (res) {
    //     console.log('res:'+res);
    //     console.log('res.data:'+res.data);
    //     console.log('res.cost:'+res.cost);
    //     var obj = res.content;
    //   console.log('res.content////////////------------------------'+obj);
    //   }
    // })
  },


  //菜单切换
  handleChange({ detail }) {
    console.log('菜單是：'+ detail.key)
    this.setData({
      current: detail.key
    });
    if (detail.key=='describe'){
      console.log('進到describe裡');
      wx.hideLoading();
    }
    else if(detail.key == 'apply'){
      console.log('進到apply裡');
    }
  },
  bindCategoryChange: function (e) {
    console.log('问题类别选择值：', e.detail.value)
    console.log(this.data.categoryArray[e.detail.value].value);
    this.setData({
      subject: this.data.categoryArray[e.detail.value].value,
      category: this.data.categoryArray[e.detail.value].value
    })
  },
  bindChargeChange: function (e) {
    // console.log('checkboxChange e:',e);
    // let string = "riderCommentList["+e.target.dataset.index+"].selected"
    // this.setData({
    //     [string]: !this.data.riderCommentList[e.target.dataset.index].selected
    // })
    // let detailValue = this.data.riderCommentList.filter(it => it.selected).map(it => it.value)
    // this.setData({
    //   incharge: detailValue
    // })
    console.log('责任单位选择值：', e.detail.value)
    console.log(this.data.riderCommentList[e.detail.value].value);
    this.setData({
      incharge: this.data.riderCommentList[e.detail.value].value
    })
  },
  getQuestions(e) {
    console.log('问题+++'+e.detail.value);
    this.setData({
      questions: e.detail.value
     });
  },
  // 点击下拉显示框
  selectTap(){
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index:Index,
      show:!this.data.show
    });
  },
  sendApplication: function () {
    wx.showLoading({
      title: '加载中...',
      success: function () {
      }
    }); 
    console.log('点击了');
    let temp = this.data;
    // console.log('数据：'+temp);
    console.log('责任单位数据：'+ temp.incharge);
    // let s = '';
    // for (let value of temp.incharge) {
    //   if(s == '')
    //   s = s + value ;
    //   else
    //   s = s + ',' + value;
    //   console.log(s);
    // }
    let info = { 
      // site: app.globalData.site, 
      applyid: temp.empno,
      applyname: temp.chname, 
      subject: temp.subject,
      category: temp.category,
      incharge: temp.incharge,
      questions: temp.questions,
      timestamp: Date.parse(new Date())
    };

    console.log(info);
    if (this.data.category == '') {
      wx.hideLoading();
      // $Toast({
      wx.showToast({
        title: '请选择问题类别',
        mask: false,
        icon: 'none',
        type: 'warning'
      });
    }
    else if (this.data.incharge == '') {
      wx.hideLoading();
      // $Toast({
      wx.showToast({
        title: '请选择责任单位',
        mask: false,
        icon: 'none',
        type: 'warning'
      });
    }
    else if (this.data.questions == '') {
      wx.hideLoading();
      // $Toast({
      wx.showToast({
        title: '问题内容不能为空',
        mask: false,
        icon: 'none',
        type: 'warning'
      });
    }
    else {
      let that = this;
      console.log(info);
      util.request(api.smartService3, info,"POST")
     // { uid: app.globalData.userInfo, timestamp: Date.parse(new Date()), 
      // util.request(api.smartService3, { uid:app.globalData.userInfo, timestamp: Date.parse(new Date()),   name:this.data.chname,subject:this.data.subject,category: this.data.category,in_charge: this.data.in_charge,question: this.data.question })
      .then(function (res) {
        console.log('res:-------------------'+res.message);
        console.log('res:'+res.result);
        if (res.result == 'success') {
          wx.hideLoading();
          console.log('00000000000');
          wx.showToast({
            image: '../../../static/image/success.png',
            title: '提交成功',
          });
          that.setData({
            subject: '',
            category: '',
            incharge: '',
            questions: '',
            // riderCommentList: [{
            //   value: '公共事务课',
            //   selected: false ,
            //   title: '公共事务课'
            // },{
            //   value: '公共服务课',
            //   selected: false ,
            //   title: '公共服务课'
            // },{
            //   value: '公共卫生课',
            //   selected: false ,
            //   title: '公共卫生课'
            // },{
            //   value: '安管中心',
            //   selected: false ,
            //   title: '安管中心'
            // },{
            //   value: '员工关系部',
            //   selected: false ,
            //   title: '员工关系部'
            // },{
            //   value: '薪资管理部',
            //   selected: false ,
            //   title: '薪资管理部'
            // }],
          });
          console.log('輸入的questions是：'+that.data.questions);          
        }
        else {
          wx.hideLoading();
          console.log('submitFail');
          wx.showToast({
            title: '提交失败',
            image: '../../../static/image/fail.png',
            duration: 2000
          })
        }
      });
    }
  },

  // getQuestionsList() {
  getQuestionsList: function () {
    let that = this;
    // util.request(api.smartService4, { empno: app.globalData.userInfo ,timestamp: Date.parse(new Date())})

    



    util.request(api.smartService4, { uid: app.globalData.userInfo })
      .then(function (res) {
        console.log('問題列表數據：'+res)
        var obj = res.content;
        console.log('res.content------------------------'+obj);
        var cont1 = JSON.parse(obj);
        console.log('cont1------------------------'+cont1);
        console.log('cont1.cost------------------------'+cont1.cost);
        console.log('cont1.data.length------------------------'+cont1.data.length);

        pending.splice(0,pending.length);
        completed.splice(0,completed.length);
        that.setData({
          pending,
          completed
        })
        console.log('pending的數據是：'+pending);



        // var QueReply = '';
        // var QueState = '';
        // var QueTime = '';


        for(var i =0;i<cont1.data.length;i++){
          console.log('cont1.data'+i+'=========='+cont1.data[i].id+','+cont1.data[i].uid+','+cont1.data[i].name+','+cont1.data[i].subject+',',cont1.data[i].in_charge+',',cont1.data[i].state+',',cont1.data[i].time);

          if(cont1.data[i].state == 'pending'){
            cont1.data[i].time = time.formatTime(cont1.data[i].time,'Y/M/D');

            // QueReply = cont1.data[i].reply;
            // QueState = cont1.data[i].state;
            // QueTime = cont1.data[i].time;

            pending.push({
              id: cont1.data[i].id,
              uid: cont1.data[i].uid,
              name: cont1.data[i].name,
              subject: cont1.data[i].subject,
              in_charge: cont1.data[i].in_charge,
              question: cont1.data[i].question,
              // reply: QueReply,
              // state: QueState,
              // time: QueTime

              reply: cont1.data[i].reply,
              state: cont1.data[i].state,
              time: cont1.data[i].time
            })
            that.setData({
              pending,
            })
            that.setData({
              toView: 'pending-'+(pending.length - 1)
            });
          }else{
            cont1.data[i].time = time.formatTime(cont1.data[i].time,'Y/M/D');
            completed.push({
              id: cont1.data[i].id,
              uid: cont1.data[i].uid,
              name: cont1.data[i].name,
              subject: cont1.data[i].subject,
              in_charge: cont1.data[i].in_charge,
              question: cont1.data[i].question,
              reply: cont1.data[i].reply,
              state: cont1.data[i].state,
              time: cont1.data[i].time
            })
            that.setData({
              completed,
            })
            that.setData({
              toView: 'completed-'+(completed.length - 1)
            });
          }


          cont1.data[i].time = time.formatTime(cont1.data[i].time,'Y/M/D');
          console.log('time:'+cont1.data[0].time);
          global.push({
              id: cont1.data[i].id,
              uid: cont1.data[i].uid,
              name: cont1.data[i].name,
              subject: cont1.data[i].subject,
              in_charge: cont1.data[i].in_charge,
              question: cont1.data[i].question,
              reply: cont1.data[i].reply,
              state: cont1.data[i].state,
              time: cont1.data[i].time
            })
            that.setData({
              global,
            })
            that.setData({
              toView: 'global-'+(global.length - 1)
            });
          console.log('User为：'+ global.uid);
          // cont1.data[i].time = util.js_date_time(cont1.data[i].time);
         // cont1.data[i].time = time.formatTime(cont1.data[i].time,'Y/M/D'); 
        }

        if (res.result == "success") {
         console.log('api連接成功'+cont1.data.id);
        }else{
         console.log('api連接失敗');
        }
      })
  },
    //点击最外层列表展开收起
    listTap(e) {
      console.log('触发了最外层');
      let Index = e.currentTarget.dataset.parentindex,//获取点击的下标值
      pending = this.data.pending;
      pending[Index].show = !pending[Index].show || false;//变换其打开、关闭的状态
      if (pending[Index].show) {//如果点击后是展开状态，则让其他已经展开的列表变为收起状态
        this.packUp(pending, Index);
        
        wx.getSystemInfo({
          success: res => {
            //console.log(res)
            //获取文字高度rpx
            let height = res.screenHeight-160
            //文字高度 
            console.log(height) ;
            pending[Index].height = height;
            pending[Index].height0 = height-45;
            console.log(pending[Index]);
            }, 
        });
      }
      else{
        pending[Index].height = 45;
        pending[Index].height0 = 0;
      }
      this.setData({
        pending
      });
    },
    //点击里面的子列表展开收起
    listItemTap(e) {
      let parentindex = e.currentTarget.dataset.parentindex,//点击的内层所在的最外层列表下标
        Index = e.currentTarget.dataset.index,//点击的内层下标
        pending = this.data.pending;
      console.log(pending[parentindex].item, Index);
      pending[parentindex].item[Index].show = !pending[parentindex].item[Index].show || false;//变换其打开、关闭的状态
      if (pending[parentindex].item[Index].show) {//如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
        for (let i = 0, len = pending[parentindex].item.length; i < len; i++) {
          if (i != Index) {
            pending[parentindex].item[i].show = false;
          }
        }
      }
      this.setData({ pending });
    },



      //点击最外层列表展开收起
    listTap2(e) {
      console.log('触发了最外层');
      let Index = e.currentTarget.dataset.parentindex,//获取点击的下标值
      completed = this.data.completed;
      completed[Index].show = !completed[Index].show || false;//变换其打开、关闭的状态
      if (completed[Index].show) {//如果点击后是展开状态，则让其他已经展开的列表变为收起状态
        this.packUp(completed, Index);
        
        wx.getSystemInfo({
          success: res => {
            //console.log(res)
            //获取文字高度rpx
            let height = res.screenHeight-160
            //文字高度 
            console.log(height) ;
            completed[Index].height = height;
            completed[Index].height0 = height-45;
            console.log(completed[Index]);
            }, 
        });
      }
      else{
        completed[Index].height = 45;
        completed[Index].height0 = 0;
      }
      this.setData({
        completed
      });
    },
    //点击里面的子列表展开收起
    listItemTap2(e) {
      let parentindex = e.currentTarget.dataset.parentindex,//点击的内层所在的最外层列表下标
        Index = e.currentTarget.dataset.index,//点击的内层下标
        completed = this.data.completed;
      console.log(completed[parentindex].item, Index);
      completed[parentindex].item[Index].show = !completed[parentindex].item[Index].show || false;//变换其打开、关闭的状态
      if (completed[parentindex].item[Index].show) {//如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
        for (let i = 0, len = completed[parentindex].item.length; i < len; i++) {
          if (i != Index) {
            completed[parentindex].item[i].show = false;
          }
        }
      }
      this.setData({ completed });
    },








    //让所有的展开项，都变为收起
    packUp(data, index) {
      for (let i = 0, len = data.length; i < len; i++) {//其他最外层列表变为关闭状态
        if (index != i) {
          data[i].show = false;
          data[i].height = 45;
          data[i].height0 = 0;
          // for (let j = 0; j < data[i].item.length; j++) {//其他所有内层也为关闭状态
          //   data[i].item[j].show = false;
          // }
        }
      }
    },
    /**
       * 滑动切换tab
       */
    
    bindChange: function (e) {
      var that = this;
      that.setData({ currentTab: e.detail.current });
      //console.log(e.detail.current);
      if (that.data.OvertimeDetail.length == 0 && e.detail.current==1)
      {
        wx.showModal({
            content: '加載中',
            showCancel: false
          });
      }
    },
    /**
     * 点击tab切换
     */
    swichNav: function (e) {
      console.log('tab切换====='+e.target.dataset.current);
      var that = this;
  
      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.target.dataset.current
        })
      }
    },  
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      userchname: app.globalData.userchname
    });
    this.getCategory();
    this.getBaseData();
    this.getQuestionsList();
    // this.getlistDatat();
    
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
    this.getlistDatat();
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
