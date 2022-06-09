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
    helpId: 2,
    activityType: 1,
    phone:""
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
      if (res.data.data.activityType === 1) {
        // 判断是否需要助力按钮
        if (res.data.data.activityHelp > 0) {
          this.setData({

          })
        } else {

        }
      } else if (res.data.data.activityType === 2) {
        wx.reLaunch({
          url: '../../pan_channels/channels_second/index?activityid=' + this.data.aid,
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
        this.setData({
          phone:res.data.data
        })
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
        // 判断是助力页面还是无助力页面
        if (this.data.helpId != null || this.data.helpId != undefined) {
          wx.navigateTo({
            url: '../assistance_leader/index?phone=' + encodeURIComponent(JSON.stringify(phone)) + '&activityid=' + encodeURIComponent(JSON.stringify(this.data.aid)),
          })
        } else {
          wx.reLaunch({
            url: '../assistance_user/index?phone=' + encodeURIComponent(JSON.stringify(phone)) + '&helpid=' + encodeURIComponent(JSON.stringify(this.data.helpId)) + '&activityid=' + encodeURIComponent(JSON.stringify(this.data.aid)),
          })
        }
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

  // 跳转到我的卡包

  jumpMyCard(){
    wx.reLaunch({
      url: '../../card/index?phone=' +  this.data.phone,
    })
  },

  onLoad(option) {
    if (option.externalUserId != undefined && option.externalUserId != null) {
      wx.reLaunch({
        url: '../../register/index',
      })
    } else {
      if (option.helpid != undefined || option.helpid != undefined) {
        this.setData({
          helpId: option.helpid
        })
      } 
      if (option.jumpValue != undefined || option.jumpValue != undefined ) {
        this.setData({
          jumpValue: option.jumpValue
        })
      } 
      if(option.activityId!=null || option.activityId!=undefined){
        this.setData({
          aid:option.activityId
        })
      }
    }
   
  },

  onShow() {
    this.getActivity();
  }

})