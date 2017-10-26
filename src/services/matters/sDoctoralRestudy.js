import ajaxApi from '../../utils/request.js';
import {storageTokenKey} from '../../utils/constant';
import {stringify} from 'qs';
import config  from '../../utils/config';

const { api } = config




//博士研究生课程重修、重考事项  提交表单
export async function uploadSDoctoralRestudy(data) {

  data.service = 'Matter_SDoctoralRestudy.UploadSDoctoralRestudy';
  return ajaxApi(api, { method: "post", data })
}

// 获取事项

export async function getMatter (data) {
  
  data.service='Matter_SDoctoralRestudy.SelectSDoctoralRestudy';
  return ajaxApi(api,{method:"post",data})
}

// 审批事项

export async function approvalMatter (data) {

  data.service='Matter_SDoctoralRestudy.UploadSDoctoralRestudyOpinion';
  return ajaxApi(api,{method:"post",data})
}

// 事项结束

export async function doneMatter (data) {

  data.service='Matter_SDoctoralRestudy.DoneSDoctoralRestudy';
  return ajaxApi(api,{method:"post",data})
}




