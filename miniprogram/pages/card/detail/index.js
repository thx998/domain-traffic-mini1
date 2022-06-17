// pages/card/detail/index.js
import { getCardDetail } from '../../../utils/service';
import weappQRcode from 'weapp-qrcode';
import wxbarcode from 'wxbarcode';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    qrcodeUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('detail options', options);
    // 获取卡包详情
    const that = this;
    getCardDetail(options.id).then(res => {
      console.log(`detailRes-->`,res);
      that.setData({
        detail: res.data.data || { id: options.id }
      })
      const { couponDetail: { couponDetailCode = '无效优惠券' } = {} } = res.data.data || {};
      new weappQRcode({
        width: 150,
        height: 150,
        canvasId: 'myQRcode',
        text: couponDetailCode
      })
      wxbarcode.barcode('myBARcode', couponDetailCode, 750, 150)
    }).catch(err => {
      console.log('err', err);
    })
  },

  onClickLeft(){
    wx.navigateBack({
      delta:0
    })
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