import ajaxApi from '../../utils/request.js';
import {storageTokenKey} from '../../utils/constant';
import {stringify} from 'qs';
import config  from '../../utils/config';

const { api } = config




//博士研究生课程重修、重考事项  提交表单
export async function uploadSDoctoralRestudy (data) {
    
    data.service='Matter_SDoctoralRestudy.UploadSDoctoralRestudy';
    console.log(data)
    return ajaxApi(api,{method:"post",data})
  }




