import ajaxApi from '../../utils/request.js';
import {storageTokenKey} from '../../utils/constant';
import {stringify} from 'qs';
import config  from '../../utils/config';

const { api } = config
const { userLogin } = api




//教职工进修事项 提交表单
export async function uploadTFutther(data) {
    
    data.service='Matter_TeacherFurther.UploadTFurther';
    console.log(data)
    return ajaxApi(userLogin,{method:"post",data})
  }



