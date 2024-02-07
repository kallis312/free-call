import config from '@Conf/config'
config()
import { UsertModel } from '@/models/userModel'
import routes from '@/routes'
import cors from 'cors'
import express, { Application, json, urlencoded } from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'
import { join } from 'path'


declare global {
  namespace Express {
    interface User extends UsertModel { }
  }
}

const app: Application = express()
const httpApp: Application = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

const privateKey = fs.readFileSync('cert/localhost.key', 'utf8')
const certificate = fs.readFileSync('cert/localhost.crt', 'utf8')

const credentials = { key: privateKey, cert: certificate }

require('@Middleware/passport')

app.use("/" + process.env.API_PREFIX, routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '/public')));

}

app.use(express.static(join(__dirname, '../public')))
app.get('/*', function (req, res) {
  res.sendFile(join(__dirname, '../public/index.html'));
});

httpApp.get("*", (req, res, next) => {
  res.redirect("https://" + req.headers.host + req.path);
});


export const httpServer = http.createServer(httpApp)

export const httpsServer = https.createServer(credentials, app)

export default { httpServer, httpsServer }
