import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/index'
import { parseHeaders } from './helpers/header'

export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { url, data = null, method = 'GET', headers, responseType } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
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
      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      if (data) request.setRequestHeader(name, headers[name])
    })
    request.send(data)
  })
}
