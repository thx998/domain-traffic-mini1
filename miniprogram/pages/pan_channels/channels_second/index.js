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


Page({
  data: {
    jumpValue: 0,
    activityDetail: {},
    aid:2,
    activityType: '',
    phone:""
  },
  // 获取手机号点击 
  getPhoneNumber(e) {
    console.log(e);
    console.log(`code-->`, e.detail.code);
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      this.getPhone(e.detail.code);
    } else {
     
    }
  },

  jumpMyCard(){
    wx.reLaunch({
      url: '../../card/index?phone=' +  this.data.phone,
    })
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
        activityType: res.data.data.activityType,
        activityPosterSeat:res.data.data.activityPosterSeat
      })
      Notify({
        message: this.data.activityDetail.activityPageTitle,
        color: '#666666',
        background: 'transparent',
        duration: 0,
        top: "55"
      });
      console.log(res.data.data);
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
      url: '../../vip_fission/vip_rights/index',
    })
  },

  onLoad(options) {
  if(options.activityid!=null || options.activityid!=undefined){
    this.setData({
      aid:options.activityid
    })
  }
  },

  onShow() {
    this.getActivity();
  }



})