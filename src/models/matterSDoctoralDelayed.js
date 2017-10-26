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
       // console.log(222222222222);
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
      //  console.log("+++++++");
      //  console.log(data);
          if (data.ret==200) {
          if(data.data.code==1){
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
      
      const data = yield call(sDoctoralDelayedService.getMatter,payload);
      if(data.ret==200){
        if(data.data.code==1){
          yield put({
            type: 'getMatterSuccess',
            payload: {data: data.data}
        });
        }
        else{
          message.error('获取失败.. :(', 4);
        }
        
      }else{
        message.error('获取失败.. :(', 4);
      }
    },
    *approvalMatter({payload},{put,call,select}){
      const data = yield call(sDoctoralDelayedService.approvalMatter,payload);

      if(data.ret==200){
        if(data.data.code==1){
          message.success('提交成功.. :)', 2,onclose=()=>{

           hashHistory.push('/');
         });
        }else{
          message.error('提交失败.. :(', 4);
        }
      }else{
        message.error(data.msg+' :(', 4);
      }
      
    },
      
    *doneMatter({payload},{put,call,select}){
      console.log("+++++++");
      const data = yield call(sDoctoralDelayedService.doneMatter,payload);
      
        console.log(data);
      if(data.ret==200){
        if(data.data.code==1){
          message.success('完成成功.. :)', 2,onclose=()=>{

           hashHistory.push('/');
         });
        }else{
          message.error('完成失败.. :(', 4);
        }
      }else{
        message.error(data.msg+' :(', 4);
      }
      
      
    },
    
  },
   
    subscriptions: {},
  };