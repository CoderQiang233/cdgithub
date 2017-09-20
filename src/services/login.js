import ajaxApi from '../utils/request3.js';
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

export async function login (data) {
  data.service='Login.UserLogin';
  return ajaxApi(userLogin,{method:"post",data})
}