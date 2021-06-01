import request from '@/utils/request'
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? '/dev-api'
    : '/'

const fileRequire = require.context('./modules', true, /.js$/)
const apis = fileRequire.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.js/, '$1')
  const value = fileRequire(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

function execApi ({ name, data, query = {}, customBaseUrl }) {
  const config =
    name.split('.').reduce((o, s) => {
      return o[s]
    }, apis) || {}
  const method = config.method || 'get'
  const queryStr = Object.keys(query).reduce((total, item) => {
    return `${total}${total ? '&' : ''}${item}=${query[item]}`
  }, '')
  const params = {
    url:
      (customBaseUrl || baseUrl) +
      config.url +
      `${queryStr.length ? '?' + queryStr : ''}`,
    method,
    headers: {
      'Content-Type': config.contentType || 'application/json; charset=utf-8'
    },
    [['GET', 'DELETE'].includes(String.prototype.toUpperCase.call(method)) || config.isParams
      ? 'params'
      : 'data'
    ]: data
  }
  return request(params)
}

export default execApi
