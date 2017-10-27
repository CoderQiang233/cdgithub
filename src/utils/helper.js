
import config  from '../utils/config';

const { redirectUrl } = config;

// Operation LocalStorage
    export function setSessionStorage(key, vaule) {
    return sessionStorage.setItem(key, JSON.stringify(vaule));
  }
  
  export function getSessionStorage(key) {
    const value = JSON.parse(sessionStorage.getItem(key));
    return value;
  }


// 重定向登录页
  export function redirectLogin() {
    console.log('重定向')
    localStorage.clear();
    window.location.href = config.redirectUrl;
  }