import axios from 'axios';

const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 180000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json',
    // 'token': localStorage.token,
    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJtc2JveC13ZWIiLCJleHAiOjE1Nzk5MzM3NTAsImlhdCI6MTU3OTkzMDE1MCwianRpIjoiMDIwMDg3NzYyNjE0NDcxYzg3Y2U1NGRhNzE4MmI0MzEiLCJ1c2VybmFtZSI6ImFkbWluIn0.nxNdbNUS0l_82XwA62Bo3vUABivgAZLboT8BLViqjQQ',
  },
  responseType: 'json',
  transformResponse: [(data) => {
    if (!data) {
      return data;
    }
    return data;
  }],
});

function getBaseUrl(host?: string) {
  // 自动拼接接口前缀地址，无需启动时更改
  const windowHost = host || window.location.host;
  const isDev = windowHost.indexOf('localhost') !==  -1;
  const baseUrl = `http://${windowHost}/${true ? 'api' : ''}`;
  return baseUrl;
}

export function get(url: string, param: any) {
  const params: any = [];
  if (param) {
    Object.keys(param).forEach((key: any) => {
      if (param[key] !== undefined) {
        params.push(`${key}=${param[key]}`);
      }
    });
    url = url + '?' + params.join('&');
  }
  return instance.get(url);
}

export function post(url: string, param: any) {
  return instance.post(url, param);
}

export function put(url: string, param: any) {
  return instance.put(url, param);
}

export function deleted(url: string, param: any) {
  return instance.delete(url, param);
}

export default {
  get,
  post,
  put,
  deleted,
};
