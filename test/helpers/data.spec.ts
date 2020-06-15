import { transformRequest, transfromResponse } from '../../src/helpers/data'

describe('helper:data', () => {
  describe('transformRequest', () => {
    test(' should transform request data to string if data is PlainObject', () => {
      const a = { b: 1 }
      expect(transformRequest(a)).toBe('{"b":1}')
    })

    test('should do nothing', () => {
      const b = new FormData()
      expect(transformRequest(b)).toBe(b)
    })
  })

  describe('transformResponse', () => {
    test('should transform response data to Object if data is a JSON string', () => {
      const b = '{"c":"ok"}'
      expect(transfromResponse(b)).toEqual({
        c: 'ok'
      })
    })

    test('should do nothing if data is a string but not a JSON string', () => {
      const a = '{b: 1}'
      expect(transfromResponse(a)).toBe(a)
    })

    test('should do nothing if data is not a string', () => {
      const b = { c: '1' }
      expect(transfromResponse(b)).toBe(b)
    })
  })
})
