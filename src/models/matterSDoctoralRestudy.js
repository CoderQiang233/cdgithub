
import {message} from 'antd';
import * as sDoctoralRestudy from '../services/matters/sDoctoralRestudy';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
import {  hashHistory } from 'react-router';


export default {
  namespace: 'matterSDoctoralRestudy',
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
       const {data} = yield call(sDoctoralRestudy.uploadSDoctoralRestudy,payload);
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
