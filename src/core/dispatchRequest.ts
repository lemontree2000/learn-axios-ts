import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '..'
import xhr from './xhr'
import { buildURL, isAbsoluteURL, combineURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'
import e from 'express'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // code ..
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config)
    .then(res => {
      return transformReponseData(res)
    })
    .catch(reason => {
      if (reason && reason.response) {
        reason.response = transformReponseData(reason.response)
      }
      return Promise.reject(reason)
    })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

function transformReponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

export default dispatchRequest
