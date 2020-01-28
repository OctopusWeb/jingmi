import axios from 'axios';

const token = localStorage.token;

export function getToken() {
  const token = localStorage.token;
  return token.substring(1, token.length - 1);
}

export const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 180000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json'},
  responseType: 'json',
  transformResponse: [(data) => {
    if (!data) {
      return data;
    }
    return data;
  }],
});

function getBaseUrl(host?: string) {
  const windowHost = host || window.location.host;
  return `http://${windowHost}`;
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
  instance,
};
