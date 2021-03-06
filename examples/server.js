const express = require('express')
const bodyParse = require('body-parser')
const webpack = require('webpack')
const path = require('path')
const atob = require('atob')
const multiPart = require('connect-multiparty')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const router = express.Router()
const compiler = webpack(WebpackConfig)
require('./server-more')
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(
  multiPart({
    uploadDir: path.resolve(__dirname, 'upload-file')
  })
)

app.use(
  express.static(__dirname, {
    setHeaders(res) {
      res.cookie('XSRF-TOKEN-D', '1234abc')
    }
  })
)

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

router.get('/simple/get', (req, res) => {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', function(req, res) {
  res.json(req.query)
})

router.post('/base/post', (req, res) => {
  res.json(req.body)
})

router.post('/base/buffer', (req, res) => {
  let msg = []
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', (req, res) => {
  if (Math.random() * 10 > 5) {
    res.json({
      success: true
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({
      success: true,
      msg: '成功'
    })
  }, 5000)
})

router.get('/extend/get', (req, res) => {
  res.end('success')
})
router.head('/extend/head', (req, res) => {
  res.end('success')
})
router.options('/extend/optinos', (req, res) => {
  res.end('success')
})
router.delete('/extend/delete', (req, res) => {
  res.end('success')
})
router.post('/extend/post', (req, res) => {
  res.json(req.body)
})
router.put('/extend/put', (req, res) => {
  res.json(req.body)
})
router.patch('/extend/patch', (req, res) => {
  res.json(req.body)
})

router.post('/extend/user', (req, res) => {
  res.json({
    code: 200,
    result: {
      name: 'edward',
      age: 19
    },
    message: 'success'
  })
})

router.get('/interceptor/get', (req, res) => {
  res.end('hello')
})

router.post('/config/post', (req, res) => {
  res.json(req.body)
})

router.post('/cancel/post', (req, res) => {
  setTimeout(() => {
    res.json({ test: 'hello post' })
  }, 1000)
})

router.get('/cancel/get', (req, res) => {
  setTimeout(() => {
    res.json({ test: 'hello get' })
  }, 1000)
})

router.get('/more/get', (req, res) => {
  res.json(req.cookies)
})

router.post('/more/upload', (req, res) => {
  console.log(req)
  res.json('上传成功')
})

router.post('/more/auth', (req, res) => {
  const auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')
  console.log(atob(credentials))
  const [username, password] = atob(credentials).split(':')
  console.log(typeof password)
  if (type === 'Basic' && username === 'Edward' && password === '123') {
    res.json(req.body)
  } else {
    res.status(401)
    res.end('UnAuthorization')
  }
})

router.get('/more/304', function(req, res) {
  res.status(304)
  res.end()
})

router.get('/more/A', function(req, res) {
  res.end('A')
})
router.get('/more/B', function(req, res) {
  res.end('Bß')
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
