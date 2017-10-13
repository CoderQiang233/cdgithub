import ajaxApi from '../utils/request.js';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';
import config  from '../utils/config';
const { APIV2 } = config
const { api } = config




//获取待办事项
export async function getUnMatters (data) {
    
  data.service='Matter_GetThings.GetApprovingMatter';
  return ajaxApi(api,{method:"post",data})
}

//获取已办事项
  export async function getDoneMatters (data) {
    
    data.service='Matter_GetThings.GetApprovedMatter';
    return ajaxApi(api,{method:"post",data})
  }

  // 获取用户签名

  export async function getSignature (data) {
    
    data.service='User_UserInfo.GetSignature';
    return ajaxApi(api,{method:"post",data})
  }