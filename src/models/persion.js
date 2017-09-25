
import * as personService from '../services/persion';


export default {
  namespace: 'persion',
  state: {
    MyAllDoneTingProps:{},
    MyAllUnDoneTingProps:{}
  },
  reducers: {
    queryUserAllDoneThingSuccess(state,action){
    //  console.log(action.payload.list)
      const MyAllDoneTingProps={
          // total: action.payload.total,
          // current: action.payload.current,
          loading: false,
          dataSource:action.payload.list
      };
      return {...state,MyAllDoneTingProps};
    },
    queryUserAllUnDoneThingSuccess(state,action){
      const MyAllUnDoneTingProps={
        // total: action.payload.total,
        // current: action.payload.current,
        loading: false,
        dataSource:action.payload.list
    };
    return {...state,MyAllUnDoneTingProps};
     
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
    showLoading(state, action){
      return { ...state, loading: true };
    },
    
    
  },
  effects: {
    *queryUserAllDoneThing({payload},{select, call, put }){     
      // yield put({ type: 'showLoading' });
      // console.log(payload)
      const data  = yield call(personService.queryAllDoneThing,payload);
      
      if (data) {
       
        yield put({
          type: 'queryUserAllDoneThingSuccess',
          payload: {
            list: data,
            // total: data.page.total,
            // current: data.page.current
          }
        });
      }
    },
    *queryUserAllUnDoneThing({payload},{select, call, put }){     
      // yield put({ type: 'showLoading' });
      const  data  = yield call(personService.queryAllUnDoneThing,payload);
      
      if (data) {
      
        yield put({
          type: 'queryUserAllUnDoneThingSuccess',
          payload: {
            list: data,
            // total: data.page.total,
            // current: data.page.current
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
