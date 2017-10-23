import ajaxApi from '../utils/request.js';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';
import config  from '../utils/config';

const { api } = config




//获取教师树信息
export async function getTeacherTree () {
    let data={};
    data.service='User_UserInfo.GetTeacherTree';
    return ajaxApi(api,{method:"post",data})
  }