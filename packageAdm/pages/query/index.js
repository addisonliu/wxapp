// pages/Query/query.js
var fo1 = true;
var fo2 = true;
var datebegin = null;
var dateend = null;
var meetingNumber = null;
var myid;
var app = getApp();
Page({
  data: { 
    meetingNumber:'',
    focus:true,
    year:0,
    month:0,
    date:['日','一','二','三','四','五','六'],
    dateArr:[],
    isToday:0,
    isTodayWeek:false,
    todayIndex:0,
    focusdate:false,
    btntype:'',//default
    begindate:'',
    enddate:'',

    hasEmptyGrid:false,
    cur_year:'' ,
    cur_month:'',
    inputdate:'',
    inputvalue1:'',
    inputvalue2:'',
    datebeginfrominput:'',
    dateendfrominput:'',
    myid:'',
  },
  onLoad: function (options) {
    this.setNowData(options);
  },

  input1:function(){
    fo1 = false;
    fo2 = true;
  },

  input2:function(){
    fo2 = false;
    fo1 = true;
  },

  dateSelectAction:function(e){
    var cur_day = e.currentTarget.dataset.idx;
    this.setData({
      todayIndex:cur_day,
    });
    if(fo1 === false){
      this.setData({
        inputvalue1:this.data.cur_year +"-"+this.data.cur_month+"-"+(cur_day+1)
      });
    }
    else if(fo2 === false){
      this.setData({
        inputvalue2:this.data.cur_year +"-"+this.data.cur_month+"-"+(cur_day+1)
      });
    }
  },

  setNowData:function(options){
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth()+1;
    const todayIndex = date.getDate() -1;
    const weeks_ch = ['日','一','二','三','四','五','六'];
    var json = JSON.parse(options.select_date_json);
    myid = json.myid;
    meetingNumber = json.meetingNumber;
    this.calculateEmptyGrids(cur_year,cur_month);
    this.calculateDays(cur_year,cur_month);
    this.setData({
      cur_year:cur_year,
      cur_month:cur_month,
      weeks_ch,
      todayIndex,
      meetingNumber:json.meetingNumber,
      inputvalue1:json.datebegin,
      inputvalue2:json.dateend,
      myid:myid,
    })
  },

  getThisMonthDays(year,month){
    return new Date(year,month,0).getDate();
  },

  getFirstDayofWeek(year,month){
    return new Date(Date.UTC(year,month -1,1)).getDay();
  },

  calculateEmptyGrids(year,month){
    const firstDayofWeek = this.getFirstDayofWeek(year,month);
    console.log(firstDayofWeek);
    let emptyGrids = [];
    if(firstDayofWeek > 0){
      for(let i = 0;i< firstDayofWeek;i++){
        emptyGrids.push(i);
      }
      this.setData({
        hasEmptyGrid:true,
        emptyGrids
      });
    }else{
      this.setData({
        hasEmptyGrid:false,
        emptyGrids:[]
      })
    }
    console.log(emptyGrids);
  },

  calculateDays(year,month){
    let days = [];
    const thisMonthDays = this.getThisMonthDays(year,month);
    for(let i =1; i <= thisMonthDays; i++){
      days.push(i);
    }
    this.setData({
      days
    })
  },


  handleCanlendar:function(e){
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if(handle === "prev"){
      let newMonth = cur_month -1;
      let newYear = cur_year;
      if(newMonth < 1){
        newYear = cur_year -1;
        newMonth = 12;
      }

      this.calculateDays(newYear,newMonth);
      this.calculateEmptyGrids(newYear,newMonth);
      this.dateInit(newYear,newMonth);
      this.setData({
        cur_year:newYear,
        cur_month:newMonth,
      })
    }else{
      let newMonth = cur_month +1;
      let newYear = cur_year;
      if(newMonth > 12){
        newYear = cur_year +1;
        newMonth = 1;
      }

      this.calculateDays(newYear,newMonth);
      this.calculateEmptyGrids(newYear,newMonth);
      this.dateInit(newYear,newMonth);
      this.setData({
        cur_year:newYear,
        cur_month:newMonth
      })
    }
  },

  dateInit:function(setYear,setMonth){
    //全部时间的月份都是按照0-11基准，显示月份才+1
    let dateArr = [];//需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear,setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year+','+month+','+1).getDay();  //目标月1号对应的星期
    let dayNums = new Date(year,nextMonth,0).getDate();  //获取目标月有多少天
    let obj = {};
    let num = 0;
    if(month + 1 > 11){
      nextYear = year + 1;
      dayNums = new Date(nextYear,nextMonth,0).getDate();
    }
    arrLen = startWeek + dayNums;
    
    for(let i = 0;i < arrLen; i++){
      if(i >= startWeek){
        num = i - startWeek + 1;
        obj = {
          isToday:''+year+(month+1)+num,
          dateNum:num,
          weight:5
        }
      }else{
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr:dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() +1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if(nowYear == getYear && nowMonth == getMonth){
      this.setData({
        isTodayWeek:true,
        todayIndex:nowWeek
      })
    }else{
      this.setData({
        isTodayWeek:false,
        todayIndex:-1
      })
    }
  },

  bindinput1(e){
    this.setData({
      inputvalue1:e.detail.value,
    })
  },

  bindinput2(e){
    this.setData({
      inputvalue2:e.detail.value,
    })
  },

  querybtn:function(){
    //点击查询按钮将meetingNumber datebegin dateend上传到服务器得到排程信息
    datebegin = this.data.inputvalue1;
    dateend = this.data.inputvalue2;
    var split_datebegin = datebegin.split("-");
    var split_dateend = dateend.split("-");

    if(split_datebegin[1].length == 1 && split_datebegin[2].length == 1){
      datebegin = split_datebegin[0]+"-0"+split_datebegin[1]+"-0"+split_datebegin[2];
    }else if(split_datebegin[1].length == 1){
      datebegin = split_datebegin[0]+"-0"+split_datebegin[1]+"-"+split_datebegin[2];
    }else if(split_datebegin[2].length == 1){
      datebegin = split_datebegin[0]+"-"+split_datebegin[1]+"-0"+split_datebegin[2];
    }

    if(split_dateend[1].length == 1 && split_dateend[2].length == 1){
      dateend = split_dateend[0]+"-0"+split_dateend[1]+"-0"+split_dateend[2];
    }else if(split_dateend[1].length == 1){
      dateend = split_dateend[0]+"-0"+split_dateend[1]+"-"+split_dateend[2];
    }else if(split_dateend[2].length == 1){
      dateend = split_dateend[0]+"-"+split_dateend[1]+"-0"+split_dateend[2];
    }

    if(datebegin == null || dateend == null || datebegin == '' || dateend == ''){
      wx.showToast({
        icon:'none',
        title: '日期不可为空',
      })
    }else {
      var db = new Date(datebegin);
      var de = new Date(dateend);
      if(db <= de){
        wx.request({
         url: 'https://TDDservice20.wistron.com/smartmeetingroom/GetMrInfo/schedule',
         data:{
            date1:datebegin,
            date2:dateend,
            roomid:meetingNumber,
            empno:app.globalData.userInfo
          },
          header:{'content-type': 'application/json'},
          method:'GET',
          success:function(res){
            if(res.data == null){
              wx.showToast({
                title: '无预定信息',
                icon:'none',
                duration:1000,
              }) 
            }else{
              var json = {"datebegin":datebegin,"dateend":dateend,"meetingNumber":meetingNumber,"listData":res.data,"myid":myid};
              wx.navigateTo({
                url:'../detailedMessage/index?json='+ JSON.stringify(json),
              })
            }
          },
          fail:function(){
            wx.showToast({
              title: '信息获取失败',
              icon:'none',
              duration:1000,
            }) 
          }
        });
      }else{
          wx.showToast({
          title: '日期选择错误',
          icon:'none',
          duration:1000,
        })
      }
    }
  },

})
