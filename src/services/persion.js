
import request from '../utils/request';
import config  from '../utils/config'

const { api } = config
const { persionAllThing,userAllQuertion } = api

export async function queryAllThing(params) {
  return request({
    url: persionAllThing,
    method: 'get',
    data: params,
  })
  // return request(`/api/persionAllThing?${qs.stringify(params)}`);
}

export async function queryUserAllQuertion(params) {
  return request({
    url: userAllQuertion,
    method: 'get',
    data: params,
  })
  // return request(`/api/queryUserAllQuertion?${qs.stringify(params)}`);
}