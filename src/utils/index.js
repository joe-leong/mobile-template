import { TokenKey } from './config'
import Cookies from 'js-cookie'
import md5 from 'js-md5'
// 校验身份证
const checkIDCard = (idcode) => {
  const reg1 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/
  const reg2 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
  return reg1.test(idcode) || reg2.test(idcode)
}
// 获取localstoragr
const getStorage = (key) => {
  return localStorage.getItem(key)
}
// 设置localstoragr
const setStorage = (key, value) => {
  return localStorage.setItem(key, value)
}
// 获取token
const getToken = () => {
  return Cookies.get(TokenKey)
}
// md5加密
const encrypt = (str = '') => {
  return md5(str)
}

// 节流
let timeout = null
const debounce = (fn, wait = 300) => {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}

// 校验手机号
function checkPhoneNum (phone) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)
}

// 提取身份证信息
function extractIdCard (code) {
  const birthCode = code.length === 18 ? code.substring(6, 14) : code.substring(6, 12)
  const birthDay = {
    year: birthCode.substring(0, 4),
    month: birthCode.substring(4, 6),
    day: birthCode.substring(6, 8)
  }
  const sexCode = code.length === 18 ? code.substring(16, 17) : code.substring(14, 15)
  const sex = sexCode % 2 === 0 ? 'F' : 'M'
  return {
    birthDay,
    sex
  }
}
export {
  checkIDCard,
  getStorage,
  setStorage,
  getToken,
  encrypt,
  debounce,
  checkPhoneNum,
  extractIdCard
}
