import router from './router'
// import store from './store'
import { getToken } from '@/utils'

router.beforeEach(async (to, from, next) => {
  if (getToken()) {
    next()
  } else {
    next()
  }
})
