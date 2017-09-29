
import * as personService from '../services/persion';
import {message} from 'antd';

export default {
  namespace: 'persion',
  state: {
    loading:false,
    MyAllDoneTingProps:{
      dataSource:[]
    },
    MyAllUnDoneTingProps:{
      dataSource:[]
    },
    flowChartPath:''
  },
  reducers: {
    queryUserAllDoneThingSuccess(state,action){
      const MyAllDoneTingProps={
          dataSource:action.payload.list
      };
      return {...state,MyAllDoneTingProps,loading: false,};
    },
    queryUserAllUnDoneThingSuccess(state,action){
      const MyAllUnDoneTingProps={
        dataSource:action.payload.list
    };
    return {...state,MyAllUnDoneTingProps,loading: false,};
     
    },
   
    queryUserAllQuertionSuccess(state,action){
      const MyAllQuestion={
        total: action.payload.total,
        current: action.payload.current,
        loading: false,
        dataSource:action.payload.list
    };
    return {MyAllQuestion};
      
      
    },
    getFlowChartPathSuccess(state,action){
      let flowChartPath=action.payload.path;
      return{...state,flowChartPath}
    },
    showLoading(state, action){
      return { ...state, loading: true };
    },
    closeLoading(state,action){
      return{...state,loading:false}
    }
    
    
  },
  effects: {
    *queryUserAllDoneThing({payload},{select, call, put }){     
       yield put({ type: 'showLoading' });
      // console.log(payload)
      const data  = yield call(personService.queryAllDoneThing,payload);
      if(data.ret==200){
        if (data.data.code==1) {
          
           yield put({
             type: 'queryUserAllDoneThingSuccess',
             payload: {
               list: data.data.list,
               // total: data.page.total,
               // current: data.page.current
             }
           });
         }else{
          //message.error('获取失败...:(', 4);
          yield put({ type: 'closeLoading' });
         }
      }else{
        //message.error(data.msg, 4);
        yield put({ type: 'closeLoading' });
      }
      
    },
    *queryUserAllUnDoneThing({payload},{select, call, put }){     
       yield put({ type: 'showLoading' });
      const  data  = yield call(personService.queryAllUnDoneThing,payload);
      if(data.ret==200){
        if (data.data.code==1) {
          
          yield put({
            type: 'queryUserAllUnDoneThingSuccess',
            payload: {
              list: data.data.list,
              // total: data.page.total,
              // current: data.page.current
            }
           });
         }else{
         // message.error('获取失败...:(', 4);
          yield put({ type: 'closeLoading' });
         }
      }else{
       // message.error(data.msg, 4);
        yield put({ type: 'closeLoading' });
      }
    },
    *getFlowChartPath({payload},{select, call, put }){
      const  data  = yield call(personService.getFlowChartPath,payload);
      if(data.data){
        yield put({
          type: 'getFlowChartPathSuccess',
          payload: {
            path: data.data.path,
          }
         });
      }
    },
    *queryUserAllQuertion({payload},{select, call, put }){     
      // yield put({ type: 'showLoading' });
      const { data } = yield call(personService.queryUserAllQuertion);
      
      if (data) {
   
        yield put({
          type: 'queryUserAllQuertionSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    }
  },
  subscriptions: {},
};
