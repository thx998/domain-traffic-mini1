// index.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
const MD5 = require('js-md5');
import timeChange from '../../../utils/timestampChange.js'
const {
  TOKEN
} = require('../../../utils/exToken.js');
const app = getApp();
const globalData = app.globalData;
const host = app.globalData['host'];
const weq = require('../../../utils/req-util.js');
// const prettyMilliseconds = require('pretty-ms');


Page({
  data: {
    jumpValue: 0,
    time: 30 * 60 * 60 * 1000,
    timeData: {},
    aid: 2,
    helpDetail: {},
    actStatus: true,
    phone: "",
    helpId: "",
    shareStatus: true,
    avatarArray: []
  },
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },

  // 助力初始页面的基本信息
  getHelpDetail(phone) {
    console.log(`phone-->`, phone);
    var url = host + globalData['activityGet'] + this.data.aid
    const MM = timeChange();
    const params = {
      timestamp: MM.timestamp,
      phone: phone,
      sign: MD5(`phone${phone}timestamp${MM.timestamp}${TOKEN}`)
    }
    console.log(`timestamp${MM.timestamp}${TOKEN}`);
    const options = {
      url: url,
      data: params
    }
    weq.wxRequest(options).then((res) => {
      console.log(`helpDetailRes-->`, res);
      if (!res) {
        return;
      }
      this.setData({
        helpDetail: res.data.data
      });
      console.log(`helpDetail-->`, res.data.data);
      this.data.avatarArray.length = res.data.data.helpedCount;
      this.setData({
        avatarArray: this.data.avatarArray
      })
      var endTime = new Date(res.data.data.activityEndTime);
      var startTime = new Date();
      if (endTime - startTime < 0) {
        this.setData({
          actStatus: false
        })
      } else {
        let useTime = endTime - startTime;
        this.setData({
          time: useTime
        })
      }
      // 页面吧标题
      Notify({
        message: res.data.data.activityPageTitle,
        color: '#666666',
        background: 'transparent',
        duration: 0,
        top: "55"
      });

    })
  },
  // 分享失败

  showNoShare() {
    wx.showToast({
      title: '分享失败！',
      icon: none
    })
  },

  // 分享调用接口
  sHelpDo() {
    var url = host + globalData['shareHelpDo'] + '?activityId=' + this.data.aid + '&phone=' + this.data.phone;
    const MM = timeChange();
    const params = {
      timestamp: MM.timestamp,
      sign: MD5(`activityId${this.data.aid}phone${this.data.phone}timestamp${MM.timestamp}${TOKEN}`)
    }
    console.log(`timestamp${MM.timestamp}${TOKEN}`);
    const options = {
      url: url,
      data: params
    }
    weq.wxRequest(options).then((res) => {
      console.log(`helpDo-->`, res);
      if (!res) {
        return;
      }
      if (res.data.code === 200) {
        this.setData({
          helpId: res.data.data
        })
      } else {
        this.setData({
          shareStatus: false
        })
      }
    })
  },

  onLoad(options) {
    wx.hideShareMenu();
    console.log(options);
    // if(option.phone!=undefined || option.phone!="" ){
    //   this.getHelpDetail(option.phone);
    // }
    if (options.phone != undefined || options.phone != null) {
      const newPhone = JSON.parse(decodeURIComponent(options.phone))
      this.getHelpDetail(newPhone);
      this.setData({
        phone: newPhone
      });
      this.sHelpDo();
    }
    if (options.activityid != null || options.activityid != undefined) {
      this.setData({
        aid: JSON.parse(decodeURIComponent(options.activityid))
      })
    }
  },
  onShow() {
    if (this.data.helpDetail.activityHelp - this.data.helpDetail.helpedCount === 0) {
      wx.navigateTo({
        url: '../fission/index?jumpValue=1',
      })
    }
  },

  onShareAppMessage() {
    return {
      title: this.data.helpDetail.activityShareTitle,
      path: "pages/vip_fission/assistance_user/index?helpid=" + encodeURIComponent(this.data.helpId) + '&activityid=' + encodeURIComponent(this.data.aid),
      imageUrl: this.data.helpDetail.activityShareIcon,
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          wx.showToast({
            title: '分享成功！',
          })
        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
          wx.showToast({
            title: '分享失败！',
            icon: none
          })
        }
      },
    }
  },

  onPullDownRefresh() {
    this.onLoad();
    setTimeout(() => {
      wx.stopPullDownRefresh(); //得到数据后停止下拉刷新
    }, 400)
  }

})