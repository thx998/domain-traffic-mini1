
// 获取应用实例
const app = getApp();

Page({
  data: {
    disabled: true,
    time: 5,
  },
  onLoad() {
    const _this = this;
    const timer = setInterval(function() {
      _this.setData({
        time: _this.data.time - 1
      })
      if(_this.data.time <= 0) {
        clearInterval(timer);
        _this.setData({
          disabled: false
        })
      }
    }, 1000)
  },
  handleAgree(e) {
    console.log('agrees', e);
  },
  // 不同意协议，退出小程序
  handleDisagree() {
    console.log('bye bye');
    wx.exitMiniProgram({
      success: res => {
        console.log('exit success', res)
      },
      fail: (err) => {
        console.log('exit fail', err)
      },
      complete: (res) => {
        console.log('complete', res);
      }
    });
  },
  getPhoneNumber(e) {
    console.log('获取手机号', e);
    const { errMsg, code } = e.detail;
    // todo: other method listen user refuse?
    const userRefuse = errMsg === 'getPhoneNumber:fail user deny';
    if (code) {
      // to service get phone
    }
    // jump to vip page
    wx.reLaunch({
      url: '../register-success/index',
    })
  }
})