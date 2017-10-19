
import ajaxApi from '../utils/request';
import config  from '../utils/config'
const {APIV2} =config
const { api } = config

export async function queryAllDoneThing(data) {
  data.service='Matter_GetThings.GetDoneThing';
  return ajaxApi(api,{method:"post",data})
  //return ajaxApi(APIV2+'/process/getHisProc_end',{method:"post",data})
}
export async function queryAllUnDoneThing(data) {
  data.service='Matter_GetThings.GetUnThing';
  return ajaxApi(api,{method:"post",data})
  //return ajaxApi(APIV2+'/process/getHisProc_ing',{method:"post",data})
}
export async function queryUserAllQuertion(params) {
  // return request({
  //   url: userAllQuertion,
  //   method: 'get',
  //   data: params,
  // })
  // return request(`/api/queryUserAllQuertion?${qs.stringify(params)}`);
}


export async function getFlowChartPath(data) {
  data.service='Matter_GetThings.GetflowChartPath';
  return ajaxApi(api,{method:"post",data})
  //return ajaxApi(APIV2+'/process/getHisProc_end',{method:"post",data})
}