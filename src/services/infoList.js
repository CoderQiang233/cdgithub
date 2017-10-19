import ajaxApi from '../utils/request.js';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';
import config  from '../utils/config';

const { api } = config



export async function infoList () {
  let data={};
  data.service='User_InfoList.GetInfoList';
  return ajaxApi(api,{method:"post",data})
}
export async function infoText (data) {
 
  data.service='User_InfoList.GetInfoDetail';
  return ajaxApi(api,{method:"post",data})
}





