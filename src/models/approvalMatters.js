
import {message} from 'antd';
import * as approvalService from '../services/approval';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
import {  hashHistory } from 'react-router';


export default {
  namespace: 'approvalMatters',
  state: {
    unList:[],
    DoneList:[]
  },
  reducers: {
    getUnSuccess: function (state, {payload}) {
      let unList=payload.data;
        return {
          ...state,
            unList
        };
    },
    getDoneSuccess: function (state, {payload}) {
      let DoneList=payload.data;
        return {
          ...state,
            DoneList
        };
    },
  },
  effects: {
    *getUnMatters({payload},{call,put,select}){
         const data = yield call(approvalService.getUnMatters,payload);
         if(data.ret==200){
          if (data.data.code==1) {
                yield put({
                  type: 'getUnSuccess',
                  payload: {data: data.data.list}
              });
            }
         }else{
          message.error('获取失败...:(', 4);
         }
         

    },
    *getDoneMatters({payload},{call,put,select}){
      const data = yield call(approvalService.getDoneMatters,payload);
      if(data.ret==200){
        if (data.data.code==1) {
          yield put({
            type: 'getDoneSuccess',
            payload: {data: data.data.list}
        });
          }
       }else{
        message.error('获取失败...:(', 4);
       }

 },
    
  },
  subscriptions: {},
};
