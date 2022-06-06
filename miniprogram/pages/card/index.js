// pages/card/index.js
import { getCardList } from '../../utils/service';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取卡包列表
    const that = this;
    const phone = options.phone || '18662170962';
    getCardList(phone).then(res => {
      const { data = [] } = res;
      this.setData({
        list: [{ name: '卡一', id: 1 }, { name: '卡二', id: 2 }, { name: '卡三', id: 3 }, { name: '卡四', id: 4 }, { name: '卡无', id: 5 }, { name: '卡六', id: 6 }] || data
      })
      console.log('res', res)
    }).catch(err => {
      console.log('err', err);
    })
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