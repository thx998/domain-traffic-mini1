// pages/vip/detail/index.js
const MD5 = require('js-md5');
import timeChange from '../../utils/timestampChange.js'
const {
  TOKEN
} = require('../../utils/exToken.js');
const app = getApp();
const globalData = app.globalData;
const host = app.globalData['host'];
const weq = require('../../utils/req-util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 3,
    externalUserId: '',
    activityId: '',
    userId: '',
    disabled:true,
    buttonStyle: false
  },

  onClickLeft() {
    wx.navigateBack({
      delta: 0
    })
  },

  getCustomer() {
    var url = host + globalData['getCustomer'] + '?activityId=' + this.data.activityId + '&externalUserId=' + this.data.externalUserId + '&userId=' + this.data.userId;
    const MM = timeChange();
    const params = {
      timestamp: MM.timestamp,
      sign: MD5(`activityId${this.data.activityId}externalUserId${this.data.externalUserId}timestamp${MM.timestamp}userId${this.data.userId}${TOKEN}`)
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
        wx.redirectTo({
          url: '../vip_fission/vip_rights/index',
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.externaluserid != undefined && options.userid != undefined && options.activityid != undefined) {
      this.setData({
        externalUserId: options.externaluserid,
        activityId: options.activityid,
        userId: options.userid
      })
    }
  },

  intervalfunction() {

      const _this = this;
      const timer = setInterval(function () {
        _this.setData({
          time: _this.data.time - 1
        })
        if (_this.data.time <= 0) {
          // 倒计时结束，清除计时器
          clearInterval(timer);
          _this.setData({
            disabled:false
          })
          // 跳转到福利页面

        }
      }, 1000)
    

  },

  handleNav() {
    // 手动跳转到福利页
    this.getCustomer();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
      this.intervalfunction();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})