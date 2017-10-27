import {message} from 'antd';
import * as serviceCenterService from '../services/serviceCenter';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
export default {
  
  namespace: 'serviceCenter',
  state: {
    AllMatters:[],
    getMattersSuccess:false,
    Department:[],
    getDepartmentsSuccess:false,
    SearchMatter:[],
    getSearchMattersSuccess:false,
    homeTMatters:[],
    homeSMatters:[]
  },
  reducers: {
    getAllMatterSuccess(state,action){
        let data=action.payload.data;   
        let AllMatters=data;
        return {...state,AllMatters,getMattersSuccess:true}
    },
    getDepartmentSuccess(state,action){
      let data=action.payload.data;   
      let Department=data;
      return {...state,Department,getDepartmentsSuccess:true}
    },
    getSearchMatterSuccess(state,action){
      let AllMatters=action.payload.matterList;
      return {...state,AllMatters}
    },
    getHomeTMattersSuccess(state,action){
      let homeTMatters=action.payload.tMatters;
      return {...state,homeTMatters}
    },
    getHomeSMattersSuccess(state,action){
      let homeSMatters=action.payload.sMatters;
      return {...state,homeSMatters}
    },
  },
  effects: {
    *getAllMatters({payload}, { put, call, select }) {
      const {data} = yield call(serviceCenterService.getAllMatters,payload);
        if(data&&data.code==1){
            yield put({
              type: 'getAllMatterSuccess',
              payload: {data: data.info}});
            yield put({
              type: 'getDepartmentSuccess',
              payload: {data: data.departments}});  
          }
     },
     *getSearchMatters({payload},{ put, call, select }) {
       const {data} = yield call(serviceCenterService.getSearchMatters,payload);
        if(data&&data.code==1){
            yield put({
              type: 'getSearchMatterSuccess',
              payload: {matterList: data.matterList}});
          }
     },
     *getHomeTMatters({payload},{ put, call, select }) {
      const {data} = yield call(serviceCenterService.getHomeTMatters);
       if(data&&data.code==1){
           yield put({
             type: 'getHomeTMattersSuccess',
             payload: {tMatters: data.tMatters}});
         }
    },
    *getHomeSMatters({payload},{ put, call, select }) {
      const {data} = yield call(serviceCenterService.getHomeSMatters);
       if(data&&data.code==1){
           yield put({
             type: 'getHomeSMattersSuccess',
             payload: {sMatters: data.sMatters}});
         }
    },
  }
}