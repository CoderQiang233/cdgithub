
import {message} from 'antd';
import * as tLeaveService from '../services/matters/tLeave';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
import {  hashHistory } from 'react-router';


export default {
  namespace: 'matterTLeave',
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
       const {data} = yield call(tLeaveService.uploadTLeave,payload);

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

    *getMatter ({payload},{put,call,select}){
      
      const {data} = yield call(tLeaveService.getMatter,payload);
      if(data){
        yield put({
          type: 'getMatterSuccess',
          payload: {data: data}
      });
      }
    },
    *approvalMatter({payload},{put,call,select}){
      const {data} = yield call(tLeaveService.approvalMatter,payload);

      if(data){
        if(data.code==1){
          message.success('提交成功.. :)', 2,onclose=()=>{

           hashHistory.push('/');
         });
        }else{
          message.error('提交失败.. :(', 4);
        }
      }else{
        message.error('发生了一些未知错误.. :(', 4);
      }
      
    }
    
  },
  subscriptions: {},
};
