import { Router } from 'express'
import { globSync } from 'glob'
import path from 'path'

const routes = Router()

const routesFiles = globSync('./routes/*.ts')

routesFiles.forEach(async (file) => {
  const route = require(path.resolve(file))
  const routePath = path.parse(file).name
  if (routePath !== 'index')
    routes.use(`/${routePath}`, route)
})


export default routes