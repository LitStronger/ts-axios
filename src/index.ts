import { AxiosRequestConfig } from './types/index'
import { xhr } from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'

function axios(config: AxiosRequestConfig) {
  console.log('axios init')
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildUrl(url, params)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig) {
  const { data } = config
  return transformRequest(data)
}

export default axios
