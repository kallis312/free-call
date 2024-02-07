import { config } from 'dotenv'
import { existsSync } from 'fs'

const MODE = process.env.NODE_ENV || 'development'

console.log(MODE)

export default (): void => {
  if (existsSync(".env." + MODE))
    config({ path: '.env.' + MODE })
}