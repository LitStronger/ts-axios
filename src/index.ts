import { AxiosRequestConfig } from './types/index'
import { xhr } from './xhr'

function axios(config: AxiosRequestConfig) {
    console.log("axios");
    xhr(config);
}

export default axios;