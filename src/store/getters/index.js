

import * as type from '@/store/getters/type'

export default {
  //获取用户信息
  [type.GET_USER_INFO]: state => {
    return state.user_info
  },
  //获取Token
   [type.GET_TOKEN]: state => {
    return state.token_info
  }
}
