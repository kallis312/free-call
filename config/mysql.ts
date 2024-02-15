import { Sequelize } from 'sequelize'

const DB_NAME = process.env.DB_NAME || 'free_call'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASS = process.env.DB_PASS || ''

console.log({
  DB_HOST, DB_NAME, DB_USER, DB_PASS
})

const mysql = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  port: 3306
})

const init = async () => {
  try {
    await mysql.sync()
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unkwon error.')
  }
}

mysql.authenticate().then(() => {
  console.log('Connection has been established successfully.')
  init()
}).catch((err) => {
  console.error('Unable to connect to the database: ', err)
})

export default mysql