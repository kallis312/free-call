import { config } from 'dotenv'
import { existsSync } from 'fs'

const MODE = process.env.NODE_ENV || 'development'

export default (): void => {
  console.log(MODE)
  if (existsSync(".env." + MODE))
    config({ path: '.env.' + MODE })
}