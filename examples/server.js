const express = require('express')
const bodyParse = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const router = express.Router()
const compiler = webpack(WebpackConfig)

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

app.use(express.static(__dirname))

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

router.get('/simple/get', (req, res) => {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', function(req, res)  {
  res.json(req.query)
})

router.post('/base/post', (req, res) => {
  res.json(req.body)
})

router.post('/base/buffer', (req, res) => {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', (req,res ) => {
  if( Math.random() * 10 > 5) {
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
  }, 5000);
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
      message: 'success',
  })
})

router.get('/interceptor/get', (req, res) => {
  res.end('hello')
})

router.post('/config/post', (req, res) => {
  res.json(req.body)
})



app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
