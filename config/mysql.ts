import { Sequelize } from 'sequelize'

const mysql = new Sequelize('free_call', 'root', 'jacos6571', {
  host: 'localhost',
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
  init()
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.error('Unable to connect to the database: ', err);
});

export default mysql