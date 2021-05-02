import { AxiosRequestConfig } from './types/index'

export function xhr(config: AxiosRequestConfig) {
  const { url, data = null, method = 'GET', headers } = config
  // params = null,
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    if (data) request.setRequestHeader(name, headers[name])
  })
  request.send(data)
}
