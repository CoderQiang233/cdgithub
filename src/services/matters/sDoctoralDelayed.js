import ajaxApi from '../../utils/request.js';
import {storageTokenKey} from '../../utils/constant';
import {stringify} from 'qs';
import config  from '../../utils/config';

const { api } = config




//博士研究生缓考事项 提交表单
export async function uploadSDoctoralDelayed(data) {
    data.service='Matter_SDoctoralDelayed.UploadSDoctoralDelayed';
    return ajaxApi(api,{method:"post",data})
  }
// 获取事项

export async function getMatter (data) {
  
  data.service='Matter_SDoctoralDelayed.SelectSDoctoralDelayed';
  return ajaxApi(api,{method:"post",data})
}


// 审批事项

export async function approvalMatter (data) {
  
  data.service='Matter_SDoctoralDelayed.UploadSDoctoralDelayedOpinion';
  return ajaxApi(api,{method:"post",data})
}

// 完成事项

export async function doneMatter (data) {
  
  data.service='Matter_SDoctoralDelayed.DoneDoctoralDelayed';
  return ajaxApi(api,{method:"post",data})
}