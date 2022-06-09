
const devHost = 'https://api.theoxao.com/';
export const HOST = devHost || 'http://ztc.santiyun.com:9600/';
export const baseUrl = 'api/platform';

export const getUrl = url => `${HOST}${baseUrl}${url}`;

const config = {
  host: HOST,
  baseUrl: 'api/platform'
}

export default config;