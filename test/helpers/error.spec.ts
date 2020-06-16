import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helper:error', () => {
  test('should create an Error width message, config, code , request, response and isAxiosError', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    const error = createError('Boom', config, 'something', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom')
    expect(error.config).toBe(config)
    expect(error.code).toBe('something')
    expect(error.isAxiosError).toBeTruthy()
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
  })
})
