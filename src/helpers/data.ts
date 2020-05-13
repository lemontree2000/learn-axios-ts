import { isPlaniObject } from './util'

export function transformRequest(data: any): any {
  if (isPlaniObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transfromResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
