// pages/vip/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const _this = this;
    const timer = setInterval(function() {
      _this.setData({
        time: _this.data.time - 1
      })
      if (_this.data.time<= 0) {
        // 倒计时结束，清除计时器
        clearInterval(timer);
        // 跳转到福利页面
        wx.redirectTo({
          url: '../welfare/index',
        })
      }
    }, 1000)
  },
  handleNav() {
    // 手动跳转到福利页
    wx.redirectTo({
      url: '../welfare/index',
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