import axios from '../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
// document.cookie = 'a=b'

// axios({
//   method: 'get',
//   url: '/more/get'
// }).then(res => {
//   console.log(res)
// })

// axios.post('http://localhost:8800/more/server2', {}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })


// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })


const instance = axios.create()

function calcPercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calcPercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const uploadButton = document.getElementById('upload')
const downloadButton = document.getElementById('download')

downloadButton.addEventListener('click', () => {
  instance.get('//img4.mukewang.com/szimg/5ed0bbc908af61c706000338-360-202.jpg').then(res => {
    console.log(res)
  })
})

const fileInput = document.getElementById('file') as HTMLInputElement
uploadButton.addEventListener('click', () => {
  const files = fileInput.files
  const data = new FormData()
  if (files) {
    data.append('file', files[0])
    instance.post('/more/upload', data)
  }
})
