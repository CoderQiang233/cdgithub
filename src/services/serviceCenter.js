import ajaxApi from '../utils/request.js';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';
import config  from '../utils/config';

const { api } = config
const { userLogin } = api

// 获取所有事项

export async function getAllMatters () {
  let data={};
  data.service='Matters_GetMatters.GetAllMatters';
  return ajaxApi(userLogin,{method:"post",data})
}

// 搜索事项

export async function getSearchMatters (data) {
  data.service='Matters_GetMatters.UploadSearchMatter';
  return ajaxApi(userLogin,{method:"post",data})
}