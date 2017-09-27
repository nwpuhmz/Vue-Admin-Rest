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

export function Login(data) {
  return fetch({
    url: port_user.login,
    method: 'post',
    data
  });
}

export function Logout() {
  return fetch({
    url: port_user.logout,
    method: 'post'
  });
}