import axios from 'axios';
import request from '../utils/request';

// let query=require('querystring');
// let base='';

// //登录接口
// export const login = params => { return axios.post(`${base}`,  query.stringify(params)); };

// //用户登出接口
// export const loginOut = params => { return axios.post(`${base}`,  query.stringify(params)); };

export function login(name,password) {
  return request({
    url: '/XX/XX',  //登录接口
    method: 'post',
    data: {
      name,
      password
    } 
  })
}