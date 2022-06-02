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
    jumpValue:0,
    time: 30 * 60 * 60 * 1000,
    timeData: {},
    helpId:"",
    phone:"",
    aid:2,
    helpTitle:"助力成功！",
    activityDetail:{}
  },
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },


   // 跳转会员权益
   jumpVipRights() {
    wx.navigateTo({
      url: '../vip_rights/index',
    })
  },

  onLoad(option) {
    if(option.helpId!=undefined || option.phone!=undefined){
      this.setData({
        helpId:option.helpId,
        phone:option.phone
      })
      this.shareSuccess();
    }
    this.getActivity();
    
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
  shareSuccess() {
    var url = host + globalData['shareHelpDo'] + '?activityId=' + this.data.aid + '&phone=' + this.data.phone +'&helpId=' + this.data.helpId;
    const MM = timeChange();
    const params = {
      timestamp: MM.timestamp,
      sign: MD5(`activityId${this.data.aid}helpId${this.data.helpId}phone${this.data.phone}timestamp${MM.timestamp}${TOKEN}`)
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

      }else if(res.data.code===500){
        this.setData({
          helpTitle:res.data.msg
        })
      }
    })
  },

  // onShareAppMessage(){
  //   return {
  //     title:"快来帮我助力吧！",
  //     path:"../fission/index",
  //     imageUrl:""
  //   }
  // }
 
})
