// request 是我们封装的一个网络请求库
import request from '../utils/request';
import qs from 'qs';

export async function queryAllThing(params) {
  return request(`/api/persionAllThing?${qs.stringify(params)}`);
}

export async function queryUserAllQuertion(params) {
  return request(`/api/queryUserAllQuertion?${qs.stringify(params)}`);
}