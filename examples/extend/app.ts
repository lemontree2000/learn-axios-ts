import axios from '../../src/index'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.head('/extend/head')

// axios.options('/extend/optinos')

// axios.delete('/extend/delete')

// axios.post('/extend/post', {msg: 'hello'})

// axios.put('/extend/put', {msg: 'put'})

// axios.patch('/extend/patch', {msg: 'patch'})
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})
