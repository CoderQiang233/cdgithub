// require('es6-promise').polyfill();
// require('isomorphic-fetch');
import 'whatwg-fetch' 
import 'es6-promise'
import {message} from 'antd';
import {storageTokenKey} from '../utils/constant';
import {setSessionStorage,getSessionStorage,redirectLogin} from './helper'



export default function ajaxApi(url, option = {}) {
  
  let
    params = {},
    method = option.method || 'get',
    data = option.data || {};
    let token = getSessionStorage(storageTokenKey);
    //data['token']=token;
    
  switch (method) {
    case 'get':
      url = url + (data ? '?' + formDataCode(data) : '');
      break;
    case 'post':
      params.headers = {};
      params.method='POST';
    //params.mode='no-cors';
      params.body = formDataCode(data);
      
      if(token){
        params.headers['authorization']=token;
      }
      params.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";
     
      
      
    default:
  }
  return fetch(url, params).then(callback).catch(errHandle);
}
//创建修改参数格式的方法，改成提交的Form Data格式
function formDataCode(data) {
  let str = '';
  for (let i in data) {
    if (data.hasOwnProperty(i)) {
      str = str + i + "=" + data[i] + '&';
    }
  }
  return str ? str.substring(0, str.length - 1) : '';
}
//创建fetch中then方法的回调
function callback(res) {
  return res.json().then(response => {
    if (!response) {
      throw "服务器返回参数错误"
      message.error('服务器返回参数错误.. :(', 2);
    } else if (response.ret == 401) {

      message.error(response.msg+'.. :(', 2,onclose=()=>{redirectLogin()}); 
      return response;
    } 
    else if(response.ret = 200){
      return response;
    }

    const error = new Error(response.msg);
    error.response = response;
    throw error;
    
  })
}
//创建容错方法
function errHandle(res) {

  if (res.ret == -1) {
    message.error(res.msg+'.. :(', 2);
  }
}
