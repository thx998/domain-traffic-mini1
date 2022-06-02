// pages/pan_channels/channels/index.js
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

  /**
   * 页面的初始数据
   */
  data: {
    activityDetail:{},
    aid:"1531117717379665921"
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
        activityDetail: res.data.data
      })
      console.log(res.data.data);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.getActivity();
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