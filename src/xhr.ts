import { AxiosRequestConfig } from './types/index'

export function xhr(config: AxiosRequestConfig) {
    const { url, data = null, method = 'GET' } = config;
    // params = null,
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true);
    request.send(data)
}