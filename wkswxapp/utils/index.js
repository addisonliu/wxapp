var app = getApp();
/**
 * 验证时间区间
 * @param  {[string]} a   起始
 * @param  {[string]} b   结束
 * @param  {[number]} day 限制天数
 * @return {[boolean]}     是否符合
 */
const checkDate = (a,b, day) => {
  const A = new Date(a);
  const B = new Date(b);
  const from = A.getTime();
  const to = B.getTime()
  const limit = 1000*60*60*24*day;
  return (B-A) <= limit
}
/**
 * 普通请求
 * @param  {[string]} options.method: 'GET'         [请求方法，默认get]
 * @param  {[string]} options.url     [请求地址]
 * @param  {[string]} options.data    [数据]
 * @param  {[object]} options.header  [请求头]
 * @return {[promise]}                 [description]
 */
const http = ({method='GET', url, data={}, header={}}) => {
	return new Promise(((resolve, reject) => {
			if(Object.prototype.toString.call(header).slice(-7,-1).toLowerCase() !== 'object') {
				reject('header不是object')
			}
	    wx.showLoading({
	      title: '加载中...',
	      success: function () {
	      }
	    });
		wx.request({
			method,
			url,
			data: {
				site: app.globalData.site ? app.globalData.site: 'WKS',
				...data
			},
			dataType: 'json',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...header
			},
			success: function(res) {
				resolve(res)
			},
			fail: function(err) {
				reject(err)
				console.log(err);
			},
			complete: function() {
				wx.hideLoading()
			}
		})
	}))
}

/**
 * 上传文件
 * @param  {[string]} options.url      [上传地址]
 * @param  {[string]} options.filePath [文件临时储存路径]
 * @param  {String} options.name     [文件key]
 * @param  {[object]} options.formData [formdata其他数据]
 * @return {[promise]}                  [description]
 */
const uploadFile = (url, filePath, name='file', formData={}, index) => {
	return new Promise((resolve, reject) => {
	wx.showLoading({
      title: index ? `正在上传第${index+1}个` : '正在加载中...',
      success: function () {
      }
    });
    if(!filePath) {
    	wx.hideLoading();
    	reject();
    }
    formData = {
    	...formData,
			site: app.globalData.site ? app.globalData.site: 'WKS',
    }
		wx.uploadFile({
			url,
			filePath,
			name,
			formData: {
				data: JSON.stringify(formData)
			},
			success: function(res) {
				resolve(res)
			},
			fail: function(err) {
				reject(err);
				console.log(err)
			}
		})
	})
}

module.exports = {
	checkDate,
	http,
	uploadFile
}