import axios from 'axios'
import router from '@/router'
import { getToken, setToken } from '@/utils'
import { Toast } from 'vant'

// create an axios instance
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
})

service.interceptors.request.use(
  config => {
    config.headers.Authorization = getToken()
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    const { result: { resultCode, resultDesc = '系统繁忙' } = {} } = res
    if (resultCode !== 0) {
      Toast.fail(resultDesc)
      if (resultCode === -100006) {
        // 登录过期
        const { currentRoute: { path } } = router
        setToken('')
        router.push({
          path: '/login',
          query: {
            redirect: encodeURIComponent(encodeURIComponent(path))
          }
        })
      }
      return Promise.reject(new Error(res.msg || res.message || res.result.resultDesc || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
