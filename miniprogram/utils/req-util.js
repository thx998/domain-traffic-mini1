"use strict";
function wxRequest(options) {
  // var userdetail = wx.getStorageSync('function')
  options.header['x-version'] = 'beta';
  // if(userdetail.nickname!=null){
  //   options.header['auth-principal-attribute-key'] = userdetail.id;
  // }
  var method = options.method || null;
  if (method === null) {
    method = "GET";
  }
  return new Promise((resolove, reject) => {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: options.url,
      method: method,
      data: options.data,
      header: options.header,
      success: (res) => {
        intercept(res, resolove, reject);
        wx.hideLoading({
          success: (loadingRes) => {

          },
        })

      },
      fail: (error) => {
        wx.hideLoading({
          success: (res) => {
            reject(error);
          },
        })
      }
    })
  });
}

module.exports.wxRequest = wxRequest;