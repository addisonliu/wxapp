// packageAdm/pages/create_QR/create_QR.js
const w = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / w;

//300rpx 在6s上为150px
const qrcode_w = 300/rate;
var QRCode = require("../../../utils/weapp-qrcode.js");
var app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    var qrcode = new QRCode('canvas',{
      text:app.globalData.userInfo,
      width:270,
      height:270,
      colorDark:"black",
      colorLight:"white",
      correctLevel:QRCode.CorrectLevel.H,
    });
  },
})