// pages/homepage/index.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var http = require('../../services/http.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['常用', '人资', '行政', '生活'],
    currentTab: 0,
    navArr: [],
    winHeight:'',
  },
  // 导航列表
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  bindChange:function(e){
    var current = e.detail.current
    this.setData({
      currentTab: current
    })
  },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  var that = this;
  wx.showLoading({
    title: '加载中...',
    success: function () {
      wx.hideLoading();
    }
  });
  wx.getSystemInfo({
    success: function (res) {
      console.log(res.windowHeight)
      that.setData({
        winHeight: res.windowHeight-40 //这是减去tab导航的高度
      });
    }
  });
  this.getnavlist();
},

 //获取首页导航列表
 getnavlist: function () {
  let that = this;
  let site = app.globalData.site;
  // console.log(site)
  util.request(api.NavList, {
    accountID: app.globalData.userInfo,
    site:app.globalData.site
  }).then(function (res) {
    if (res.result == "success") {
      if (app.globalData.isvalid == "Y") {//如果用户是在职 全部显示
        if (site !== "WMY") { //如果site 不是马来西亚的 正常显示
          var navlist = res.details;
          var navIsValid = ['N', 'NULL'];
          let firstnav = navlist.filter(val => !navIsValid.includes(val.isValid)); //去除isValid: N  或是 NULL 
          var ieobj = {};
          var newNav = [];
          firstnav.map((item) => {
            if (item.itemKey !== "22") {
              newNav.push(item)
            }
            return newNav
          });
          console.log(newNav)

          var newTypes = {}; //将导航列表根据type分离成四部分： common HR ADM life 
          for (let i in newNav) {
            let Types = newNav[i].types
            if (newTypes[Types] == undefined) {
              newTypes[Types] = [newNav[i]]
            } else {
              newTypes[Types].push(newNav[i])
            }
          }
          // console.log(newTypes)
          that.setData({
            navArr: newTypes
          })
        } //针对马来西亚用户只显示停线通知单 
        else {
          var navlist = res.details;
          var newNav = [];
          navlist.map((item) => {
            if (item.itemKey == "22") {
              newNav.push(item)
            }
            return newNav
          });
          var newTypes = {}; //将导航列表根据type分离成四部分： common HR ADM life 
          for (let i in newNav) {
            let Types = newNav[i].types
            if (newTypes[Types] == undefined) {
              newTypes[Types] = [newNav[i]]
            } else {
              newTypes[Types].push(newNav[i])
            }
          }
          // console.log(newTypes)
          that.setData({
            navArr: newTypes
          })
        }
      } else {//离职人员只可以看见离职导航
        var navlist = res.details;
        var newNav = [];
        navlist.map((item) => {
          if (item.itemKey == "11") {
            newNav.push(item)
          }
          return newNav
        });
        var newTypes = {}; //将导航列表根据type分离成四部分： common HR ADM life 
        for (let i in newNav) {
          let Types = newNav[i].types
          if (newTypes[Types] == undefined) {
            newTypes[Types] = [newNav[i]]
          } else {
            newTypes[Types].push(newNav[i])
          }
        }
        // console.log(newTypes)
        that.setData({
          navArr: newTypes
        })

      }
    } else {
      wx.hideLoading();
    }
  })
},


//删除常用项
deleteNav: function (e) {
  var that = this;
  wx.showModal({
    title: '提示',
    content: '确定将此功能移出常用吗?',
    success: function (res) {
      if (res.confirm) {
        util.request(api.DelNavList, {
          accountID: app.globalData.userInfo,
          itemKey: e.currentTarget.dataset.itemkey
        }).then(function (res) {
          if (res.result == "success") {
            let newArr = []
            that.data.navArr.common.map((item) => {
              if (item.itemKey !== e.currentTarget.dataset.itemkey) {
                newArr.push(item);
              }
              return newArr;
            })
            console.log(newArr)
            that.setData({
              "navArr.common": newArr
            })
          } else {
            wx.showToast({
              title: '删除失败',
            })
          }
        })
      } else
      if (res.cancel) {
        return false;
      }
    }
  })
},
//人资页添加
addNav1: function (e) {
  var that = this;
  let flag = false;
  that.data.navArr.common.map((item) => {
    if (item.itemKey == e.currentTarget.dataset.itemkey) {
      flag = true;
    }
  })
  if (flag) {
    wx.showToast({
      title: '已添加到常用，请勿重复添加',
      icon: 'none',
      duration: 1500
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '确定添加到常用',
      success: function (res) {
        if (res.confirm) {
          util.request(api.AddNavList, {
            accountID: app.globalData.userInfo,
            itemKey: e.currentTarget.dataset.itemkey
          }).then(function (res) {
            let addNavlist=[];
            that.data.navArr.HR.map((item) => {
              if (item.itemKey == e.currentTarget.dataset.itemkey) {
                addNavlist.push(item)
              }
              return addNavlist;
            })
            that.setData({
              "navArr.common": that.data.navArr.common.concat(addNavlist)
            })
          })
        } else
        if (res.cancel) {
          return false;
        }
      }
    })
  }
},
//行政页添加
addNav2: function (e) {
  var that = this;
  let flag = false;
  that.data.navArr.common.map((item) => {
    if (item.itemKey == e.currentTarget.dataset.itemkey) {
      flag = true;
    }
  })
  if (flag) {
    wx.showToast({
      title: '已添加到常用，请勿重复添加',
      icon: 'none',
      duration: 1500
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '确定添加到常用',
      success: function (res) {
        if (res.confirm) {
          util.request(api.AddNavList, {
            accountID: app.globalData.userInfo,
            itemKey: e.currentTarget.dataset.itemkey
          }).then(function (res) {
            let addNavlist=[];
            that.data.navArr.ADM.map((item) => {
              if (item.itemKey == e.currentTarget.dataset.itemkey) {
                addNavlist.push(item)
              }
              return addNavlist;
            })
            that.setData({
              "navArr.common": that.data.navArr.common.concat(addNavlist)
            })
          })
        } else
        if (res.cancel) {
          return false;
        }
      }
    })
  }
},
//生活页添加
addNav3: function (e) {
  var that = this;
  let flag = false;
  that.data.navArr.common.map((item) => {
    if (item.itemKey == e.currentTarget.dataset.itemkey) {
      flag = true;
    }
  })
  if (flag) {
    wx.showToast({
      title: '已添加到常用，请勿重复添加',
      icon: 'none',
      duration: 1500
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '确定添加到常用',
      success: function (res) {
        if (res.confirm) {
          util.request(api.AddNavList, {
            accountID: app.globalData.userInfo,
            itemKey: e.currentTarget.dataset.itemkey
          }).then(function (res) {
            let addNavlist=[];
            that.data.navArr.life.map((item) => {
              if (item.itemKey == e.currentTarget.dataset.itemkey) {
                addNavlist.push(item)
              }
              return addNavlist;
            })
            that.setData({
              "navArr.common": that.data.navArr.common.concat(addNavlist)
            })
          })
        } else
        if (res.cancel) {
          return false;
        }
      }
    })
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