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
    time: 30 * 60 * 60 * 1000,
    timeData: {},
    helpId: "",
    phone: "",
    aid: 2,
    helpTitle: "助力成功！",
    activityDetail: {},
    getPhoneSuccessStatus: false
  },
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },

  // 点击手机号

  getPhoneNumber(e) {
    console.log(`code-->`, e.detail.code);
    this.getPhone(e.detail.code)
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
        this.shareSuccess(res.data.data);
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

  onLoad(options) {
    console.log(`options-->`, options);
    if (options.helpid != undefined || options.phone != undefined) {
      this.setData({
        helpId: decodeURIComponent(options.helpid),
      })
    }
    if (options.activityid != null || options.activityid != undefined) {
      this.setData({
        aid: JSON.parse(decodeURIComponent(options.activityid))
      })
    }
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
      })
      console.log(res.data.data);
      Notify({
        message: res.data.data.activityPageTitle,
        color: '#666666',
        background: 'transparent',
        duration: 0,
        top: "55"
      });
    })
  },

  // 链接初次跳转助力成功

  // 分享调用接口
  shareSuccess(phone) {
    var url = host + globalData['shareHelpDo'] + '?activityId=' + this.data.aid + '&phone=' + phone + '&helpId=' + this.data.helpId;
    const MM = timeChange();
    const params = {
      timestamp: MM.timestamp,
      sign: MD5(`activityId${this.data.aid}helpId${this.data.helpId}phone${phone}timestamp${MM.timestamp}${TOKEN}`)
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
      if(res.data.code===200){
        this.setData({
          getPhoneSuccessStatus: true,
        })   
      }else{
        this.setData({
          getPhoneSuccessStatus: true,
          helpTitle: res.data.msg
        })   
      }
    })
  },

  onShow() {
    this.getActivity();
  },

  onPullDownRefresh() {
    this.onLoad();
    setTimeout(() => {
      wx.stopPullDownRefresh(); //得到数据后停止下拉刷新
    }, 400)
  }

  // onShareAppMessage(){
  //   return {
  //     title:"快来帮我助力吧！",
  //     path:"../fission/index",
  //     imageUrl:""
  //   }
  // }

})