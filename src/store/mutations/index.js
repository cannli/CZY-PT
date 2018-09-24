
import * as type from 'store/mutations/type'
import {cookieStorage} from 'common/storage'

export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  },
  // 设置token, 判断是否有token @@@@
/*  [type.API_AUTO_TOKEN](state, apiAutoToken){
    state.api_auto_token = apiAutoToken || {}
    if (apiAutoToken === null) {
      cookieStorage.remove('api_auto_token')
    } else {
      cookieStorage.set('api_auto_token', apiAutoToken)
    }
  },*/
}
