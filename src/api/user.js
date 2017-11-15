// import axios from 'axios';

// let base = '';

// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const requestLogout = params => { return axios.post(`${base}/logout`).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
import fetch from '@/common/fetch'
import {port_user} from '@/common/port_uri'
import store from '@/store'

export function Login(data) {
  return fetch({
    url: port_user.login,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization':'Basic Y2xpZW50OnNlY3VyaXR5'
      },
    params:data
  });
}

export function GetUserInfo() {
  let token = 'Bearer '+ store.state.token_info.token
  return fetch({
    url: port_user.getUserinfo,
      // headers: {
      //   'Authorization':token
      // },
    method: 'get'
  });
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: port_user.get,
    method: 'get',
    params
  })
}

export function Logout() {
  let token = 'Bearer '+ store.state.token_info.token
  return fetch({
    url: port_user.logout,
      // headers: {
      //   'Authorization':token
      // },
    method: 'get'
  });
}

//数据列表带分页
export function listWithPage(params) {
  return fetch({
    url: port_user.listWithPage,
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(params) {
  return fetch({
    url: port_user.del,
    method: 'delete',
    params
  })
}
//添加数据
export function save(data) {
  return fetch({
    url: port_user.save,
    method: 'post',
    data
  })
}
//修改数据
export function update(data) {
  return fetch({
    url: port_user.update,
    method: 'put',
    data
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: port_user.batch_del,
    method: 'delete',
    data
  })
}