import ajaxApi from '../utils/request.js';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';
import config  from '../utils/config';

const { api } = config
const { userLogin } = api

// export async function login (data) {
//   console.log(2222222);
//   console.log(data);
//   data.service='Login.UserLogin';
//   console.log(data)
//   return request({
//     url: userLogin,
//     method: 'post',
//     data,
//   })
// }

export async function slogin (data) {
  
  data.service='User_Login.SUserLogin';
  return ajaxApi(userLogin,{method:"post",data})
}
export async function tlogin (data) {
  
  data.service='User_Login.TUserLogin';
  return ajaxApi(userLogin,{method:"post",data})
}

export async function getUserInfo () {
  
  let token = sessionStorage.getItem(storageTokenKey);
  let data={
    service:'User_UserInfo.GetUserInfo',
    token:token
  };
  return ajaxApi(userLogin,{method:"post",data})
}