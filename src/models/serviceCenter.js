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
      // console.log('000000');
      // console.log(AllMatters)
      return {...state,AllMatters}
    },
    getHomeTMattersSuccess(state,action){
      let homeTMatters=action.payload.tMatters;
      return {...state,homeTMatters}
    },
    getHomeSMattersSuccess(state,action){
      let homeSMatters=action.payload.sMatters;
      console.log('123:'+homeSMatters)
      return {...state,homeSMatters}
    },
  },
  effects: {
    *getAllMatters({payload}, { put, call, select }) {
      const data = yield call(serviceCenterService.getAllMatters,payload);
      console.log(data)
      if(data.ret==200){
        if(data.data.code==1){
            yield put({
              type: 'getAllMatterSuccess',
              payload: {data: data.data.info}});
            yield put({
              type: 'getDepartmentSuccess',
              payload: {data: data.data.departments}});  
          }
        }
      // return data
     },
     *getSearchMatters({payload},{ put, call, select }) {
       const data = yield call(serviceCenterService.getSearchMatters,payload);
       console.log(data)
       if(data.ret==200){
        if(data.data.code==1){
            yield put({
              type: 'getSearchMatterSuccess',
              payload: {matterList: data.data.matterList}});
          }
        }
     },
     *getHomeTMatters({payload},{ put, call, select }) {
      const data = yield call(serviceCenterService.getHomeTMatters);
      if(data.ret==200){
       if(data.data.code==1){
           yield put({
             type: 'getHomeTMattersSuccess',
             payload: {tMatters: data.data.tMatters}});
         }
       }
    },
    *getHomeSMatters({payload},{ put, call, select }) {
      const data = yield call(serviceCenterService.getHomeSMatters);
      if(data.ret==200){
       if(data.data.code==1){
           yield put({
             type: 'getHomeSMattersSuccess',
             payload: {sMatters: data.data.sMatters}});
         }
       }
    },
  }
}