
//导入模块
import axios from 'axios'
import {port_code} from '@/common/port_uri'
import router from '@/router'
import {Message} from 'element-ui'
import store from '@/store'
import {SET_USER_INFO,SET_TOKEN} from '@/store/actions/type'
import {server_base_url} from '@/common/config'

//设置用户信息action
const setUserInfo = function (user) {
  store.dispatch(SET_USER_INFO, user)
}
//设置Token
const setTokenInfo = function (token) {
  store.dispatch(SET_TOKEN, token)
}

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    // https://github.com/mzabriskie/axios

    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: server_base_url,
      //设置请求超时设置
      timeout: 5000,
      //设置请求时的header
      headers: {
        // 'Github-url': '',
        // 'X-Powered-By': '',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'authorization':'Bearer '+ store.state.token_info.token
      }
    })

    // instance.interceptors.request.use(
    //   config => {
    //      let token = 'Bearer '+ store.state.token_info.token
    //       // Do something before request is sent
    //       if (store.getters.token) {
    //         config.headers['authorization'] = token // 让每个请求携带token 请根据实际情况自行修改
    //       }
    //       return config
    //     }, error => {
    //       // Do something with request error
    //       console.log(error) // for debug
    //       Promise.reject(error)
    //     }
    // )
    
     instance(options)
    //es6 对象的解构赋值es6:{data: {code, msg, data}}
      .then(res => {
        //请求成功时,根据业务判断状态
        console.log('fetch index.js',res.data);
        // let resCode = res.status
        // let resData = res.data||{}
        resolve(res.data)
      })
      .catch((error) => {
        console.log('fetch index.js catch.',error.response);
        //请求失败时,根据业务判断状态
       // if (error.response) {
          // let resError = error.response
          // let resCode = resError.status
          // let resMsg = resError.data.error
         // Message.error('操作失败！错误原因 ' + resMsg)
          if(error.response)
          {
            switch(error.response.status){
              case 401:
                setUserInfo(null)
                setTokenInfo(null)
                router.replace({name: "login"})
            }
          }
          reject(error.response)
        //}
      })
    //请求处理 Mock
    // instance(options)
    // //es6 对象的解构赋值es6:{data: {code, msg, data}}
    //   .then(({data: {code, msg, data}}) => {
    //     //请求成功时,根据业务判断状态
    //     console.log('fetch index.js',data);
    //     if (code === port_code.success) {
    //       resolve({code, msg, data})
    //       return false
    //     } else if (code === port_code.unlogin) {
    //       setUserInfo(null)
    //       router.replace({name: "login"})
    //     }
    //     Message.warning(msg)
    //     reject({code, msg, data})
    //   })
    //   .catch((error) => {
    //     console.log('fetch index.js catch.');
    //     //请求失败时,根据业务判断状态
    //     if (error.response) {
    //       let resError = error.response
    //       let resCode = resError.status
    //       let resMsg = error.message
    //       Message.error('操作失败！错误原因 ' + resMsg)
    //       reject({code: resCode, msg: resMsg})
    //     }
    //   })
  })
}
