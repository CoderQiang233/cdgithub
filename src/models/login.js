import {message} from 'antd';
import * as loginService from '../services/login';

export default {
  namespace: 'login',
  state: {
    token:'',
    loginCode:1,
    userNum:0,
    userRole:[]
  },
  reducers: {
    loginSuccess(state,action){
      console.log(action.payload.data)
      let data=action.payload.data;
      if(data.code==1){
        let arr={
          token:data.token,
          loginCode:data.code,
          userNum:data.uNum,
          userRole:data.uRoles
        }
        return {...state,...arr}
      }else{
        message.error('用户名或密码错误.. :(', 4);
        return {...state}
      }
      
    }
  },
  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(loginService.login, payload);
      const { locationQuery } = yield select();
      console.log(locationQuery)
      if(data.ret==200){
        yield put({
          type: 'loginSuccess',
          payload: {
            data: data.data
          }
        });
      }
      return data
    },
  },
  subscriptions: {},
};
