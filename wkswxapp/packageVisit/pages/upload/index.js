// pages/upload/index.js
const default_data = {
    visible: false,
    content: '',
    duration: 2,
    type: 'default', // default || success || warning || error
    messages: '上传文件通过使用聊天窗口选取文件,请保证文件小于8M并且文件格式正确',
    tipsColor: '#36f',
    MESSAGE: {
      type: { 1: '请选择正确的文件格式', 2: '请注意文件类型',
        3: '请选择类型在提示内的文件', 4: '请注意上传文件类型'},
      limit: { 1: '选择文件大小超出限制', 2: '请注意文件大小',
        3: '请选择大小在范围内的文件', 4: '请注意上传文件大小'},
    },
    filename: '',
    file_type: '',
    POWER_LIMIT: {
      type: 0,
      limit: 0
    },
    file_size: '',
    currentFiles: [],
};
let timmer = null;
Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      switch (this.data.sourceType.toUpperCase()) {
        case 'FILE':
          return this.setData({ messages: '上传文件通过使用聊天窗口选取文件,请保证文件小于8M并且文件格式正确' });
        case "IMAGE":
          return this.setData({ messages: '该功能正在开发' });
        case "VIDEO":
          return this.setData({ messages: '该功能正在开发' });
        default:
          return
      }
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    sourceType: { //文件类型
      type: String,
      value: ''
    },
    files: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal, changedP) {
          this.setData({
              currentFiles: newVal
          })
      }
    },
    uploadFileType: {
      type: Array,
      value: []
    },
    messages: {
      type: String,
      value: '',
      observer: function(newVal, oldVal, changedP) { //newVal 新 oldVal 旧 changedP  订阅的类型messages
        this.setData({
          messages: newVal
        })
      }
    },
    readType: { //文件读取方式
      type: String,
      value: 'base64'
    },
    otherClass: { //容器样式
      type: String,
      value: ''
    },
    otherStyle: { //行内样式
      type: Object,
      value: {}
    },
    upload: {
      type: Function,
      value: null
    },
    maxCount: { //文件上传最大数
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ...default_data,
    currentFiles: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleShow (options) {
        const { type = 'default', duration = 2 } = options;
        this.setData({
            ...options,
            type,
            duration,
            visible: true
        });
        const d = this.data.duration * 1000;
        if (timmer) clearTimeout(timmer);
        if (d !== 0) {
            timmer = setTimeout(() => {
                this.handleHide();
                timmer = null;
            }, d);
        }
    },
    handleHide () {
        this.setData({
            ...default_data
        });
    },
    showMessage: function(obj) {
      const temp = this.data.MESSAGE,
            _this = this;
      switch (obj.index) {
        case 1:
          return this.handleShow({content:temp[obj.type][1], type: 'warning', duration: 5 });
        case 2:
          return this.handleShow({content:temp[obj.type][2], type: 'warning', duration: 5 });
        case 3:
          return this.handleShow({content:temp[obj.type][3], type: 'error', duration: 5 });
        case 4:
          return this.handleShow({content:temp[obj.type][4], type: 'error', duration: 5 });s
        default:
            if(obj.index) return this.handleShow({content:temp[obj.type][1], type: 'error', duration: 3 });
            return this.handleShow({content:obj[0], type: obj[1], duration: obj[2]});
      }
    },
    chooseMethod: function(e) {
      switch (this.data.sourceType.toUpperCase()) {
        case 'FILE':
          return this.getFile();
        case "IMAGE":
          return this.getImage();
        case "VIDEO":
          return this.getVideo();
        default:
          return
      }
    },
    //chooseMessageFile
    getFile: function(e) {
      let _this = this;
      wx.showLoading({
        title: '读取中'
      })
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success: function(e) {
          let fileType = _this.data.uploadFileType,
              filelimit = 9 * 1024 * 1024,
              { path, name, size } = e.tempFiles[0],
              isTrueType;
          fileType.forEach(v => {
            if (name.includes(v)) {
              isTrueType = true;
            }
          })
          if (!isTrueType) {
            let index = _this.data.POWER_LIMIT.type;
            _this.setData({
              messages: '文件类型不符,只可上传7z,rar,zip',
              tipsColor: '#f23030',
              POWER_LIMIT: { ..._this.data.POWER_LIMIT, type: ++index }
            })
            _this.showMessage({ type: 'type', index })
            return;
          }
          if (size > filelimit) {
            let index = _this.data.POWER_LIMIT.limit;
            _this.setData({
              messages: '文件大小请小于8M',
              tipsColor: '#f23030',
              POWER_LIMIT: { ..._this.data.POWER_LIMIT, limit: ++index }
            });
            _this.showMessage({ type: 'limit', index: index })
            return;
          }
          const ext = name.split('.');
          _this.setData({
            messages: '上传文件成功',
            tipsColor: '#0c3',
            filename: name,
            file_type: ext[ext.length - 1],
            file_size: (size / 1024 / 1024).toFixed(2) + 'M',
            currentFiles: [{path, size, name}]
          })
          _this.triggerEvent('success', {path, size, name})
        },
        fail: function(err) {
          if(err.errMsg !== 'chooseMessageFile:fail cancel') {
            _this.setData({ messages: '上传文件失败', tipsColor: '#ffaf65', filename: '' })
          }
          console.log(e)
        },
        complete: function() {
          wx.hideLoading();
        }
      })
    },
    //删除文件
    deleteFile: function(e) {
      this.setData({
        ...default_data
      })
      this.triggerEvent('delete',{code: 1 })
    },
    //chooseImage
    getImage: function(e) {

    },
    //有问题的不能使用
    readFile: function() {
      let a = wx.getFileSystemManager();
      let ext = name.split('.'),
          files;
      let promise = new Promise((resolve) => {
        a.readFile({
          filePath: path,
          encoding: 'base64',
          complete: function(ev) {
            if (ev.errMsg !== "readFile:ok") {
              _this.setData({ messages: '读取文件失败', tipsColor: '#f23030', filename: '' })
              return;
            }
            resolve(ev)
          }
        })
      })
      promise.then((ev) => {
        files = _this.data.readType.toLowerCase() === 'base64' ? ev : wx.base64ToArrayBuffer(ev);
        _this.setData({
          messages: '读取文件成功',
          tipsColor: '#0c3',
          filename: name,
          file_type: ext[ext.length - 1],
          file_size: (size / 1024 / 1024).toFixed(2) + 'M'
        })
      }).then(() => {
        if (!files) return;
        // const newFiles = [..._this.data.files,files];
        _this.setData({ currentFiles: [{...e.tempFiles[0]}]});
        _this.triggerEvent('success', { type: 'success', ...e.tempFiles[0], file: files, file_type: ext[ext.length - 1] });
      }).catch(err => console.log(err))

      // _this.triggerEvent('file',{type: 'success',...e.tempFiles[0], file: files},{messages: 'this is the messages'})
    }
  }
})