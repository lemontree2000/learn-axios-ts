import { Canceler } from '../../src'
import CancelToken from '../../src/cancel/CancelToken'
import Cancel from '../../src/cancel/Cancel'

describe('CancelToken', () => {
  describe('reason', () => {
    test('should returns a Cancel if cancellation has been requested', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })

      cancel!('Operation has been canceled')

      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled')
    })

    test('should has no side effect if call cancellation for multi times', () => {
      let cancel: Canceler

      const token = new CancelToken(c => {
        cancel = c
      })

      cancel!('Operations has been canceled.')
      cancel!('Operations has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operations has been canceled.')
    })

    test('should returns undefined if cancellation is requested', () => {
      const toekn = new CancelToken(() => {
        // do nothing
      })
      expect(toekn.reason).toBeUndefined()
    })
  })

  describe('promise', () => {
    test('should returns a Promise that resolves when cancellation is requested', done => {
      let cancel: Canceler

      const token = new CancelToken(c => {
        cancel = c
      })

      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel))
        expect(value.message).toBe('Operation has been canceled.')
        done()
      })

      cancel!('Operation has been canceled.')
    })
  })

  describe('throwIfRequested', () => {
    test('should throws if cancellation has been requested', () => {
      let cancel: Canceler

      const token = new CancelToken(c => {
        cancel = c
      })

      cancel!('Operation has been canceled.')

      try {
        token.throwIfRequested()
        fail('Expected throwIfRequested to throw.')
      } catch (thrown) {
        if (!(thrown instanceof Cancel)) {
          fail('Expected throwIfRequested to throw a Cancel, but test threw ' + thrown + '.')
        }
        expect(thrown.message).toBe('Operation has been canceled.')
      }
    })

    test('should does not throw if cancellation has not been requested', () => {
      const token = new CancelToken(() => {
        // do nothing
      })

      token.throwIfRequested()
    })
  })

  describe('shoure', () => {
    test('should returns an object containing token adn cancel function', () => {
      const source = CancelToken.source()
      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('Opertaion has been canceled.')
      expect(source.token.reason).toEqual(expect.any(Cancel))
      expect(source.token.reason!.message).toBe('Opertaion has been canceled.')
    })
  })
})