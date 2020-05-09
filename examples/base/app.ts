import axios from '../../src/index'
// // 数组
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })
// // 对象
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })
// // 日期对象
// const date = new Date()
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// // null
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     bar: null,
//     foo: 'baz'
//   }
// })

// // hash

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// // query
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     baz: 'baz'
//   }
// })

// // 特殊字符
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })
// post object
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 'hello'
  }
})

// post buffer
const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

