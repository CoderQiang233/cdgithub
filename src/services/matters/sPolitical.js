import ajaxApi from '../../utils/request.js';
import {storageTokenKey} from '../../utils/constant';
import {stringify} from 'qs';
import config  from '../../utils/config';

const { api } = config





//学生政治审查事项 提交表单
export async function uploadSPolitical(data) {
    
    data.service='Matter_SPoliticalCensorship.UploadSPoliticalCensorship';
    console.log(data)
    return ajaxApi(api,{method:"post",data})
  }



