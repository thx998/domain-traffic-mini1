"use strict";

function wxRequest(options) {
  // options.header['x-version'] = 'beta';
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
        wx.hideLoading({
          success: (loadingRes) => {
            resolove(res);
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