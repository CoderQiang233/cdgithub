import ajaxApi from '../utils/request.js';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';
import config  from '../utils/config';

const { api } = config
const { userLogin } = api



export async function slogin (data) {
  
  data.service='User_Login.SUserLogin';
  return ajaxApi(userLogin,{method:"post",data})
}
export async function tlogin (data) {
  
  data.service='User_Login.TUserLogin';
  return ajaxApi(userLogin,{method:"post",data})
}

export async function getUserInfo () {
  
  let data={
    service:'User_UserInfo.GetUserInfo'
  };
  return ajaxApi(userLogin,{method:"post",data})
}