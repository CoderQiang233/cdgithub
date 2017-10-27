import {message} from 'antd';
import * as loginService from '../services/login';
import {storageTokenKey} from '../utils/constant';
import {routerRedux} from 'dva/router';
import {  hashHistory } from 'react-router';
import {setSessionStorage,getSessionStorage} from '../utils/helper'
export default {
  namespace: 'login',
  state: {
    isLogin: false,
    account:{},
    
  },
  reducers: {
    loginSuccess(state,action){
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
      const {data} = yield call(loginService.slogin, payload);
        console.log(data)
        if(data&&data.code==1){
            // save the token to the local storage.
            let token=data.token;
            setSessionStorage(storageTokenKey, token);
            setSessionStorage('account',data.account);
            yield put({
              type: 'loginSuccess',
              payload: {data: data}
          });
          yield put(routerRedux.goBack());
        }
        else{
          message.error(`${data.msg}.. :(`, 2);
        }
    },
    * tlogin ({
      payload,
    }, { put, call, select }) {
      const {data} = yield call(loginService.tlogin, payload);

          if(data&&data.code==1){
              // save the token to the local storage.
              let token=data.token;
              setSessionStorage(storageTokenKey, token);
              setSessionStorage('account',data.account);
              yield put({
                type: 'loginSuccess',
                payload: {data: data}
            });
            yield put(routerRedux.goBack());
          }
          else{
            message.error(`${data.msg}.. :(`, 2);
          }
    },
    * logout ({
      payload,
    }, {put}) {
      yield put({type: 'userFail'});
      sessionStorage.removeItem(storageTokenKey);
      sessionStorage.removeItem('account');
      yield put(routerRedux.push('/'));
  },
    * enterUser ({
      payload,
    }, {put, take}) {
      yield [put({type: 'checkToken'})];
    },
    * checkToken({
      payload,
    }, { put, call, select }) {
      // get the token from local storage.
      const token = getSessionStorage(storageTokenKey);
      if (token) {
        yield [put({ type: 'hasToken' })];
        let account= getSessionStorage('account');
        if(!account){
          yield put({ type: 'queryUser' });
        }else{
          yield put({
            type: 'queryUserSuccess',
            payload: { account: account }
          });
        }
      }
    },
    * queryUser({
     payload
    }, { put, call, select }) {
      const {data} = yield call(loginService.getUserInfo);
        if (data&&data.code == 1) {
          setSessionStorage('account',data.data);
          yield put({
            type: 'queryUserSuccess',
            payload: { account: data.data }
          });
        }
      
    },
  },
  subscriptions: {},
};
