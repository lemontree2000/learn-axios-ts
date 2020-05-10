import axios from '../../src/index'
import { response } from 'express'
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
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 'hello'
//   }
// })

// // post buffer
// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })


// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    c: 'b'
  },
  responseType: 'json'
}).then(response => {
  console.log(response)
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    text: 'hahahha'
  }
}).then(response => {
  console.log(response)
})
