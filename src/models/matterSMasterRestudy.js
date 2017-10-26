
import {message} from 'antd';
import * as sMasterRestudy from '../services/matters/sMasterRestudy';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
import {  hashHistory } from 'react-router';


export default {
  namespace: 'matterSMasterRestudy',
  state: {
    tableData:{},
    opinion:{}
  },
  reducers: {
    getMatterSuccess: function (state, {payload}) {
      
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
      console.log('aaaaaaaaaaaaaaa')
      console.log(payload)
       const {data} = yield call(sMasterRestudy.uploadSMasterRestudy,payload);
       console.log('555555555')
       console.log(data)
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
