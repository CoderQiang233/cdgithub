import {message} from 'antd';
import * as sDoctoralDelayedService from '../services/matters/sDoctoralDelayed';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
import {  hashHistory } from 'react-router';

export default {
    namespace: 'matterSDoctoralDelayed',
    state: {
      tableData:{},
      opinion:{}
    },
    reducers: {
      getMatterSuccess: function (state, {payload}) {
        console.log(222222222222);
          let tableData=payload.data.info;
          let opinion=payload.data.opinion;
          return {
            ...state,
            tableData:tableData,
            opinion:opinion
          };
      },
    },
    effects: {
      *uploadTable ({payload}, {put, call,select}) {
      
       const {data} = yield call(sDoctoralDelayedService.uploadSDoctoralDelayed,payload);
      
          if (data) {
          if(data.code==1){
            message.success('提交成功.. :)',2,onclose=()=>{
              
              hashHistory.goBack();
            });
            // yield put(routerRedux.goBack());
            
          }
          else{
            message.error('提交失败.. :(', 4);
          }
           
        }
      },
  
      
      
    },
    subscriptions: {},
  };