import axios from '../../src/index'

document.cookie = 'a=b'

axios({
  method: 'get',
  url: '/more/get'
}).then(res => {
  console.log(res)
})

axios.post('http://localhost:8800/more/server2', {}, {
  withCredentials: true
}).then(res => {
  console.log(res)
})
