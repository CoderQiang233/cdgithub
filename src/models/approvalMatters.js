
import {message} from 'antd';
import * as approvalService from '../services/approval';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
import {  hashHistory } from 'react-router';


export default {
  namespace: 'approvalMatters',
  state: {
    unList:{},
    DoneList:{},
    signatureUrl:null,
    loading:false
  },
  reducers: {
    getUnSuccess: function (state, {payload}) {
      let data=payload.data;
      let unList={
        list:data.list,
        total:data.total,
        current:data.current,
        pageSize:data.pageSize
      };
        return {
          ...state,
            unList,
            loading:false
        };
    },
    getDoneSuccess: function (state, {payload}) {
      let data=payload.data;
      let DoneList={
        list:data.list,
        total:data.total,
        current:data.current,
        pageSize:data.pageSize
      };
        return {
          ...state,
          DoneList,
          loading:false
        };
    },
    getSignatureSuccess:function (state, {payload}) {
      let signatureUrl=payload.data;
        return {
          ...state,
          signatureUrl
        };
    },
    showLoading(state, action){
      return { ...state, loading: true };
    },
    closeLoading(state,action){
      return{...state,loading:false}
    }
  },
  effects: {
    *getUnMatters({payload},{call,put,select}){
      yield put({ type: 'showLoading' });
         const data = yield call(approvalService.getUnMatters,payload);
         
         if(data.ret==200){
          if (data.data.code==1) {
                yield put({
                  type: 'getUnSuccess',
                  payload: {data: data.data}
              });
            }else{
              yield put({ type: 'closeLoading' });
            }
         }else{
          message.error('获取失败...:(', 4);
          yield put({ type: 'closeLoading' });
         }
         

    },
    *getDoneMatters({payload},{call,put,select}){
      yield put({ type: 'showLoading' });
      const data = yield call(approvalService.getDoneMatters,payload);
      if(data.ret==200){
        if (data.data.code==1) {
          yield put({
            type: 'getDoneSuccess',
            payload: {data: data.data}
        });
          }else{
            yield put({ type: 'closeLoading' });
          }
       }else{
        message.error('获取失败...:(', 4);
        yield put({ type: 'closeLoading' });
       }
    },
    *getSignature({payload},{call,put,select}){
       const data = yield call(approvalService.getSignature,payload);
       console.log(data);
       if(data.ret==200){
        if (data.data.code==1) {
          yield put({
            type: 'getSignatureSuccess',
            payload: {data: data.data.url}
        });
        }else{
          message.error(data.data.msg, 4);
        }
       }else{
        message.error('获取失败...:(', 4);
       }
    }
    
  },
  subscriptions: {},
};
