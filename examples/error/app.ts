import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.error('error msg', e)
})

axios({
  method: 'get',
  url: '/error/get',
}).then(res => {
  console.log(res)
}).catch(e => {
  console.error('error msg',e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then(res => {
    console.log(res)
  }).catch(e => {
    console.error('error msg', e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error('error msg', err)
})
