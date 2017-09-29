import ajaxApi from '../utils/request.js';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';
import config  from '../utils/config';
const { APIV2 } = config
const { api } = config
const { userLogin } = api




//获取待办事项
export async function getUnMatters (data) {
    
  data.service='Matter_GetThings.GetApprovingMatter';
  return ajaxApi(userLogin,{method:"post",data})
   // return ajaxApi(APIV2+'/task/getMyTasking',{method:"post",data})
}


  export async function getDoneMatters (data) {
    
    data.service='Matter_GetThings.GetApprovedMatter';
    return ajaxApi(userLogin,{method:"post",data})
    //return ajaxApi(APIV2+'/task/getMyTasked',{method:"post",data})
  }