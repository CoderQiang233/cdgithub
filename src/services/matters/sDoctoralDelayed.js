import ajaxApi from '../../utils/request.js';
import {storageTokenKey} from '../../utils/constant';
import {stringify} from 'qs';
import config  from '../../utils/config';

const { api } = config




//博士研究生缓考事项 提交表单
export async function uploadSDoctoralDelayed(data) {
    console.log(887777)
    data.service='Matter_SDoctoralDelayed.UploadSDoctoralDelayed';
    console.log(data)
    return ajaxApi(api,{method:"post",data})
  }
