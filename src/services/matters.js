import ajaxApi from '../utils/request.js';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';
import config  from '../utils/config';

const { api } = config
const { userLogin } = api




//教职工请假事项 
export async function uploadTLeave (data) {
    
    data.service='Matter_TeacherLeave.UploadTLeave';
    console.log(data)
    return ajaxApi(userLogin,{method:"post",data})
  }