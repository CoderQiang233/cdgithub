import {message} from 'antd';
import * as infoListService from '../services/infoList';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
export default {
  
  namespace: 'infoList',
  state: {
    infoList:[],
    infoText:[]
  },
  reducers: {
    InfoListSuccess(state,action){
        let data=action.payload.data;   
        let infoList=data;
        return {...state,infoList}
      
    },
    InfoTextSuccess(state,action){
      let data=action.payload.list;   
      let infoText=data;
      return {...state,infoText}
    },
  },
  
  effects: {
    *infoList({
      payload,
     }, { put, call, select }) {
      const {data} = yield call(infoListService.infoList);
        if(data&data.code==1){
            
            yield put({
              type: 'InfoListSuccess',
              payload: {data: data.list}
          });
        }
     },
     *infoText({
      payload,
       },{put,call,select}){
        const {data} = yield call(infoListService.infoText,payload);
          if(data&&data.code==1){
              
              yield put({
                type: 'InfoTextSuccess',
                payload: {list: data.list}
               
            });
          }
       }
     
  }

}
