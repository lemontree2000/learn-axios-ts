import { isPlaniObject } from './util'

export function transformRequest(data: any): any {
  if (isPlaniObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
