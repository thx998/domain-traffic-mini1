// pages/card/index.js
const wxRequest = require('../../utils/req-util');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ name: '卡一', id: 1 }, { name: '卡二', id: 2 }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('load');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('ready');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(this.getTabBar());
    this.getTabBar().setData({
      active: 0,
    });
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