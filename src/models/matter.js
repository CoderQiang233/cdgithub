import {message} from 'antd';
import * as matterService from '../services/matter';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'matter',
  state: {
    teacherTree:[]
  },
  reducers: {
    getTeacherTreeSuccess: function (state, {payload}) {
      
        let teacherTree=payload.data;
        return {
          ...state,
          teacherTree,
        };
    },
  },
  effects: {
    *getTeacherTree ({payload}, {put, call,select}) {
      const {data} = yield call(matterService.getTeacherTree);
       if(data&&data.code==1){
        yield put({
          type: 'getTeacherTreeSuccess',
          payload: {data: data.teacherTree}
        });
       }
       else{
         message.error(data.msg+ '.. :(', 4);
       }
   },
  },
  subscriptions: {},
};
