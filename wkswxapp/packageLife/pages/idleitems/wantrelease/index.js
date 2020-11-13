var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUpload: true,
    PublisherEmpNo: 'K20085910',
    index: '',
    index2: '',
    CategoryID: '',
    CategoryName: '',
    Title: '',
    NewDegree: '',
    Price: '',
    GoodsDesc: '',
    GoodsPlace: '',
    SalePlace: '',
    PublisherName: '',
    Tel: '',
    PublishTime: '',
    imgs: [], //本地图片
    PicPath: '', //网络图片
    formData: '',
    // 物品分类
    classify: [{
        "CategoryID": "C1",
        "CategoryName": "交通工具（电动车/自行车/摩托车）",
        "IsValid": "Y"
      },
      {
        "CategoryID": "C2",
        "CategoryName": "电子产品（电脑/手机/数码配件）",
        "IsValid": "Y"
      },
      {
        "CategoryID": "C3",
        "CategoryName": "生活用品（服装/鞋帽/箱包/日用品）",
        "IsValid": "Y"
      },
      {
        "CategoryID": "C4",
        "CategoryName": "家电家具（空调/冰箱/洗衣机/茶几沙发）",
        "IsValid": "Y"
      },
      {
        "CategoryID": "C4",
        "CategoryName": "文体乐器（健身类/乐器/书籍/音像）",
        "IsValid": "Y"
      },
    ],
    indexClassify: '',
    // 新旧程度
    degree: [{
        "degreecode": "0",
        "degreemes": "9成新"
      },
      {
        "degreecode": "1",
        "degreemes": "8成新"
      },
      {
        "degreecode": "2",
        "degreemes": "7成新"
      },
      {
        "degreecode": "3",
        "degreemes": "6成新"
      },
      {
        "degreecode": "4",
        "degreemes": "5成新"
      },
      {
        "degreecode": "5",
        "degreemes": "4成新"
      },
      {
        "degreecode": "6",
        "degreemes": "3成新"
      },
      {
        "degreecode": "7",
        "degreemes": "2成新"
      },
      {
        "degreecode": "8",
        "degreemes": "1成新"
      }

    ],
    info: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatTimes(new Date());
    this.setData({
      PublishTime: DATE
    });
    // let that = this;
    // util.request(api.searchGoods, {
    //   userNo: app.app.globalData.userInfo
    // }).then(function (res) {
    //   if (res.result == "success") {
    //     that.setData({
    //       idleGoodslist: res.data.details
    //     })
    //   } else {
    //     wx.hideLoading()
    //   }
    // })

  },
  // 分类栏
  bindchangeClassfiy: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  //自动获得输入框内容
  bindKeyInput: function (e) {
    // console.log('input发送选择改变，携带值为', e.detail.value)
    this.setData({
      Title: e.detail.value
    })
  },
  bindchangeDegree: function (e) {
    // console.log('input发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindchangeInput: function (e) {
    // console.log('input发送选择改变，携带值为', e.detail.value)
    this.setData({
      NewDegree: e.detail.value
    })
  },
  bindInputPrice: function (e) {
    // console.log('input发送选择改变，携带值为', e.detail.value)
    this.setData({
      Price: parseInt(e.detail.value)
    })
  },
  bindInputDescribe: function (e) {
    // console.log('textarea发送选择改变，携带值为', e.detail.value)
    this.setData({
      GoodsDesc: e.detail.value
    })
  },
  bindInputAddress: function (e) {
    // console.log('input发送选择改变，携带值为', e.detail.value)
    this.setData({
      GoodsPlace: e.detail.value
    })
  },
  bindInputSell: function (e) {
    // console.log('input发送选择改变，携带值为', e.detail.value)
    this.setData({
      SalePlace: e.detail.value
    })
  },
  bindInputSeller: function (e) {
    // console.log('input发送选择改变，携带值为', e.detail.value)
    this.setData({
      PublisherName: e.detail.value
    })
  },
  bindInputTel: function (e) {
    // console.log('input发送选择改变，携带值为', e.detail.value)
    if (!/^1[3456789]\d{9}$/.test(e.detail.value)) {
      wx.showToast({
        title: '联系人电话格式错误',
        icon: 'none',
      });
      return;
    }
    this.setData({
      Tel: e.detail.value
    })
  },
  deletePic: function (e) {
    var worksImgs = this.data.imgs;
    console.log(worksImgs)
    var itemIndex = e.currentTarget.dataset.index;
    worksImgs.splice(itemIndex, 1);
    this.setData({
      imgs: worksImgs
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //添加上传图片
  chooseImageTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgs = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 5) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        that.setData({
          imgs: imgs,
        });
      }
    })
  },
  //上传服务器
  uploadimgs: function () {
    var that = this;
    var index = that.data.index;
    // let PicPath = PicPath.toString(imgs);
    // PicPath = PicPath.subString(1,PicPath.length()-1)
    let info = {
      CategoryID: that.data.classify[index].CategoryID,
      CategoryName: that.data.classify[index].CategoryName,
      Title: that.data.Title,
      PublisherEmpNo: that.data.PublisherEmpNo,
      PublisherName: that.data.PublisherName,
      PublishTime: that.data.PublishTime,
      NewDegree: that.data.NewDegree,
      Price: that.data.Price,
      GoodsDesc: that.data.GoodsDesc,
      GoodsPlace: that.data.GoodsPlace,
      SalePlace: that.data.SalePlace,
      Tel: that.data.Tel,
    };
    console.log(info)
    if (info.CategoryID == '') {
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请选择类别',
      })
    } else if (info.Title == '') {
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请输入标题',
      })
    } else if (info.NewDegree == '') {

      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请选择新旧',
      })
    } else if (info.Price == '') {
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请输入价格',
      })
    } else if (info.GoodsDesc == '') {
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请填写物品描述',
      })
    } else if (info.PicPath == '') {
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请上传图片',
      })
    } else if (info.GoodsPlace == '') {
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请输入所在地点',
      })
    } else if (info.PicPath == '') {
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请输入交易地点',
      })
    } else if (info.SalePlace == '') {
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请输入联系人',
      })
    } else if (info.Tel == '') {
      wx.showToast({
        image: '../../../static/image/err.png',
        title: '请输入电话号码',
      })
    } else {
      for (var i = 0; i < that.data.imgs.length; i++) {
        var imgURL = that.data.imgs;
        console.log(imgURL)
        var time = util.formatTimess(new Date())
        var CategoryID = that.data.classify[index].CategoryID;
        var categoryName = that.data.classify[index].CategoryName;
        var title = that.data.Title;
        var publisherEmpNo = that.data.PublisherEmpNo;
        var publisherName = that.data.PublisherName;
        var publishTime = that.data.PublishTime;
        var newDegree = that.data.NewDegree;
        var price = that.data.Price;
        var goodsDesc = that.data.GoodsDesc;
        var goodsPlace = that.data.GoodsPlace;
        var salePlace = that.data.Price;
        var tel =that.data.Tel;
        wx.uploadFile({
          filePath: imgURL[i],
          name: 'file',
          url: api.upload,
          header: {
            "Content-Type": "multipart/form-data;charset=utf-8",
            'accept': 'application/json',
            // 'pictureName': 'k20085910' + '_' + time + '_' + (i + 1),
            // 'categoryID': CategoryID,
            // 'categoryName': categoryName,
            // 'title': title,
            // 'publisherEmpNo': publisherEmpNo,
            // 'publisherName': publisherName,
            // 'publishTime': publishTime,
            // 'newDegree': newDegree,
            // 'price': price,
            // 'goodsDesc': goodsDesc,
            // 'goodsPlace': goodsPlace,
            // 'salePlace': salePlace,
            // 'tel': tel,
          },
          formData: {
            'categoryID': CategoryID,
            'categoryName': categoryName,
            'pictureName': 'k20085910' + '_' + time + '_' + (i + 1),
            'title': title,
            'publisherEmpNo': publisherEmpNo,
            'publisherName': publisherName,
            'publishTime': publishTime,
            'newDegree': newDegree,
            'price': price,
            'goodsDesc': goodsDesc,
            'goodsPlace': goodsPlace,
            'salePlace': salePlace,
            'tel': tel,
          },
          success: function (res) {
            console.log(i)
            wx.hideLoading({
              success: (res) => {},
            })
            console.log("返回的参数信息" + res.data)
            if (res.statusCode != 200) { 
              wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
              })
              return;
             }else{
             wx.showToast({
               title: '成功上传',
             });
             wx.navigateTo({
               url: '/packageLife/pages/idleitems/index/index',
             })
             }
           
          },
          fail: function (res) {
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
            })
          }
        })
      }
     
    }
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