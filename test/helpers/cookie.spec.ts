import cookie from '../../src/helpers/cookie'

describe('helper:cookie', () => {
  test('should read cookie', () => {
    document.cookie = 'ross_token=12345'
    expect(cookie.read('ross_token')).toBe('12345')
  })

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'token_hello'
    expect(cookie.read('hello_token')).toBeNull()
  })
})
