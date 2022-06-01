// index.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';


Page({
  data: {
    jumpValue:0
  },
// 获取手机号点击 
  getPhoneNumber(e){
  console.log(`code-->`,e.detail.code);
  this.setData({
    jumpValue:1
  })
  },

  onLoad() {
    Notify({ 
      message: '转发朋友圈，邀请好友助力',
      color: '#666666',
      background: 'rgba(245, 245, 245, 1)',
      duration: 0,
      top:"55"
    });
  },
 
})
