import ajaxApi from '../../utils/request.js';
import {storageTokenKey} from '../../utils/constant';
import {stringify} from 'qs';
import config  from '../../utils/config';

const { api } = config





//教职工进修事项 提交表单
export async function uploadTFutther(data) {
    
    data.service='Matter_TeacherFurther.UploadTFurther';
    data.XDEBUG_SESSION_START="10631";
    console.log(data)
    return ajaxApi(api,{method:"post",data})
  }
// 获取事项

export async function getMatter (data) {
  
  data.service='Matter_TeacherFurther.selectTFurther';
  return ajaxApi(api,{method:"post",data})
}
// 进修审批事项(一级提交)

export async function approvalMatterone (data) {
  
  data.service='Matter_TeacherFurther.UploadTFurtherOpinion';
  return ajaxApi(api,{method:"post",data})
}
// 进修审批事项(二级提交)

export async function approvalMattertwo (data) {
  
  data.service='Matter_TeacherFurther.UploadTFurtherOpinionSecond';
  return ajaxApi(api,{method:"post",data})
}
