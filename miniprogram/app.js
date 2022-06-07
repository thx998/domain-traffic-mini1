// app.js
import { HOST } from './utils/config';
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
  //  "host":"http://dev.theoxao.com/",
   "host":HOST,

  // 首次调用
    activityGet:"api/platform/call/activity/",

    // 获取手机号

    getPhone:"api/platform/call/applets/phoneNumber",

    // 点击我要领取按钮

    getButtonAsk:"api/platform/call/activity/getActivitiesQualification",


    // 参与助力

    shareHelpDo:"api/platform/call/activity/participateActivityHelp",

    // 注册客户

    getCustomer:"api/platform/call/customer"

  }
})
