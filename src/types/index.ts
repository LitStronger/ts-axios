import { Method } from './method'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  params?: any // get参数，跟在url后
  data?: any // post参数， 放body中
  headers?: any
}
