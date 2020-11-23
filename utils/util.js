var api = require('../config/api.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTimes = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTimess = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('') +  [hour, minute, second].map(formatNumber).join('')
}

const formatTimesss = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  // const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('') +  [hour, minute].map(formatNumber).join('')
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 封封微信的的request
 */

function request(url, data = {}, method = "GET") {
  var pages = getCurrentPages()
  var current = pages[pages.length - 1].route
  // console.log(current)
  // console.log(data);
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      dataType: 'json',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'wxappkey': wx.getStorageSync('token'),
        // 'currentpage': current//获取当前页面的对象
      },
      success: function (res) {
        //console.log("success");
        if (res.statusCode == 200) {
          if (res.data.errno == 401) {
            wx.hideLoading();
            //需要登录后才可以操作
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
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
    console.log(data);
  });
}

function requests(url, data = {}, method = "POST") {
  var pages = getCurrentPages()
  var current = pages[pages.length - 1].route
  // console.log(current)
  // console.log(data);
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      dataType: 'json',
      header: {
        'Content-Type': 'application/json;charset=utf-8',
        'wxappkey': wx.getStorageSync('token'),
        // 'currentpage': current//获取当前页面的对象
      },
      success: function (res) {
        //console.log("success");

        if (res.statusCode == 200) {


          if (res.data.errno == 401) {
            wx.hideLoading();
            //需要登录后才可以操作
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
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
    console.log(data);
  });
}
module.exports = {
  formatTime,//2020-09-24 9:57:09
  formatTimes,// 2020-09-24 9:57:09
  formatDate,//2020-09-24
  request,//GET
  requests,//POST
  formatTimess,//2020092495709
  formatTimesss,
}