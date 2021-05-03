import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/index'
import { parseHeaders } from './helpers/header'

export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'GET', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    // 检查状态码，处理相应结果
    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return
      }

      // 未完成请求 or 请求出错status都为0
      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // responseText: Domstring文本; response: ArrayBuffer/Blob/Document/DOMString，取决于 XMLHttpRequest.responseType
      const responseData =
        responseType && responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }

    // 超时
    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }

    // 网络异常
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    Object.keys(headers).forEach(name => {
      if (data) request.setRequestHeader(name, headers[name])
    })
    request.send(data)
  })
}
