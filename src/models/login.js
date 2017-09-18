import { routerRedux } from 'dva/router'
import * as loginService from '../services/login';

export default {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
    * login ({
      payload,
    }, { put, call, select }) {

      console.log(1111111)
      const data = yield call(loginService.login, payload)
      console.log(999999)
      console.log(data);
    },
  },
  subscriptions: {},
};
