const { wxRequest } = require('../utils/req-util');
const MD5 = require('js-md5');
import timeChange from './timestampChange';
import { TOKEN } from './exToken';
import { getUrl } from './config';
// 获取卡包列表
export const getCardList = function(phone) {
  const T = timeChange();
  const params = {
    phone,
    timestamp: T.timestamp,
    sign: MD5(`phone${phone}timestamp${T.timestamp}${TOKEN}`)
  }
  return wxRequest({
    url: getUrl('/call/applets/coupon/list'),
    data: params,
  })
}
// 获取卡包详情
export const getCardDetail = id => {
  const T = timeChange();
  const params = {
    id,
    timestamp: T.timestamp,
    sign: MD5(`id${id}timestamp${T.timestamp}${TOKEN}`)
  }
  return wxRequest({
    url: getUrl(`/call/applets/coupon/${id}`),
    data: params,
  })
}