import axios from '../../src/index'
// 数组
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
// 对象
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
// 日期对象
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// null
axios({
  method: 'get',
  url: '/base/get',
  params: {
    bar: null,
    foo: 'baz'
  }
})

// hash

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

// query
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    baz: 'baz'
  }
})

// 特殊字符
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})
