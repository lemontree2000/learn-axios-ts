import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('cancel:Cancel', () => {
  test('should return s correct result when message is sepecifed', () => {
    const cancel = new Cancel('Operation ha been canceled.')
    expect(cancel.message).toBe('Operation ha been canceled.')
  })

  test('should returns true if value is aCancel', () => {
    expect(isCancel(new Cancel())).toBeTruthy()
  })

  test('should returns false if value is not a Cancel', () => {
    expect(isCancel({ foo: 'bar' })).toBeFalsy()
  })
})
