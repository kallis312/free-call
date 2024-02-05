import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, json, urlencoded } from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import routes from '@/routes';
import { join } from 'path'
import { UsertModel } from '@/models/userModel';

declare global {
  namespace Express {
    interface User extends UsertModel { }
  }
}

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

const privateKey = fs.readFileSync('cert/cert.key', 'utf8')
const certificate = fs.readFileSync('cert/cert.crt', 'utf8')

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

export const httpServer = http.createServer(app)

export const httpsServer = https.createServer(credentials, app)

export default { httpServer, httpsServer }
