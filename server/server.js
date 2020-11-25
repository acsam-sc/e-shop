import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  // eslint-disable-next-line no-console
  console.log(Root)
} catch (ex) {
  // eslint-disable-next-line no-console
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const goodsFile = `${__dirname}/goods_small.json`

const writeGoodsFile = async (data) =>
  writeFile(goodsFile, JSON.stringify(data), { encoding: 'utf8' })

const readGoodsFile = async () => {
  const fileData = await readFile(goodsFile, { encoding: 'utf-8' })
    .then((data) => JSON.parse(data))
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const resData = axios(
          'https://raw.githubusercontent.com/ovasylenko/skillcrcuial-ecommerce-test-data/master/data.json'
        )
          .then(({ data }) => {
            writeGoodsFile(data)
            return data
          })
          // eslint-disable-next-line no-console
          .catch((errAxios) => console.log(`Error in axios: ${errAxios}`))
        return resData
      }
      return err
    })
  return fileData
}

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/products', async (req, res) => {
  const data = await readGoodsFile()
  const compareAZ = (a, b) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  }

  const sortByAlphabet = () => {
    const titlesArray = data
      .map((it, index) => {
        return { index, title: it.title }
      })
      .sort(compareAZ)
    return titlesArray.map((it) => data[it.index])
  }

  const sortByPrice = () => {
    const titlesArray = data
      .map((it, index) => {
        return { index, price: it.price }
      })
      .sort((a, b) => a.price - b.price)
    return titlesArray.map((it) => data[it.index])
  }
  switch (req.query.sortby) {
    case 'a-z':
      res.json(sortByAlphabet())
      break
    case 'price':
      res.json(sortByPrice())
      break
    default:
      res.json(data)
  }
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
// eslint-disable-next-line no-console
console.log(`Serving at http://localhost:${port}`)
