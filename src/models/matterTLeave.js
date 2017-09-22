
import {message} from 'antd';
import * as matterService from '../services/matters';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
import {  hashHistory } from 'react-router';


export default {
  namespace: 'matterTLeave',
  state: {},
  reducers: {

  },
  effects: {
    *uploadTable ({payload}, {put, call,select}) {
       const {data} = yield call(matterService.uploadTLeave,payload);

       if (data) {
        if(data.code==1){
          console.log(data)
          message.success('提交成功',2,onclose=()=>{
             console.log(3333333);
            //  hashHistory.push('/')
            console.log(hashHistory);
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
