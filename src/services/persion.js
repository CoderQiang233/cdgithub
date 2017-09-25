
import ajaxApi from '../utils/request';
import config  from '../utils/config'
const {APIV2} =config
const { api } = config
const { persionAllThing,userAllQuertion } = api

export async function queryAllDoneThing(data) {
  
// console.log(data)
  return ajaxApi(APIV2+'/process/getHisProc_end',{method:"post",data})
}
export async function queryAllUnDoneThing(data) {
  
// console.log(data)
  return ajaxApi(APIV2+'/process/getHisProc_ing',{method:"post",data})
}
export async function queryUserAllQuertion(params) {
  // return request({
  //   url: userAllQuertion,
  //   method: 'get',
  //   data: params,
  // })
  // return request(`/api/queryUserAllQuertion?${qs.stringify(params)}`);
}