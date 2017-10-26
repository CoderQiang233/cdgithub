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
    //  console.log(123)
      const data = yield call(infoListService.infoList);
      console.log(123)
      
      if(data.ret==200){
        if(data.data.code==1){
            
            yield put({
              type: 'InfoListSuccess',
              payload: {data: data.data.list}
          });
        }
      }
      // return data
     },
     *infoText({
      payload,
       },{put,call,select}){
        const data = yield call(infoListService.infoText,payload);
        console.log('-------------')
        console.log(data)
        if(data.ret==200){
          if(data.data.code==1){
              
              yield put({
                type: 'InfoTextSuccess',
                payload: {list: data.data.list}
               
            });
          }
        }
       }
     
  }

}
