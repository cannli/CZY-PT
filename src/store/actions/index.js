/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {
  // 设置用户信息和登录
  [actions.SET_USER_INFO]({commit}, userinfo){
  //  console.log(userinfo,'userinfo333333')
    commit(mutations.SET_USER_INFO, userinfo)
  },
  // 设置token, 判断是否有token @@@@
 /* [actions.SET_TOKEN_INFO]({commit}, apiAutoToken){
    commit(mutations.SET_TOKEN_INFO, apiAutoToken)
  },*/
}
