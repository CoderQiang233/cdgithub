
import * as personService from '../services/persion';


export default {
  namespace: 'persion',
  state: {},
  reducers: {
    queryUserAllThingSuccess(state,action){
      const MyAllTingProps={
          total: action.payload.total,
          current: action.payload.current,
          loading: false,
          dataSource:action.payload.list
      };
      return {MyAllTingProps};
    },
    queryUserAllDoneThingSuccess(state,action){
      const MyAllDoneTingProps={
        total: action.payload.total,
        current: action.payload.current,
        loading: false,
        dataSource:action.payload.list
    };
    return {MyAllDoneTingProps};
     
    },
    queryUserAllUnDoneThingSuccess(state,action){
      const MyAllUnDoneTingProps={
        total: action.payload.total,
        current: action.payload.current,
        loading: false,
        dataSource:action.payload.list
    };
    return {MyAllUnDoneTingProps};
      
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
    *queryUserAllThing({payload},{select, call, put }){     
      // yield put({ type: 'showLoading' });
      const  data  = yield call(personService.queryAllThing);
      
      if (data) {
        yield put({
          type: 'queryUserAllThingSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    *queryUserAllDoneThing({payload},{select, call, put }){     
      // yield put({ type: 'showLoading' });
      const  data  = yield call(personService.queryAllThing);
      
      if (data) {
        console.log(data)
        yield put({
          type: 'queryUserAllDoneThingSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    *queryUserAllUnDoneThing({payload},{select, call, put }){     
      // yield put({ type: 'showLoading' });
      const  data  = yield call(personService.queryAllThing);
      
      if (data) {
        console.log(data)
        yield put({
          type: 'queryUserAllUnDoneThingSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    *queryUserAllQuertion({payload},{select, call, put }){     
      // yield put({ type: 'showLoading' });
      const  data  = yield call(personService.queryUserAllQuertion);
      
      if (data) {
        console.log(data)
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
