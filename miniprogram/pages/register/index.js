
// 获取应用实例
const MD5 = require('js-md5');
import timeChange from '../../utils/timestampChange.js'
const {
  TOKEN
} = require('../../utils/exToken.js');
const app = getApp();
const globalData = app.globalData;
const host = app.globalData['host'];
const weq = require('../../utils/req-util.js')

Page({
  data: {
    disabled: true,
    time: 5,
  },
  onLoad() {
    const _this = this;
    const timer = setInterval(function() {
      _this.setData({
        time: _this.data.time - 1
      })
      if(_this.data.time <= 0) {
        clearInterval(timer);
        _this.setData({
          disabled: false
        })
      }
    }, 1000)
  },
  handleAgree(e) {
    console.log('agrees', e);
  },
  // 不同意协议，退出小程序
  handleDisagree() {
    console.log('bye bye');
    wx.exitMiniProgram({
      success: res => {
        console.log('exit success', res)
      },
      fail: (err) => {
        console.log('exit fail', err)
      },
      complete: (res) => {
        console.log('complete', res);
      }
    });
  },
  getPhoneNumber(e) {
    console.log('获取手机号', e);
    const { errMsg, code } = e.detail;
    // todo: other method listen user refuse?
    if (errMsg === "getPhoneNumber:ok") {
      this.getPhone(code);
    } else {
      wx.showToast({
        title: "请绑定手机号！",
        icon: "none"
      })
    }
  },

  // 获取手机号接口 
  getPhone(code) {
    var url = host + globalData['getPhone'] + '?code=' + code;
    const MM = timeChange();
    const params = {
      timestamp: MM.timestamp,
      sign: MD5(`code${code}timestamp${MM.timestamp}${TOKEN}`)
    }
    console.log(`timestamp${MM.timestamp}${TOKEN}`);
    const options = {
      url: url,
      data: params
    }
    weq.wxRequest(options).then((res) => {
      if (!res) {
        return;
      }
      if (res.data.code === 200) {
        wx.reLaunch({
          url: '../register-success/index',
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
    })
  },

  
})