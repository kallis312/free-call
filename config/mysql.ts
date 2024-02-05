import { Sequelize } from 'sequelize'

const mysql = new Sequelize('mysql://root@localhost:3306/free_call')

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