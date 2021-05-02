import { buildUrl } from './helpers/url'
import { AxiosRequestConfig } from './types/index'
import { xhr } from './xhr'

function axios(config: AxiosRequestConfig) {
  console.log('axios init')
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildUrl(url, params)
}

export default axios
