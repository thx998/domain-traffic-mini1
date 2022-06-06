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
const weq = require('../../../utils/req-util.js')


Page({
  data: {
    jumpValue: 0,
    aid: 2,
    activityDetail: {},
    helpId: '',
    activityType: 1
  },
  // 获取手机号点击 
  getPhoneNumber(e) {
    console.log(`code-->`, e.detail.code);

    this.getPhone(e.detail.code)

  },
  // 首次Activity接口
  getActivity() {
    var url = host + globalData['activityGet'] + this.data.aid;
    const MM = timeChange();
    const params = {
      timestamp: MM.timestamp,
      sign: MD5(`timestamp${MM.timestamp}${TOKEN}`)
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
      this.setData({
        activityDetail: res.data.data,
        activityType: res.data.data.activityType
      })
      console.log(res.data.data);
      Notify({
        message: res.data.data.activityPageTitle,
        color: '#666666',
        background: 'transparent',
        duration: 0,
        top: "55"
      });
      if (res.data.activityType === 1) {
        // 判断是否需要助力按钮
        if (res.data.activityHelp > 0) {
          this.setData({

          })
        } else {

        }
        // 判断是助力页面还是无助力页面
        if (this.data.helpId != null) {
          wx.reLaunch({
            url: '../assistance_leader/index?phone=' + this.data.phone,
          })
        } else {
          wx.reLaunch({
            url: './index',
          })
        }
      } else if (res.data.activityType === 2) {
        wx.reLaunch({
          url: '../../pan_channels/channels/index',
        })
      }
    })
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
        console.log(`phone-->`, res.data.data)
        this.getButtonAsk(res.data.data);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
    })
  },

  // 点击我要领取接口
  getButtonAsk(phone) {
    var url = host + globalData['getButtonAsk'] + '?activityId=' + this.data.aid + '&activityType=' + this.data.activityType + '&phone=' + phone
    const MM = timeChange();
    const params = {
      timestamp: MM.timestamp,
      sign: MD5(`activityId${this.data.aid}activityType${this.data.activityType}phone${phone}timestamp${MM.timestamp}${TOKEN}`)
    }
    const options = {
      url: url,
      data: params
    }
    weq.wxRequest(options).then((res) => {
      if (!res) {
        return;
      }
      if (res.data.code === 200) {
        this.setData({
          jumpValue: 1
        })
      } else if (res.data.code != 200 && (res.data.msg == "未邀请助力" || res.data.msg == "助力人数不足")) {
        wx.reLaunch({
          url: '../assistance_leader/index?phone=' + phone,
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }

    })
  },
  // 跳转会员权益
  jumpVipRights() {
    wx.navigateTo({
      url: '../vip_rights/index',
    })
  },

  onLoad(option) {
    if (option.externalUserId != undefined && option.externalUserId != null) {
      if (option.helpId != undefined) {
        this.setData({
          helpId: option.helpId
        })
      }
      if (option.jumpValue != undefined) {
        this.setData({
          jumpValue: option.jumpValue
        })
      }
    } else {
      wx.reLaunch({
        url: 'url',
      })
    }


  },

  onShow() {
    this.getActivity();
  }

})