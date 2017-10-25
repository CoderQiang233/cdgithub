import ajaxApi from '../utils/request.js';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';
import config  from '../utils/config';

const { api } = config

// 获取所有事项

export async function getAllMatters (data) {
  data.service='Matters_GetMatters.GetAllMatters';
  return ajaxApi(api,{method:"post",data})
}

// 搜索事项

export async function getSearchMatters (data) {
  data.service='Matters_GetMatters.UploadSearchMatter';
  return ajaxApi(api,{method:"post",data})
}

// 获取首页教师事项
export async function getHomeTMatters () {
  let data={};
  data.service='Matters_GetMatters.GetHomeTMatters';
  return ajaxApi(api,{method:"post",data})
}
// 获取首页学生事项
export async function getHomeSMatters () {
  let data={};
  data.service='Matters_GetMatters.GetHomeSMatters';
  return ajaxApi(api,{method:"post",data})
}