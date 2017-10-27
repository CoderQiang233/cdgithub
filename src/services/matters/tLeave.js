import ajaxApi from '../../utils/request.js';
import {storageTokenKey} from '../../utils/constant';
import {stringify} from 'qs';
import config  from '../../utils/config';

const { api } = config




//教职工请假事项 提交表单
export async function uploadTLeave (data) {
    
    data.service='Matter_TeacherLeave.UploadTLeave';
    return ajaxApi(api,{method:"post",data})
  }

// 获取事项

export async function getMatter (data) {
    
    data.service='Matter_TeacherLeave.selectTLeave';
    return ajaxApi(api,{method:"post",data})
}



// 审批事项

export async function approvalMatter (data) {
    data.service='Matter_TeacherLeave.UploadTLeaveOpinion';
    return ajaxApi(api,{method:"post",data})
}


