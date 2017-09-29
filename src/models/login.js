import {message} from 'antd';
import * as loginService from '../services/login';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'login',
  state: {
    isLogin: false,
    account:{},
    
  },
  reducers: {
    loginSuccess(state,action){
      console.log(action.payload.data)
        let data=action.payload.data;
        console.log(data.account)       
        let account=data.account;
        return {...state,account,isLogin: true}
      
    },
    hasToken: function (state) {
      return {
          ...state,
          isLogin: true
      };
  },
  queryUserSuccess: function (state, {payload}) {
    
      let account=payload.account;
      return {
          ...state,
          account
      };
  },
  userFail: function (state) {
      return {
          ...state,
          isLogin: false,
          account: {}
      };
  }
  },
  effects: {
    * slogin ({
      payload,
    }, { put, call, select }) {
      const data = yield call(loginService.slogin, payload);
      const { locationQuery } = yield select();
      
      if(data.ret==200){
        if(data.data.code==1){
            // save the token to the local storage.
            let token=data.data.token;
            sessionStorage.setItem(storageTokenKey, token);
            sessionStorage.setItem('uName', data.data.account.uName);
            sessionStorage.setItem('uNum', data.data.account.uNum);
            sessionStorage.setItem('uRole', data.data.account.uRole);
            yield put({
              type: 'loginSuccess',
              payload: {data: data.data}
          });
          yield put(routerRedux.goBack());
        }
        else{
          message.error('用户名或密码错误.. :(', 4);
        }
      }
      else{
        message.error('发生了一些未知错误.. :(', 4);
      }
      // return data
    },
    * tlogin ({
      payload,
    }, { put, call, select }) {
      const data = yield call(loginService.tlogin, payload);
      const { locationQuery } = yield select();
      
      if(data.ret==200){
        if(data.data.code==1){
            // save the token to the local storage.
            let token=data.data.token;
            sessionStorage.setItem(storageTokenKey, token);
            sessionStorage.setItem('uName', data.data.account.uName);
            sessionStorage.setItem('uNum', data.data.account.uNum);
            sessionStorage.setItem('uRole', data.data.account.uRole);
            yield put({
              type: 'loginSuccess',
              payload: {data: data.data}
          });
          yield put(routerRedux.goBack());
        }
        else{
          message.error('用户名或密码错误.. :(', 4);
        }
      }
      else{
        message.error('发生了一些未知错误.. :(', 4);
      }
      // return data
    },
    * logout ({
      payload,
    }, {put}) {
      yield put({type: 'userFail'});
      sessionStorage.removeItem(storageTokenKey);
      sessionStorage.removeItem('uName');
      sessionStorage.removeItem('uNum');
      sessionStorage.removeItem('uRole');
      yield put(routerRedux.push('/'));
  },
    * enterUser ({
      payload,
    }, {put, take}) {
      yield [put({type: 'checkToken'}), put({type: 'queryUser'})];
      yield [take('app/hasToken'), take('app/queryUserSuccess')];
      onComplete();
    },
    * checkToken ({
      payload,
    }, {put, call, select}) {
      
      
      // get the token from local storage.
      const token = sessionStorage.getItem(storageTokenKey);
     
      if (token) {
          yield put({type: 'hasToken'});
      } else {
          yield put({type: 'userFail'});
      }
     },
     * queryUser ({
     payload
    }, {put, call,select}) {
      const {data} = yield call(loginService.getUserInfo);
      if (data) {
        
          yield put({
              type: 'queryUserSuccess',
              payload: {account: data.data}
          });
      }
      },
  },
  subscriptions: {},
};
