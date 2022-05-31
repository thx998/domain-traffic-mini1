// pages/card/index.js
Page({
  data: {
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
  },
  /**
   * 用户点击右上角分享
   */
  getPhoneNumber(e) {
    console.log('获取手机号', e);
    const { errMsg, code } = e.detail;
    // todo: other method listen user refuse?
    const userRefuse = errMsg === 'getPhoneNumber:fail user deny';
    if (code) {
      // to service get phone
    }
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '自定义转发标题'
        })
      }, 2000)
    })
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      promise 
    }
  },
  onShareTimeline() {
    return {
      title: '分享标题'
    }
  }
})